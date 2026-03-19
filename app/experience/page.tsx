"use client";

import { Navigation } from "../components/nav";
import { experienceData } from "@/util/data";
import { MapPin, Briefcase, ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ExperiencePage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen page-enter">
      <Navigation />

      <div className="container px-4 pt-20 pb-12 mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 element-enter-1">
          <h1 className="text-4xl md:text-5xl font-serif-title font-bold tracking-tight text-zinc-100 mb-2">
            Professional Experience
          </h1>
          {/* <p className="text-sm md:text-base text-zinc-400">
            {experienceData.length} roles that shaped my journey
          </p> */}
        </div>

        {/* Accordion Container */}
        <div className="space-y-3 element-enter-2">
          {experienceData.map((exp, index) => (
            <div
              key={index}
              className="group border border-zinc-700 rounded-lg overflow-hidden transition-all duration-300 hover:border-zinc-600"
            >
              {/* Accordion Header */}
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full px-4 py-4 md:px-6 md:py-5 flex items-start justify-between gap-4 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors duration-200"
              >
                <div className="flex items-start gap-3 md:gap-4 text-left flex-1 min-w-0">
                  {/* Company Logo */}
                  {exp.image && (
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex-shrink-0 overflow-hidden border border-zinc-700">
                      <Image
                        src={exp.image}
                        alt={exp.company}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Company Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="text-base md:text-lg font-serif-title font-bold text-zinc-100 truncate">
                        {exp.company}
                      </h3>
                      <span className="text-xs md:text-sm text-zinc-500">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-zinc-400 mt-1">
                      {exp.role}
                    </p>
                  </div>
                </div>

                {/* Chevron Icon */}
                <div
                  className={`w-5 h-5 flex-shrink-0 text-zinc-500 transition-transform duration-300 ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown size={20} />
                </div>
              </button>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-4 py-4 md:px-6 md:py-5 bg-zinc-900/20 border-t border-zinc-700/50 space-y-3">
                  {/* Location & Mode */}
                  <div className="flex flex-col sm:flex-row sm:gap-6 text-xs md:text-sm text-zinc-400 space-y-2 sm:space-y-0">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="flex-shrink-0" />
                      <span>{exp.location} • {exp.mode}</span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <Briefcase size={16} className="flex-shrink-0" />
                      <span>{exp.role}</span>
                    </div> */}
                  </div>

                  {/* Description */}
                  <div className="space-y-2 pt-2">
                    {exp.description.map((desc, i) => (
                      <p
                        key={i}
                        className="text-xs md:text-sm text-zinc-300 leading-relaxed"
                      >
                        • {desc}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Hint */}
        {/* <p className="text-center mt-8 text-xs text-zinc-500 element-enter-3">
          Click to expand and explore each experience
        </p> */}
      </div>
    </div>
  );
}
