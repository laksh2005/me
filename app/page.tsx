"use client";

import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import Image from "next/image";
import { useAudio } from "@/util/audioContext";
import { Mail, Github, Linkedin } from "lucide-react";

const navigation = [
	{ name: "Experience", href: "/experience" },
	{ name: "Skills", href: "/skills" },
	{ name: "Projects", href: "/projects" },
	{ name: "Blog", href: "/blog" },
];

const socials = [
	{
		icon: <Mail size={28} />,
		href: "mailto:lakshnijhawan.work@gmail.com",
		image: null,
	},
	{
		icon: <Linkedin size={28} />,
		href: "https://www.linkedin.com/in/laksh-nijhawan-576888280/",
		image: null,
	},
	{
		icon: <Github size={28} />,
		href: "https://github.com/laksh2005",
		image: null,
	},
	{
		icon: null,
		href: "https://x.com/laksh_2705",
		image: "/x.png",
	},
	{
		icon: null,
		href: "https://codepersona.app/laksh2005",
		image: "/cplogo.png",
	},
];

export default function Home() {
	const { isPlaying, togglePlayPause } = useAudio();

	const devResumeLink =
		"https://drive.google.com/file/d/186HfkpSx11RrQb17iYq3RLr15oGJmK8z/view?usp=sharing";
	// const mlResumeLink =
	// 	"https://drive.google.com/file/d/1NLsY0YA_wAn1hMv8Sh10EzU_QaabtKmD/view?usp=sharing";

	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>

			<nav className="mt-16 animate-fade-in">
				<ul className="flex items-center justify-center gap-4 flex-wrap px-4">
					{navigation.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="text-md duration-500 text-white hover:text-zinc-300 hover:text-lg font-bold mb-2"
						>
							{item.name}
						</Link>
					))}
				</ul>
			</nav>

			<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

			<h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-100 bg-white cursor-default text-edge-outline animate-title font-serif-title sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
				Laksh Nijhawan
			</h1>

			{/* Social Icons below name */}
			<div className="flex items-center justify-center gap-6 mt-8 z-10 animate-fade-in">
				{socials.map((social) => (
					<a
						key={social.href}
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center w-10 h-10 text-zinc-400 hover:text-zinc-200 transition-colors duration-300 hover:scale-110 transform"
					>
						{social.image ? (
							<Image
								src={social.image}
								alt="social"
								width={40}
								height={40}
								className="rounded-full"
							/>
						) : (
							social.icon
						)}
					</a>
				))}
			</div>

			<div className="hidden w-screen h-px mt-6 animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

			{/* Resume Button */}
			<div className="relative z-20 mt-1 mb-6 transition-opacity duration-500 ease-in-out">
				<a
					href={devResumeLink}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block px-6 py-2 text-sm font-medium text-zinc-100 border border-zinc-600 rounded hover:bg-zinc-900 hover:border-zinc-500 transition-colors duration-50 animate-fade-in"
				>
					View Resume
				</a>
			</div>

			<div className="text-left animate-fade-in px-4 max-w-2xl">
  <p className="text-sm md:text-md text-zinc-400 leading-relaxed space-y-2" suppressHydrationWarning>
    
    <span className="block">
      <strong className="text-white">Product-focused Engineer</strong> building end-to-end systems that turn ideas into real, usable products.
    </span>

    <span className="block">
      Building AI & tools at{" "}
      <a href="https://timesofindia.indiatimes.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:underline">
        The Times of India
      </a>{" "}
      · previously dev at{" "}<span  className="font-semibold text-white hover:underline">IAmMaturity </span>
      &{" "}
      <a href="https://writecream.org" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:underline">
        WriteCream
      </a>.
    </span>

    <span className="block">
      Built{" "}
      <a href="https://codepersona.app" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:underline">
        CodePersona
      </a>{" "}
       used by <strong>5K+ users</strong> across <strong>95 countries</strong>.
    </span>

    <span className="block">
      Also shipped{" "}
      <a href="https://www.laksh1.me/projects/duplex-sync-engine" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:underline">
        Duplex Sync Engine
      </a>{" "}
       , a scalable real-time <strong>bidirectional sync system</strong>.
    </span>

    <span className="block">
      <strong>35+ products</strong> · <strong>10+ hackathons</strong>.
    </span>

    <span className="block">
      <strong>Open to full-time, interning, or freelance.</strong>
    </span>

  </p>
			</div>
		</div>
	);
}
