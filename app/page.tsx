"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { ExperienceSection, SkillsSection } from "./components/home-sections";

const navigation = [
	{ name: "Experience", href: "/#experience" },
	{ name: "Skills", href: "/#skills" },
	{ name: "Projects", href: "/projects" },
	{ name: "Blog", href: "/blog" },
];

const socials = [
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/laksh-nijhawan-576888280/",
		icon: <Linkedin size={17} strokeWidth={1.6} />,
		image: null,
	},
	{
		label: "GitHub",
		href: "https://github.com/laksh2005",
		icon: <Github size={17} strokeWidth={1.6} />,
		image: null,
	},
	{ label: "X", href: "https://x.com/laksh_2705", icon: null, image: "/x.png" },
	{
		label: "CodePersona",
		href: "https://codepersona.app/laksh2005",
		icon: null,
		image: "/cplogo.png",
	},
];

/**
 * Only figures that belong to me personally. Product-specific numbers
 * (CodePersona's 5K users / 95 countries, Writecream's 1M user base) stay in
 * the prose below, attributed to the product they actually describe.
 */
const stats = [
	{ value: "3", label: "Internships" },
	{ value: "40+", label: "Products shipped" },
	{ value: "12", label: "Months work experience" },
	{ value: "10+", label: "Hackathons" },
];

const RESUME =
	"https://drive.google.com/file/d/1yh_i07AzMMlhSV9mQ5PH6_n7nvYpVAs3/view?usp=sharing";

/** Small helper so the entrance stagger stays readable inline. */
const rise = (delay: number) => ({ animationDelay: `${delay}s` });

export default function Home() {
	return (
		<main id="top" className="relative w-full">
			<section className="relative flex h-[100svh] w-full flex-col">
				{/* ---------- nav ---------- */}
				<nav className="lp-in relative flex justify-center px-6 pt-7" style={rise(0.05)}>
					<ul className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-xl">
						{navigation.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className="block rounded-full px-4 py-1.5 text-[13px] font-medium text-zinc-400 transition-colors duration-300 hover:bg-white/[0.06] hover:text-white"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* ---------- hero ---------- */}
				<div className="relative flex flex-1 flex-col items-center justify-center px-6 py-10">
					{/* availability */}
					<div
						className="lp-in flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3.5 py-1.5"
						style={rise(0.15)}
					>
						<span className="lp-dot h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.5)]" />
						<span className="text-[11.5px] font-medium tracking-wide text-emerald-300/90">
							Open to SDE &amp; FDE roles
						</span>
					</div>

					{/* name — the rise sits on the wrapper so it can't collide with
					    the sheen animation on the heading itself */}
					<div className="lp-in mt-7 w-full" style={rise(0.25)}>
						<h1 className="lp-name font-serif-title text-center text-[clamp(2.5rem,8.5vw,6.4rem)] leading-[1.1] tracking-[-0.02em] px-2 pb-1">
							Laksh Nijhawan
						</h1>
					</div>

					{/* tagline */}
					<p
						className="lp-in mt-6 max-w-xl text-center text-[15px] leading-relaxed text-zinc-400 md:text-base"
						style={rise(0.35)}
					>
						<span className="text-zinc-100">Product-focused Engineer</span>{" "}
						building end-to-end systems that turn ideas into real, usable
						products.
					</p>

					{/* proof line */}
					<p
						className="lp-in mt-4 max-w-2xl text-center text-[13.5px] leading-relaxed text-zinc-500 md:text-sm"
						style={rise(0.45)}
					>
						Previously built AI &amp; tools at{" "}
						<a
							href="https://timesofindia.indiatimes.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium text-zinc-300 decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:underline"
						>
							The Times of India
						</a>
						. Built{" "}
						<a
							href="https://codepersona.app"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium text-zinc-300 decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:underline"
						>
							CodePersona
						</a>
						, which has <span className="text-[#A78BFA]">5K+</span> users across <span className="text-[#A78BFA]">95</span> countries, and shipped production-grade

						products at{" "}
						<a
							href="https://writecream.org"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium text-zinc-300 decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:underline"
						>
							Writecream
						</a>
						, serving <span className="text-[#A78BFA]">1M+</span> monthly users.
					</p>

					{/* stats */}
					<div
						className="lp-in mt-9 grid w-full max-w-xl grid-cols-4 divide-x divide-white/[0.07] rounded-xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm"
						style={rise(0.55)}
					>
						{stats.map((s) => (
							<div key={s.label} className="px-2 py-3.5 text-center">
								<div className="font-serif-title text-2xl leading-none text-white md:text-[28px]">
									{s.value}
								</div>
								<div className="mt-1.5 text-[10px] uppercase tracking-[0.12em] text-zinc-500">
									{s.label}
								</div>
							</div>
						))}
					</div>

					{/* CTAs */}
					<div className="lp-in mt-9 flex items-center gap-3" style={rise(0.65)}>
						<a
							href={RESUME}
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-5 py-2.5 text-[13.5px] font-semibold text-[#08080A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_24px_-8px_rgba(255,255,255,0.4)]"
						>
							View CV
							<ArrowUpRight
								size={15}
								className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
							/>
						</a>
						<a
							href="mailto:lakshnijhawan.work@gmail.com"
							className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] px-5 py-2.5 text-[13.5px] font-medium text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
						>
							<Mail size={15} strokeWidth={1.7} />
							Get in touch
						</a>
					</div>

					{/* socials */}
					<div className="lp-in mt-9 flex items-center gap-2.5" style={rise(0.75)}>
						{socials.map((s) => (
							<a
								key={s.href}
								href={s.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={s.label}
								title={s.label}
								className="group flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/[0.09] bg-white/[0.02] text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
							>
								{s.image ? (
									<Image
										src={s.image}
										alt={s.label}
										width={36}
										height={36}
										className="h-full w-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-100"
									/>
								) : (
									s.icon
								)}
							</a>
						))}
					</div>
				</div>

				{/* ---------- footer strip ---------- */}
				<div
					className="lp-in relative flex flex-wrap items-center justify-center gap-x-5 gap-y-1 px-6 pb-6 text-[11px] text-zinc-600"
					style={rise(0.9)}
				>
					<span>New Delhi, India</span>
					<span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" />
					<span>Full-stack · AI · Scalable Systems</span>
					<span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" />
					<span>Replies within a day</span>
				</div>
			</section>

			<ExperienceSection />
			<SkillsSection />
		</main>
	);
}
