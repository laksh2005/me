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
					className="h-full bg-white transition-all duration-150"
					style={{ width: `${scroll}%` }}
				/>
			</div>

			<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen page-enter">
				<Navigation />

				<div className="container px-4 mx-auto max-w-3xl py-20">
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 mb-8"
					>
						<ArrowLeft size={16} />
						Back to blog
					</Link>

					<article className="space-y-8">
						<div>
							<div className="text-sm text-zinc-500 mb-4">
								{blog.month} {blog.year}
							</div>
							<h1 className="text-4xl md:text-5xl font-bold font-serif-title text-zinc-100 mb-6">
								{blog.title}
							</h1>
							<p className="text-lg text-zinc-400 leading-relaxed">
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
												width={800}
												height={400}
												className="w-full max-w-md mx-auto rounded-md"
											/>
										</div>
									);
								}

								if (block.type === "embed") {
									return <TweetEmbed key={idx} html={block.html} />;
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