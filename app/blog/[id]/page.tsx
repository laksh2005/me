"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TweetEmbed } from "@/app/components/tweet";
import { blogsData } from "@/util/data";
import { PageHead, Shell } from "@/app/components/lk/shell";

/**
 * A single post.
 *
 * Lookup is by slug first. Numeric ids (/blog/0 to /blog/4) are honoured too,
 * because those links are already out in the world.
 */
export default function BlogDetailPage() {
	const params = useParams();
	const raw = String(params?.id ?? "");

	const bySlug = blogsData.find((b) => b.slug === raw);
	const asIndex = /^\d+$/.test(raw) ? blogsData[Number(raw)] : undefined;
	const blog = bySlug ?? asIndex;

	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		const onScroll = () => {
			const total = document.documentElement.scrollHeight - window.innerHeight;
			setScroll(total > 0 ? (window.scrollY / total) * 100 : 0);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	if (!blog) {
		return (
			<Shell back={{ href: "/blog", label: "all writing" }}>
				<PageHead
					eyebrow="404"
					title="Post not found"
					lead="That one does not exist. The index has everything that does."
				/>
			</Shell>
		);
	}

	const i = blogsData.indexOf(blog);
	const next = blogsData[(i + 1) % blogsData.length];

	return (
		<>
			<div className="lk-progress" style={{ width: `${scroll}%` }} />
			<Shell back={{ href: "/blog", label: "all writing" }}>
				<PageHead
					eyebrow={`${blog.month.toLowerCase()} ${blog.year}`}
					title={blog.title}
					lead={blog.overview}
				/>

				<article className="lk-prose">
					{blog.content?.map((block: any, idx: number) => {
						if (block.type === "paragraph") {
							return (
								<p
									key={idx}
									className="whitespace-pre-line"
									dangerouslySetInnerHTML={{ __html: block.text }}
								/>
							);
						}
						if (block.type === "image") {
							return (
								<figure key={idx}>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src={block.src} alt={block.alt ?? ""} loading="lazy" />
								</figure>
							);
						}
						if (block.type === "embed") {
							return <TweetEmbed key={idx} tweetId={block.tweetId} html={block.html} />;
						}
						return null;
					})}
				</article>

				{next && next !== blog && (
					<div className="lk-next">
						<Link href="/blog">← all writing</Link>
						<Link href={`/blog/${next.slug}`}>
							<b>{next.title.length > 48 ? `${next.title.slice(0, 46)}…` : next.title}</b> →
						</Link>
					</div>
				)}
			</Shell>
		</>
	);
}
