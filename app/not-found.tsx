import Link from "next/link";
import { Shell } from "./components/lk/shell";

const ROUTES = [
	{ label: "Home", href: "/" },
	{ label: "Projects", href: "/projects" },
	{ label: "Writing", href: "/blog" },
	{ label: "Contact", href: "/contact" },
];

export default function NotFound() {
	return (
		<Shell>
			<div className="lk-404">404</div>
			<p className="lk-lead">This page doesn't exist. Try one of these instead.</p>
			<div className="lk-links" style={{ marginTop: 18 }}>
				{ROUTES.map((r) => (
					<Link key={r.href} href={r.href} className="lk-cta">
						{r.label}
					</Link>
				))}
			</div>
		</Shell>
	);
}
