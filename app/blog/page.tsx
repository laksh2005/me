import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { blogsData } from "@/util/data";

/**
 * The writing index.
 *
 * Sorted newest first rather than in declaration order, since a reader
 * arriving cold should land on the most recent thinking.
 */

export const metadata = {
	title: "Writing",
	description: "Post mortems and notes from things that actually shipped.",
};

const MONTHS = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December",
];

const sortKey = (b: (typeof blogsData)[number]) => {
	const mi = MONTHS.indexOf(b.month);
	return b.year * 100 + (mi === -1 ? 0 : mi);
};

export default function BlogsPage() {
	const posts = [...blogsData].sort((a, b) => sortKey(b) - sortKey(a));

	return (
		<div className="ak-page">
			<Link href="/" className="ak-back">
				<ArrowLeft size={13} />
				Ask the system
			</Link>

			<header className="ak-page-head">
				<span className="ak-eyebrow">Index</span>
				<h1 className="ak-title">Writing</h1>
				<p className="ak-sub">
					{posts.length} pieces, mostly post mortems on things that actually
					shipped rather than tutorials on things that did not.
				</p>
			</header>

			{posts.length === 0 ? (
				<p className="ak-sub mt-10">Nothing published yet.</p>
			) : (
				<div className="mt-8 flex flex-col gap-2.5">
					{posts.map((b) => (
						<Link
							key={b.slug}
							href={`/blog/${b.slug}`}
							className="ak-item ak-item-link group flex gap-4"
						>
							{b.image && (
								<span className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-md border border-white/[0.06] sm:block">
									<Image
										src={b.image}
										alt=""
										fill
										sizes="96px"
										className="object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-100"
									/>
								</span>
							)}

							<span className="min-w-0 flex-1">
								<span className="ak-item-meta block">
									{b.month} {b.year}
								</span>
								<span className="ak-item-title mt-1 block leading-snug">
									{b.title}
								</span>
							</span>

							<ArrowUpRight
								size={14}
								className="ak-item-arrow transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
							/>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
