"use client";

import Link from "next/link";
import React, { useState } from "react";
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
    href: "https://linkedin.com/in/laksh-nijhawan",
    image: null,
  },
  {
    icon: null,
    href: "https://x.com/laksh_2705",
    image: "/x.png",
  },
  {
    icon: null,
    href: "https://codepersona.app",
    image: "/cplogo.png",
  },
];

export default function Home() {
  const [showResumeButtons, setShowResumeButtons] = useState(false);
  const { isPlaying, togglePlayPause } = useAudio();

  const resumes = [
    {
      title: "Development Resume",
      key: "dev",
      image: "/devresume.png",
      link: "https://drive.google.com/file/d/1DqfHYH52XvNtVmx4m_sUyNECSxPDP_DU/view?usp=sharing",
    },
    {
      title: "Machine Learning Resume",
      key: "ml",
      image: "/mlresume.png",
      link: "https://drive.google.com/file/d/14X3n3nPVEKD0XThbcmEfbBkzPEqhlMy8/view?usp=sharing",
    },
  ];

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
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300 mb-2"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1300 bg-white cursor-default text-edge-outline animate-title font-serif-title sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
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

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 mt-8" />

<div className="my-4 text-left animate-fade-in px-4 max-w-2xl">
  <p className="text-sm md:text-md text-zinc-400 leading-relaxed space-y-2">
    
    <span className="block">
      <strong>Product-focused Engineer</strong> who builds end-to-end systems. I turn ideas into working products and care about how they feel to use.
    </span>

    {/* <span className="block">
      Currently building AI agents at{" "}
      <a href="https://timesinternet.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:underline">
        Times Internet
      </a>.
    </span> */}

    <span className="block">
      Previously worked on frontend and full-stack systems at{" "}
      <a href="https://iammaturity.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:underline">
        IAmMaturity
      </a>{" "}
      &{" "}
      <a href="https://writecream.org" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:underline">
        WriteCream
      </a>.
    </span>

    <span className="block">
      Built{" "}
      <a href="https://codepersona.app" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:underline">
        CodePersona
      </a>, a developer profiling platform that reached <strong>1.5K+ visitors</strong>,<strong>83 countries</strong>  in 4 weeks.
    </span>

    <span className="block">
      Worked across <strong>frontend, backend, and AI</strong> to ship real-world products.
    </span>

    <span className="block">
      <strong>35+ products built</strong>. <strong>10+ hackathons</strong>. <strong>multiple failed products</strong>.
    </span>

    <span className="block">
      <strong>Open to full-time, freelance, or collaborations.</strong>
    </span>

  </p>
</div>

      {/* Resume Button */}
      <div className="relative z-20 mt-4 transition-opacity duration-500 ease-in-out">
        {!showResumeButtons ? (
          <button
            onClick={() => setShowResumeButtons(true)}
            className="px-6 py-2 text-sm font-medium text-zinc-100 border border-zinc-600 rounded hover:bg-zinc-900 hover:border-zinc-500 transition-colors duration-50 animate-fade-in"
          >
            View Resume
          </button>
        ) : (
          <div className="flex flex-row gap-3 animate-fade-in">
            {resumes.map((resume) => (
              <a
                key={resume.key}
                href={resume.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-2 my-2 py-1 bg-zinc-800 border border-zinc-600 text-sm font-medium text-zinc-200 rounded hover:bg-zinc-700 hover:border-zinc-500 transition-colors duration-300"
              >
                {resume.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
