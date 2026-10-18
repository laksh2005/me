import { Redis } from "@upstash/redis";
import type { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";

// Same credentials as /api/visits: Upstash names or the Vercel KV ones.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

export default async function incr(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> {
	if (!redis) {
		res.status(503).send("counter not configured");
		return;
	}
	if (req.method !== "POST") {
		res.status(405).send("use POST");
		return;
	}
	const contentType = req.headers["content-type"] || "";
	if (!contentType.includes("application/json")) {
		res.status(400).send("must be json");
		return;
	}

	const body = req.body;
	let slug: string | undefined = undefined;
	if ("slug" in body) {
		slug = body.slug;
	}
	if (!slug) {
		res.status(400).send("Slug not found");
		return;
	}
	const forwardedFor = req.headers["x-forwarded-for"];
	const ip =
		typeof forwardedFor === "string"
			? forwardedFor.split(",")[0]?.trim()
			: req.socket.remoteAddress;

	if (ip) {
		// Hash the IP in order to not store it directly in your db.
		const hash = createHash("sha256").update(ip).digest("hex");

		// deduplicate the ip for each slug
		const isNew = await redis.set(["deduplicate", hash, slug].join(":"), true, {
			nx: true,
			ex: 24 * 60 * 60,
		});
		if (!isNew) {
			res.status(202).end();
			return;
		}
	}
	await redis.incr(["pageviews", "projects", slug].join(":"));
	res.status(202).end();
}
