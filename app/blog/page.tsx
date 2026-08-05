"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "../components/nav";
import { blogsData } from "@/util/data";

const Reveal: React.FC<{
	children: React.ReactNode;
	delay?: number;
	className?: string;
	y?: number;
}> = ({ children, delay = 0, className = "", y = 20 }) => (
	<motion.div
		initial={{ opacity: 0, y }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true, margin: "-90px" }}
		transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
		className={className}
	>
		{children}
	</motion.div>
);

export default function BlogsPage() {
	return (
		<div className="relative min-h-screen pb-28 pt-32 md:pt-40">
			<Navigation />

			<div className="px-6">
				<Reveal className="flex flex-col items-center text-center">
					<span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300/70">
						Blog
					</span>
					<h1 className="font-serif-title mt-4 text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.02] text-white">
						Things I've written
					</h1>
					<p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-zinc-500">
						Mostly what shipping has taught me.
					</p>
				</Reveal>

				{blogsData.length === 0 ? (
					<Reveal className="mt-20 text-center">
						<p className="font-serif-title text-2xl text-zinc-400">
							New entries coming soon
						</p>
					</Reveal>
				) : (
					<div className="mx-auto mt-20 max-w-3xl divide-y divide-white/[0.07] border-y border-white/[0.07]">
						{[...blogsData]
							.map((blog, originalIndex) => ({ blog, originalIndex }))
							.reverse()
							.map(({ blog, originalIndex }, idx) => (
								<Reveal
									key={blog.slug}
									delay={Math.min(idx, 6) * 0.05}
								>
									<Link
										href={`/blog/${originalIndex}`}
										className="group flex items-center gap-5 py-6 transition-colors md:gap-8"
									>
										{blog.image && (
											<div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/[0.08] sm:block md:h-20 md:w-28">
												<Image
													src={blog.image}
													alt={blog.title}
													fill
													sizes="112px"
													className="object-cover transition-transform duration-700 group-hover:scale-105"
												/>
											</div>
										)}

										<div className="min-w-0 flex-1">
											<span className="text-[10px] uppercase tracking-[0.14em] text-violet-300/70">
												{blog.month} {blog.year}
											</span>
											<h3 className="font-serif-title mt-1.5 text-xl leading-snug text-white transition-colors md:text-2xl">
												{blog.title}
											</h3>

											{blog.overview && (
												<p className="mt-1.5 line-clamp-1 text-[13px] text-zinc-500">
													{blog.overview}
												</p>
											)}
										</div>

										<ArrowUpRight
											size={17}
											className="shrink-0 text-zinc-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
										/>
									</Link>
								</Reveal>
							))}
					</div>
				)}
			</div>
		</div>
	);
}