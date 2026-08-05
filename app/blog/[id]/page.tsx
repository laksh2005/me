"use client";

import { Navigation } from "@/app/components/nav";
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
			const progress = (scrollPosition / totalHeight) * 100;
			setScroll(progress);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (!blog) {
		return (
			<div className="min-h-screen flex items-center justify-center text-zinc-400">
				Blog not found
			</div>
		);
	}

	return (
		<>
			<div className="fixed top-0 left-0 w-full h-[2px] bg-zinc-800 z-50">
				<div
					className="h-full bg-violet-300 transition-all duration-150"
					style={{ width: `${scroll}%` }}
				/>
			</div>

			<div className="relative min-h-screen page-enter">
				<Navigation />

				<div className="container relative px-6 mx-auto max-w-2xl pt-32 pb-20 md:pt-40">
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 text-[13px] text-zinc-500 hover:text-white transition-colors mb-10"
					>
						<ArrowLeft size={14} />
						Back to Blog
					</Link>

					<article className="space-y-8">
						<div>
							<span className="text-[10px] uppercase tracking-[0.16em] text-violet-300/70">
								{blog.month} {blog.year}
							</span>
							<h1 className="font-serif-title text-[clamp(2.2rem,5.5vw,3.6rem)] leading-[1.05] text-white mt-3 mb-5">
								{blog.title}
							</h1>
							<p className="text-[15px] text-zinc-400 leading-relaxed">
								{blog.overview}
							</p>
						</div>

						<div className="space-y-6 text-zinc-300 leading-relaxed [&_a]:underline [&_a]:hover:text-zinc-300">
							{blog.content?.map((block, idx) => {
								if (block.type === "paragraph") {
									return (
										<p
											key={idx}
											className="text-base whitespace-pre-line md:text-lg text-zinc-400"
											dangerouslySetInnerHTML={{ __html: block.text }}
										/>
									);
								}

								if (block.type === "image") {
									return (
										<div key={idx} className="my-8">
											<Image
												src={block.src}
												alt={block.alt}
												width={1200}
												height={630}
												className="w-full max-w-2xl mx-auto rounded-md"
											/>
										</div>
									);
								}

								if (block.type === "embed") {
									return (
										<TweetEmbed
											key={idx}
											tweetId={block.tweetId}
											html={block.html}
										/>
									);
								}

								return null;
							})}
						</div>
					</article>
				</div>
			</div>
		</>
	);
}