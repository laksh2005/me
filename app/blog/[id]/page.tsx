"use client";

import { Navigation } from "@/app/components/nav";
import { blogsData } from "@/util/data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function BlogDetailPage() {
  const params = useParams();

  // Since blogsData is empty, always show coming soon
  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen page-enter flex flex-col items-center justify-center">
      <Navigation />
      <div className="container px-4 mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-serif-title font-bold text-zinc-100 mb-4">Blogs Coming Soon</h1>
        <p className="text-zinc-400 mb-8 text-lg">I'm working on sharing my thoughts and insights about technology and development.</p>
        <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition px-6 py-2 border border-zinc-700 rounded-lg hover:border-zinc-500">
          <ArrowLeft size={16} />
          Back to blog
        </Link>
      </div>
    </div>
  );
}
