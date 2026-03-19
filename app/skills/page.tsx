"use client";
import { Navigation } from "../components/nav";
import { skillsData } from "@/util/data";

export default function SkillsPage() {
  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen page-enter">
      <Navigation />
      <div className="container px-4 pt-20 mx-auto max-w-7xl md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0 mb-16 element-enter-1">
          <h1 className="text-4xl font-serif-title font-bold tracking-tight text-zinc-100 sm:text-5xl">
            Skills
          </h1>
          <p className="mt-4 text-zinc-400">
            Technologies and tools I work with.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 element-enter-2">
          {Object.entries(skillsData).map(([category, skills], idx) => (
            <div
              key={category}
              className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition-colors duration-300"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <h2 className="text-lg font-serif-title text-zinc-100 mb-4">
                {category}
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm text-zinc-300 border border-zinc-700 rounded-full hover:border-zinc-500 hover:text-zinc-100 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
