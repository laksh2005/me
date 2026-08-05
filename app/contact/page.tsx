"use client";

import { Mail, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navigation } from "../components/nav";

const socials = [
	{
		icon: null,
		href: "https://x.com/laksh_2705",
		label: "X",
		handle: "@laksh_2705",
		image: "/x.png",
	},
	{
		icon: <Github size={20} strokeWidth={1.6} />,
		href: "https://github.com/laksh2005",
		label: "GitHub",
		handle: "laksh2005",
		image: null,
	},
	{
		icon: null,
		href: "https://codepersona.app",
		label: "CodePersona",
		handle: "Portfolio",
		image: "/cplogo.png",
	},
];

export default function ContactPage() {
	return (
		<div className="relative min-h-screen">
			<Navigation />
			<div className="flex flex-col items-center justify-center min-h-screen px-6 py-24">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
					className="flex flex-col items-center text-center"
				>
					<span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300/70">
						Get in touch
					</span>
					<h1 className="font-serif-title mt-4 text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.02] text-white">
						Let's talk.
					</h1>
					<Link
						href="mailto:lakshnijhawan.work@gmail.com"
						className="group mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 py-3 text-[14px] font-medium text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/30 hover:text-white"
					>
						<Mail size={16} className="text-violet-300/80" />
						lakshnijhawan.work@gmail.com
					</Link>
				</motion.div>

				<div className="mt-16 grid w-full grid-cols-1 gap-4 mx-auto sm:grid-cols-3 max-w-2xl">
					{socials.map((s, idx) => (
						<motion.div
							key={s.label}
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 + idx * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
						>
							<Link
								href={s.href}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex flex-col items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/25 hover:bg-white/[0.035]"
							>
								<span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/[0.1] bg-white/[0.03] text-zinc-300 transition-colors group-hover:text-white">
									{s.image ? (
										<Image
											src={s.image}
											alt={s.label}
											width={44}
											height={44}
											className="h-full w-full object-cover"
										/>
									) : (
										s.icon
									)}
								</span>
								<div className="flex flex-col items-center text-center">
									<span className="font-serif-title text-base text-white">
										{s.handle}
									</span>
									<span className="mt-1 text-[11.5px] text-zinc-500">
										{s.label}
									</span>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
