import React from "react";
import Link from "next/link";
import { blogsData } from "@/util/data";
import { PageHead, Shell } from "../components/lk/shell";

/**
 * The writing index, newest first, since a reader arriving cold should land
 * on the most recent thinking.
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
		<Shell>
			<PageHead
				eyebrow="writing"
				title="What breaks when you ship"
				lead="Mostly post mortems on things that actually shipped, rather than tutorials on things that did not."
			/>

			<h2># posts</h2>
			{posts.length === 0 ? (
				<p className="lk-lead">Nothing published yet.</p>
			) : (
				posts.map((b) => (
					<Link key={b.slug} href={`/blog/${b.slug}`} className="lk-row">
						{b.image && (
							// eslint-disable-next-line @next/next/no-img-element
							<img className="lk-thumb" src={b.image} alt="" />
						)}
						<span className="t">
							<b>{b.title}</b>
						</span>
						<span className="meta">
							{b.month.slice(0, 3).toLowerCase()} {b.year}
						</span>
					</Link>
				))
			)}
		</Shell>
	);
}
