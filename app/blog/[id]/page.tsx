"use client";

import { Navigation } from "@/app/components/nav";
import { blogsData } from "@/util/data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function BlogDetailPage() {
	const params = useParams();
	const id = parseInt(params?.id as string) || 0;
	const blog = blogsData[id];

	if (!blog) {
		return (
			<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen page-enter flex flex-col items-center justify-center">
				<Navigation />
				<div className="container px-4 mx-auto max-w-3xl text-center">
					<h1 className="text-4xl font-serif-title font-bold text-zinc-100 mb-4">
						Blog Post Not Found
					</h1>
					<p className="text-zinc-400 mb-8 text-lg">
						The blog post you're looking for doesn't exist.
					</p>
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition px-6 py-2 border border-zinc-700 rounded-lg hover:border-zinc-500"
					>
						<ArrowLeft size={16} />
						Back to blog
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen page-enter">
			<Navigation />
			<div className="container px-4 mx-auto max-w-3xl py-20">
				{/* Back Button */}
				<Link
					href="/blog"
					className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition mb-8"
				>
					<ArrowLeft size={16} />
					Back to blog
				</Link>

				{/* Header */}
				<article className="space-y-8">
					<div>
						<div className="text-sm text-zinc-500 mb-4">
							{blog.month} {blog.year}
						</div>
						<h1 className="text-4xl md:text-5xl font-serif-title font-bold text-zinc-100 mb-6">
							{blog.title}
						</h1>
						<p className="text-lg text-zinc-400 leading-relaxed">
							{blog.overview}
						</p>
					</div>

					{/* Content */}
					<div className="space-y-6 text-zinc-300 leading-relaxed">
						{blog.content?.map((block, idx) => {
							if (block.type === "paragraph") {
								return (
									<p
										key={idx}
										className="text-base md:text-lg text-zinc-400"
										dangerouslySetInnerHTML={{ __html: block.text }}
									/>
								);
							} else if (block.type === "image") {
								return (
									<div key={idx} className="my-8 rounded-lg overflow-hidden">
										<Image
											src={block.src}
											alt={block.alt}
											width={800}
											height={400}
											className="w-full h-auto"
										/>
									</div>
								);
							}
							return null;
						})}
					</div>
				</article>
			</div>
		</div>
	);
}
