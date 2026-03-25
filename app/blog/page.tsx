"use client";

import Link from "next/link";
import { Navigation } from "../components/nav";
import { blogsData } from "@/util/data";
import { Card } from "../components/card";

export default function BlogsPage() {
	return (
		<div className="relative pb-16 page-enter">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-6xl lg:px-8 md:space-y-16 md:pt-24">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h1 className="text-4xl font-serif-title font-bold tracking-tight text-zinc-100 sm:text-5xl element-enter-1">
						Blog
					</h1>
					<p className="mt-4 text-zinc-400 element-enter-2">
						My insights and opinions about technology, compiled at a place
					</p>
				</div>

				{/* Blogs Grid - 2 Columns */}
				{blogsData.length === 0 ? (
					<div className="flex items-center justify-center min-h-[400px] element-enter-3">
						<div className="text-center">
							<p className="text-zinc-500 text-lg font-serif-title mb-2">
								New Blogs Coming Soon
							</p>
							<p className="text-zinc-600 text-sm">
								I'm working on sharing my thoughts and insights. Stay tuned!
							</p>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 element-enter-3">
						{blogsData.map((blog, idx) => (
							<Link key={blog.slug} href={`/blog/${idx}`}>
								<div style={{ animationDelay: `${idx * 0.05}s` }}>
									<Card>
										<article
											className="relative w-full h-full p-6 cursor-pointer border border-zinc-800 hover:border-zinc-600 rounded-lg overflow-hidden transition-all duration-300 hover:bg-zinc-900/50"
										>
											<div className="flex flex-col h-full">
												{/* Date */}
												<div className="text-xs text-zinc-500 mb-3">
													{blog.month} {blog.year}
												</div>

												{/* Title */}
												<h3 className="text-xl font-serif-title text-zinc-100 group-hover:text-white transition-colors mb-3">
													{blog.title}
												</h3>

												{/* Overview */}
												<p className="text-sm leading-6 text-zinc-400 flex-grow">
													{blog.overview}
												</p>

												{/* Read More */}
												<div className="mt-4 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
													Read more →
												</div>
											</div>
										</article>
									</Card>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
