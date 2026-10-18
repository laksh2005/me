import React from "react";
import { LINKS } from "@/util/portfolio";
import { PageHead, Shell } from "../components/lk/shell";
import { DocIcon, GitHubIcon, GlobeIcon, MailIcon, XIcon } from "../components/lk/icons";

export const metadata = {
	title: "Contact",
	description: "How to reach Laksh Nijhawan.",
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const ROWS = [
	{ label: "Email", meta: "lakshnijhawan.work@gmail.com", href: LINKS.email, Icon: MailIcon },
	{ label: "LinkedIn", meta: "laksh-nijhawan", href: LINKS.linkedin, Icon: null },
	{ label: "GitHub", meta: "laksh2005", href: LINKS.github, Icon: GitHubIcon },
	{ label: "X", meta: "@laksh_2705", href: LINKS.x, Icon: XIcon },
	{ label: "CodePersona", meta: "my developer profile", href: LINKS.codepersona, Icon: GlobeIcon },
	{ label: "CV", meta: "pdf", href: "/cv", Icon: DocIcon },
];

export default function ContactPage() {
	return (
		<Shell>
			<PageHead
				eyebrow="contact"
				title="Get in touch"
				lead="Open to SDE roles and internships. Email is the fastest route and usually gets a reply within a day."
			/>

			<h2># reach me</h2>
			{ROWS.map(({ label, meta, href, Icon }) => (
				<a key={label} href={href} {...ext} className="lk-row">
					<span className="t">
						{Icon && <Icon className="lk-i" />}
						<b>{label}</b>
					</span>
					<span className="meta">{meta} ↗</span>
				</a>
			))}
		</Shell>
	);
}
