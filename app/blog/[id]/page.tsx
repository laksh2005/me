"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { TweetEmbed } from "@/app/components/tweet";
import { blogsData } from "@/util/data";

/**
 * A single post.
 *
 * Lookup is by slug first. The previous version did `parseInt(params.id)` and
 * used the result as an array index, which meant every slug URL quietly
 * resolved to `blogsData[0]` (NaN falls back to 0) and served the wrong post
 * with a 200. Numeric ids are still honoured so any old links keep working.
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
			const total =
				document.documentElement.scrollHeight - window.innerHeight;
			setScroll(total > 0 ? (window.scrollY / total) * 100 : 0);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	if (!blog) {
		return (
			<div className="ak-page">
				<Link href="/blog" className="ak-back">
					<ArrowLeft size={13} />
					All writing
				</Link>
				<header className="ak-page-head">
					<span className="ak-eyebrow">404</span>
					<h1 className="ak-title">Post not found</h1>
					<p className="ak-sub">
						That one does not exist. The index has everything that does.
					</p>
				</header>
			</div>
		);
	}

	return (
		<>
			<div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-white/[0.06]">
				<div
					className="ak-progress-fill h-full transition-[width] duration-150"
					style={{ width: `${scroll}%` }}
				/>
			</div>

			<div className="ak-page">
				<Link href="/blog" className="ak-back">
					<ArrowLeft size={13} />
					All writing
				</Link>

				<header className="ak-page-head">
					<span className="ak-eyebrow">
						{blog.month} {blog.year}
					</span>
					<h1 className="ak-title">{blog.title}</h1>
					{blog.overview && <p className="ak-sub">{blog.overview}</p>}
				</header>

				<article className="ak-prose mt-8">
					{blog.content?.map((block: any, idx: number) => {
						if (block.type === "paragraph") {
							return (
								<p
									key={idx}
									className="whitespace-pre-line [&_a]:text-zinc-200 [&_a]:underline [&_code]:rounded [&_code]:bg-white/[0.06] [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_strong]:text-zinc-100"
									dangerouslySetInnerHTML={{ __html: block.text }}
								/>
							);
						}

						if (block.type === "image") {
							return (
								<div
									key={idx}
									className="my-8 overflow-hidden rounded-lg border border-white/[0.07]"
								>
									<Image
										src={block.src}
										alt={block.alt ?? ""}
										width={1200}
										height={630}
										className="w-full"
									/>
								</div>
							);
						}

						if (block.type === "embed") {
							return (
								<TweetEmbed key={idx} tweetId={block.tweetId} html={block.html} />
							);
						}

						return null;
					})}
				</article>

				<div className="ak-rule" />

				<Link href="/" className="ak-link">
					Ask about something else
				</Link>
			</div>
		</>
	);
}
