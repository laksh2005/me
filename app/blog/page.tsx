"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mic, ArrowUpRight } from "lucide-react";

import { Navigation } from "../components/nav";
import { PitchBackdrop } from "../components/stadium";
import { SectionHeader } from "../components/section-header";
import { TiltCard } from "../components/tilt-card";
import { blogsData } from "@/util/data";

export default function BlogsPage() {
	return (
		<div className="relative min-h-screen pb-24">
			<PitchBackdrop />
			<Navigation />

			<div className="container mx-auto max-w-6xl px-4 pt-24 md:pt-28 lg:px-8">
				<SectionHeader
					kicker="Press room"
					title="Blogs"
					subtitle="Post-match thoughts on technology, gathered in one place."
					stat={`${blogsData.length} ${blogsData.length === 1 ? "piece" : "pieces"}`}
				/>

				{blogsData.length === 0 ? (
					<div className="flex min-h-[360px] items-center justify-center rounded-lg border border-dashed border-emerald-400/25">
						<div className="text-center">
							<Mic size={28} className="mx-auto text-emerald-400/40" />
							<p className="mt-4 font-jersey text-2xl uppercase text-emerald-100/70">
								Presser starts soon
							</p>
							<p className="mt-1 font-stadium text-sm uppercase tracking-[0.2em] text-emerald-100/35">
								Nothing on the record yet
							</p>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{blogsData.map((blog, idx) => (
							<motion.div
								key={blog.slug}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
							>
								<Link href={`/blog/${idx}`} className="block h-full">
									<TiltCard className="group h-full" intensity={9}>
										<article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-emerald-400/20 bg-black/55 backdrop-blur-md transition-colors duration-500 group-hover:border-kit-neon/60">
											{/* cover */}
											<div className="relative h-44 w-full overflow-hidden">
												{blog.image ? (
													<Image
														src={blog.image}
														alt={blog.title}
														fill
														sizes="(max-width: 768px) 100vw, 560px"
														className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
													/>
												) : (
													<div className="h-full w-full bg-emerald-950" />
												)}
												<div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
												<span className="absolute left-4 top-4 rounded-sm bg-black/70 px-2 py-1 font-stadium text-[10px] font-bold uppercase tracking-[0.22em] text-kit-neon backdrop-blur">
													{blog.month} {blog.year}
												</span>
											</div>

											<div className="flex flex-grow flex-col p-5">
												<h3 className="font-jersey text-xl uppercase leading-tight text-white transition-colors duration-300 group-hover:text-kit-neon md:text-2xl">
													{blog.title}
												</h3>

												{blog.overview && (
													<p className="mt-3 flex-grow text-sm leading-relaxed text-emerald-50/60">
														{blog.overview}
													</p>
												)}

												<div className="mt-5 flex items-center gap-2 border-t border-emerald-400/15 pt-3 font-stadium text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-100/45 transition-colors duration-300 group-hover:text-kit-neon">
													Read the transcript
													<ArrowUpRight
														size={13}
														className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
													/>
												</div>
											</div>
										</article>
									</TiltCard>
								</Link>
							</motion.div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
