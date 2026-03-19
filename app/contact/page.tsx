"use client";

import { Mail, Github, Mail as MailIcon } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Image from "next/image";

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
    icon: null,
    href: "https://codepersona.app",
    label: "CodePersona",
    handle: "Portfolio",
    image: "/cplogo.png",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen page-enter">
      <Navigation />
      <div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto">
        {/* Mail Icon at Top */}
        <div className="mb-20 text-center element-enter-1">
          <Link
            href="mailto:lakshnijhawan.work@gmail.com"
            className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-zinc-600 hover:border-zinc-400 bg-zinc-900/30 hover:bg-zinc-900/60 transition-all duration-300 group"
            title="Send an email"
          >
            <Mail size={24} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
          </Link>
          <p className="mt-3 text-xs text-zinc-500 group-hover:text-zinc-400">tap to mail</p>
        </div>

        {/* Socials Grid - 3 Columns */}
        <div className="grid w-full grid-cols-1 gap-6 mx-auto sm:grid-cols-3 max-w-3xl element-enter-2">
          {socials.map((s, idx) => (
            <Card key={idx}>
              <Link
                href={s.href}
                target="_blank"
                className="p-6 relative flex flex-col items-center gap-4 duration-700 group"
              >
                <span
                  className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange overflow-hidden">
                  {s.image ? (
                    <Image
                      src={s.image}
                      alt={s.label}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    s.icon
                  )}
                </span>
                <div className="z-10 flex flex-col items-center text-center">
                  <span className="text-lg font-medium duration-150 text-zinc-200 group-hover:text-white font-display">
                    {s.handle}
                  </span>
                  <span className="mt-2 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                    {s.label}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
