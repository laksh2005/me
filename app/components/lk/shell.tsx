import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

/** Page frame shared by every page except home: back link left, theme toggle right. */
export function Shell({
	back = { href: "/", label: "laksh nijhawan" },
	children,
}: {
	back?: { href: string; label: string };
	children: React.ReactNode;
}) {
	return (
		<main className="lk">
			<div className="lk-col">
				<div className="lk-top">
					<Link href={back.href} className="lk-back">
						← {back.label}
					</Link>
					<ThemeToggle />
				</div>
				{children}
			</div>
		</main>
	);
}

/** Title block: small dim line above, page title, optional lead. */
export function PageHead({
	eyebrow,
	title,
	lead,
}: {
	eyebrow?: string;
	title: string;
	lead?: React.ReactNode;
}) {
	return (
		<header className="lk-pagehead">
			{eyebrow && <div className="lk-eyebrow">{eyebrow}</div>}
			<h1>{title}</h1>
			{lead && <p className="lk-lead">{lead}</p>}
		</header>
	);
}
