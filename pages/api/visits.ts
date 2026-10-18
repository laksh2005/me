import { Redis } from "@upstash/redis";
import type { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";

/**
 * Site-wide visit counter.
 *
 * GET returns the total. POST counts a visit, but only for requests to
 * laksh1.me (previews and localhost never inflate it), and at most once per
 * visitor per day: the IP is hashed, never stored. Works with either the
 * Upstash or the Vercel KV variable names. With neither set it answers 503
 * and the page simply hides the line.
 */

const KEY = "pageviews:site";
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

export default async function visits(req: NextApiRequest, res: NextApiResponse) {
	res.setHeader("Cache-Control", "no-store");
	if (!redis) {
		res.status(503).json({ error: "counter not configured" });
		return;
	}
	if (req.method !== "GET" && req.method !== "POST") {
		res.status(405).end();
		return;
	}

	try {
		const host = String(req.headers["x-forwarded-host"] ?? req.headers.host ?? "");
		const isProd = /(^|\.)laksh1\.me$/i.test(host.split(":")[0]);

		if (req.method === "POST" && isProd) {
			const fwd = req.headers["x-forwarded-for"];
			const ip = typeof fwd === "string" ? fwd.split(",")[0]?.trim() : req.socket.remoteAddress;
			const seen = ip
				? !(await redis.set(`deduplicate:site:${createHash("sha256").update(ip).digest("hex")}`, 1, {
						nx: true,
						ex: 24 * 60 * 60,
				  }))
				: false;
			if (!seen) await redis.incr(KEY);
		}

		const total = (await redis.get<number>(KEY)) ?? 0;
		res.status(200).json({ total });
	} catch {
		res.status(503).json({ error: "counter unavailable" });
	}
}
