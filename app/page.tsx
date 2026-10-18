import React from "react";
import Link from "next/link";
import { ProjectList } from "./components/lk/project-list";
import { FLAGSHIPS, LINKS, ROLES } from "@/util/portfolio";
import { ThemeToggle } from "./components/lk/theme-toggle";
import { DelhiClock } from "./components/lk/clock";
import { VisitCount } from "./components/lk/visit-count";
import { DocIcon, GitHubIcon, GlobeIcon, MailIcon, XIcon } from "./components/lk/icons";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Home() {
	return (
		<main className="lk">
			<div className="lk-col">
				<div className="lk-top">
					<div>
						<div className="lk-name">Laksh Nijhawan</div>
						<div className="lk-role">software engineer · zero to production</div>
					</div>
					<div className="lk-actions">
						<a className="lk-cv" href="/cv" target="_blank" rel="noopener noreferrer">
							CV
						</a>
						<ThemeToggle />
					</div>
				</div>

				<div className="lk-intro">
					<p>
						I take products from a blank repo to something real people use, and I care
						most about the parts that have to keep working once they do. Mostly TypeScript
						and Node, with whatever the problem needs underneath, from MySQL and MongoDB to
						Supabase.
					</p>
					<p>40+ products shipped since 2023. Ship first, then measure.</p>
					<p>
						More on how I built <Link className="lk-u" href="/projects/keepr">Keepr</Link> and{" "}
						<Link className="lk-u" href="/projects/parity">Parity</Link>,{" "}
						<Link className="lk-u" href="/blog/shipping-40-products-lessons">what 40 products taught me</Link>, and{" "}
						<Link className="lk-u" href="/blog">my blogs</Link>.
					</p>
					<p>
						Reach me via <MailIcon className="lk-i" />
						<a className="lk-u" href={LINKS.email} {...ext}>email</a>, see my code on{" "}
						<GitHubIcon className="lk-i" />
						<a className="lk-u" href={LINKS.github} {...ext}>GitHub</a>, or view my{" "}
						<GlobeIcon className="lk-i" />
						<a className="lk-u" href={LINKS.codepersona} {...ext}>CodePersona</a>.
					</p>
					<p>
						Find me on <a className="lk-u" href={LINKS.linkedin} {...ext}>LinkedIn</a> and{" "}
						<a href={LINKS.x} {...ext} aria-label="X">
							<XIcon className="lk-i" style={{ marginRight: 0 }} />
						</a>
						, or grab my <DocIcon className="lk-i" />
						<a className="lk-u" href="/cv" {...ext}>CV</a>.
					</p>
				</div>

				<h2># experience</h2>
				{ROLES.map((r) => (
					<div key={r.company} className="lk-xp" tabIndex={0}>
						<div className="lk-exp">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img className={`lk-logo${r.adaptiveLogo ? " lk-logo-adapt" : ""}`} src={r.logo} alt="" />
							<div className="t">
								<b>{r.company}</b>
								<small>{r.role}</small>
							</div>
							<div className="r">
								{r.dates}
								<br />
								{r.place}
							</div>
						</div>
						<div className="lk-more">
							<p>{r.bullet}</p>
						</div>
					</div>
				))}

				<h2># projects</h2>
				<ProjectList
					items={FLAGSHIPS.map((p) => ({
						slug: p.slug,
						name: p.name,
						icon: p.icon,
						image: p.image,
						metric: p.homeMetric,
						oneLiner: p.oneLiner,
						github: p.github,
						live: p.live,
					}))}
				/>

				<p style={{ marginTop: 8 }}>
					more of the 40+ on{" "}
					<a className="lk-u" href={LINKS.github} {...ext}>GitHub</a>.
				</p>
				<p style={{ marginTop: 22 }}>
					✍︎ i write about what breaks when you ship.{" "}
					<Link className="lk-u" href="/blog">read the latest</Link>.
				</p>

				<VisitCount />

				<div className="lk-foot">
					<DelhiClock />
					<span>B.Tech AI &amp; DS · class of 2027</span>
				</div>
			</div>
		</main>
	);
}
