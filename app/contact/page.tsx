"use client";

import { Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { Navigation } from "../components/nav";
import { PitchBackdrop } from "../components/stadium";
import { TiltCard } from "../components/tilt-card";
import { Football } from "../components/football";

const socials = [
	{
		icon: null,
		href: "https://x.com/laksh_2705",
		label: "X",
		handle: "@laksh_2705",
		image: "/x.png",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/laksh2005",
		label: "Github",
		handle: "laksh2005",
		image: null,
	},
	{
		icon: <Linkedin size={20} />,
		href: "https://www.linkedin.com/in/laksh-nijhawan-576888280/",
		label: "LinkedIn",
		handle: "Laksh Nijhawan",
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
			<PitchBackdrop />
			<Navigation />

			<div className="container mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-28">
				{/* transfer status */}
				<motion.div
					initial={{ opacity: 0, y: -18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
					className="flex items-center gap-2 rounded-full border border-kit-gold/40 bg-kit-gold/10 px-4 py-2"
				>
					<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-kit-gold" />
					<span className="font-stadium text-[11px] font-bold uppercase tracking-[0.28em] text-kit-gold">
						Available — full-time · intern · freelance
					</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
					className="mt-6 text-center font-jersey text-5xl uppercase leading-[0.9] text-white md:text-7xl"
					style={{ textShadow: "0 12px 50px rgba(0,0,0,.85)" }}
				>
					Make an offer
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.14, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
					className="mt-4 max-w-md text-center font-stadium text-lg leading-snug text-emerald-50/65"
				>
					Open the negotiation with an email, or find me on any of the channels
					below.
				</motion.p>

				{/* the mail CTA */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1.2, 0.36, 1] }}
					className="mt-10 flex flex-col items-center"
				>
					<Link
						href="mailto:lakshnijhawan.work@gmail.com"
						className="group inline-flex items-center gap-3 rounded-sm bg-kit-neon px-8 py-4 font-stadium text-base font-bold uppercase tracking-[0.2em] text-black shadow-[0_0_44px_-8px_rgba(62,240,140,.95)] transition-transform duration-300 hover:-translate-y-1"
					>
						<Mail size={18} />
						lakshnijhawan.work@gmail.com
					</Link>
					<div className="pointer-events-none mt-6 opacity-70">
						<Football size={110} spinSeconds={9} />
					</div>
				</motion.div>

				{/* channels */}
				<div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{socials.map((s, idx) => (
						<motion.div
							key={s.href}
							initial={{ opacity: 0, y: 26 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.32 + idx * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
						>
							<TiltCard className="group h-full" intensity={11}>
								<Link
									href={s.href}
									target="_blank"
									rel="noopener noreferrer"
									className="relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-xl border border-emerald-400/20 bg-black/55 p-6 backdrop-blur-md transition-colors duration-500 group-hover:border-kit-neon/60"
								>
									<span className="goal-net animate-net pointer-events-none absolute inset-0 opacity-[0.1] transition-opacity duration-500 group-hover:opacity-25" />
									<span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-emerald-300/30 bg-black text-emerald-100/80 transition-colors duration-300 group-hover:border-kit-neon group-hover:text-kit-neon">
										{s.image ? (
											<Image
												src={s.image}
												alt={s.label}
												width={48}
												height={48}
												className="h-full w-full object-cover"
											/>
										) : (
											s.icon
										)}
									</span>
									<div className="relative text-center">
										<div className="font-jersey text-base uppercase text-white">
											{s.handle}
										</div>
										<div className="mt-1 font-stadium text-[11px] uppercase tracking-[0.24em] text-emerald-100/40">
											{s.label}
										</div>
									</div>
								</Link>
							</TiltCard>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
