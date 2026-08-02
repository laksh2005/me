"use client";

import { Navigation } from "@/app/components/nav";
import { PitchBackdrop } from "@/app/components/stadium";
import { TweetEmbed } from "@/app/components/tweet";
import { blogsData } from "@/util/data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BlogDetailPage() {
	const params = useParams();
	const id = parseInt(params?.id as string) || 0;
	const blog = blogsData[id];
	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const totalHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const scrollPosition = window.scrollY;
			const progress = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
			setScroll(progress);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (!blog) {
		return (
			<div className="relative flex min-h-screen items-center justify-center">
				<PitchBackdrop />
				<p className="font-jersey text-2xl uppercase text-emerald-100/60">
					No transcript found
				</p>
			</div>
		);
	}

	return (
		<>
			{/* match clock — the ball runs along the touchline as you read */}
			<div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-black/70">
				<div
					className="relative h-full bg-gradient-to-r from-emerald-400 to-kit-neon transition-[width] duration-150"
					style={{ width: `${scroll}%` }}
				>
					<span
						className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-white"
						style={{ boxShadow: "0 0 12px 2px rgba(62,240,140,.9)" }}
					/>
				</div>
			</div>
			<div className="fixed right-3 top-3 z-[60] hidden rounded-full border border-emerald-400/25 bg-black/70 px-2.5 py-1 font-stadium text-[10px] font-bold tabular-nums uppercase tracking-[0.2em] text-emerald-200/80 backdrop-blur md:block">
				{Math.round((scroll / 100) * 90)}′
			</div>

			<div className="relative min-h-screen pb-24">
				<PitchBackdrop />
				<Navigation />

				<div className="container mx-auto max-w-3xl px-4 pt-24 md:pt-28">
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 font-stadium text-xs uppercase tracking-[0.24em] text-emerald-100/50 transition-colors hover:text-kit-neon"
					>
						<ArrowLeft size={14} />
						Press room
					</Link>

					<article className="mt-6">
						<header className="animate-rise-in">
							<div className="flex items-center gap-3">
								<span className="h-[3px] w-8 bg-kit-neon" />
								<span className="font-stadium text-xs font-semibold uppercase tracking-[0.34em] text-kit-neon/85">
									{blog.month} {blog.year} · Post-match
								</span>
							</div>
							<h1
								className="mt-4 font-jersey text-4xl uppercase leading-[0.94] text-white md:text-6xl"
								style={{ textShadow: "0 10px 40px rgba(0,0,0,.8)" }}
							>
								{blog.title}
							</h1>
							{blog.overview && (
								<p className="mt-5 font-stadium text-lg leading-snug text-emerald-50/70 md:text-xl">
									{blog.overview}
								</p>
							)}
							<div className="mt-7 h-px w-full bg-gradient-to-r from-white/25 via-emerald-400/20 to-transparent" />
						</header>

						<div className="mt-8 space-y-6 leading-relaxed [&_a:hover]:text-kit-neon [&_a]:text-white [&_a]:underline [&_a]:decoration-kit-neon/50 [&_a]:underline-offset-4 [&_strong]:text-white">
							{blog.content?.map((block, idx) => {
								if (block.type === "paragraph") {
									return (
										<p
											key={idx}
											className="whitespace-pre-line text-[15px] leading-[1.85] text-emerald-50/70 md:text-[17px]"
											dangerouslySetInnerHTML={{ __html: block.text }}
										/>
									);
								}

								if (block.type === "image") {
									return (
										<figure key={idx} className="my-9">
											<div className="overflow-hidden rounded-xl border border-emerald-400/20 bg-black/40">
												<Image
													src={block.src}
													alt={block.alt}
													width={800}
													height={400}
													className="mx-auto w-full max-w-md"
												/>
											</div>
										</figure>
									);
								}

								if (block.type === "embed") {
									return (
										<TweetEmbed key={idx} tweetId={block.tweetId} html={block.html} />
									);
								}

								return null;
							})}
						</div>

						<div className="mt-14 flex items-center justify-between border-t border-emerald-400/15 pt-6">
							<span className="font-stadium text-[11px] uppercase tracking-[0.3em] text-emerald-100/35">
								Full time
							</span>
							<Link
								href="/blog"
								className="font-stadium text-[11px] font-bold uppercase tracking-[0.24em] text-kit-neon hover:underline"
							>
								Next presser →
							</Link>
						</div>
					</article>
				</div>
			</div>
		</>
	);
}
