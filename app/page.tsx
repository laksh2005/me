import React from "react";
import Link from "next/link";
import { FLAGSHIPS, LINKS, ROLES } from "@/util/portfolio";
import { ThemeToggle } from "./components/lk/theme-toggle";
import { DelhiClock } from "./components/lk/clock";
import { DocIcon, GitHubIcon, GlobeIcon, MailIcon, PlayIcon, XIcon } from "./components/lk/icons";

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
					<ThemeToggle />
				</div>

				<div className="lk-intro">
					<p>
						I take products from a blank repo to something real people use, and I care
						most about the part that has to keep working at scale. Mostly TypeScript and
						Node, with MySQL, Redis and queues underneath.
					</p>
					<p>40+ products shipped since 2023. Ship first, then measure.</p>
					<p>
						More on <Link className="lk-u" href="/projects/parity">how I built Parity</Link>,{" "}
						<Link className="lk-u" href="/blog/shipping-40-products-lessons">what 40 products taught me</Link>, and{" "}
						<Link className="lk-u" href="/blog">my blogs</Link>.
					</p>
					<p>
						Reach me via <MailIcon className="lk-i" />
						<a className="lk-u" href={LINKS.email} {...ext}>email</a> · see my code on{" "}
						<GitHubIcon className="lk-i" />
						<a className="lk-u" href={LINKS.github} {...ext}>GitHub</a> and my developer profile on{" "}
						<GlobeIcon className="lk-i" />
						<a className="lk-u" href={LINKS.codepersona} {...ext}>CodePersona</a>.
					</p>
					<p>
						Find me on <a className="lk-u" href={LINKS.linkedin} {...ext}>LinkedIn</a> and{" "}
						<a href={LINKS.x} {...ext} aria-label="X">
							<XIcon className="lk-i" style={{ marginRight: 0 }} />
						</a>
						, watch my <PlayIcon className="lk-i" />
						<Link className="lk-u" href="/intro">60 sec intro</Link>, or grab my <DocIcon className="lk-i" />
						<a className="lk-u" href="/cv" {...ext}>CV</a>.
					</p>
				</div>

				<h2># experience</h2>
				{ROLES.map((r) => (
					<div key={r.company} className="lk-xp" tabIndex={0}>
						<div className="lk-exp">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img className="lk-logo" src={r.logo} alt="" />
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
				{FLAGSHIPS.map((p) => (
					<div key={p.slug} className="lk-proj">
						<Link href={`/projects/${p.slug}`} className="lk-tile" aria-hidden tabIndex={-1}>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={p.icon} alt="" />
						</Link>
						<Link href={`/projects/${p.slug}`} className="t">
							<b>{p.name}</b>
							<span className="lk-m">{p.homeMetric}</span>
							<small>{p.oneLiner}</small>
						</Link>
						<div className="lk-icons">
							<a href={p.github} {...ext} aria-label={`${p.name} on GitHub`}>
								<GitHubIcon className="lk-ico" />
							</a>
							{p.live && (
								<a href={p.live} {...ext} aria-label={`${p.name} website`}>
									<GlobeIcon className="lk-ico" />
								</a>
							)}
						</div>
					</div>
				))}

				<p style={{ marginTop: 8 }}>
					more of the 40+ on{" "}
					<a className="lk-u" href={LINKS.github} {...ext}>GitHub</a>.
				</p>
				<p style={{ marginTop: 22 }}>
					✍︎ i write about what breaks when you ship.{" "}
					<Link className="lk-u" href="/blog">read the latest</Link>.
				</p>

				<div className="lk-foot">
					<DelhiClock />
					<span>B.Tech AI &amp; DS · class of 2027</span>
				</div>
			</div>
		</main>
	);
}
