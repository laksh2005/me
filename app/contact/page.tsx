import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { EMAIL, EMAIL_COMPOSE_URL, CV_URL, SOCIAL_LINKS } from "@/util/intents";

/**
 * Contact, as a real page.
 *
 * The console answers this too, under `socials`. This route exists so the
 * link is shareable on its own and so the same details are reachable without
 * needing to know what to type.
 */

export const metadata = {
	title: "Contact",
	description: "How to reach Laksh Nijhawan.",
};

export default function ContactPage() {
	return (
		<div className="ak-page">
			<Link href="/" className="ak-back">
				<ArrowLeft size={13} />
				Ask the system
			</Link>

			<header className="ak-page-head">
				<span className="ak-eyebrow">Contact</span>
				<h1 className="ak-title">Get in touch</h1>
				<p className="ak-sub">
					Open to SDE roles. Email is the fastest route and usually gets
					a reply within a day.
				</p>
			</header>

			<a
				href={EMAIL_COMPOSE_URL}
				target="_blank"
				rel="noopener noreferrer"
				className="ak-item ak-item-link group mt-8 block"
			>
				<span className="ak-item-meta flex items-center gap-1.5">
					<Mail size={11} />
					Email
				</span>
				<span className="ak-item-title mt-1.5 block">{EMAIL}</span>
				<ArrowUpRight
					size={14}
					className="ak-item-arrow transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
				/>
			</a>

			<section className="mt-10">
				<span className="ak-eyebrow">Elsewhere</span>
				<div className="mt-4 flex flex-col gap-2.5">
					{SOCIAL_LINKS.map((s) => (
						<a
							key={s.href}
							href={s.href}
							target="_blank"
							rel="noopener noreferrer"
							className="ak-item ak-item-link group"
						>
							<span className="ak-item-title">{s.label}</span>
							<ArrowUpRight
								size={14}
								className="ak-item-arrow transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
							/>
						</a>
					))}
				</div>
			</section>

			<div className="ak-rule" />

			<a href={CV_URL} target="_blank" rel="noopener noreferrer" className="ak-link">
				View CV
				<ArrowUpRight size={12} />
			</a>
		</div>
	);
}
