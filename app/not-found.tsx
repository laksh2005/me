import Link from "next/link";

const ROUTES = [
	{ label: "Home", href: "/" },
	{ label: "Projects", href: "/projects" },
	{ label: "Writing", href: "/blog" },
	{ label: "Contact", href: "/contact" },
];

export default function NotFound() {
	return (
		<div className="nf-root">
			<div className="nf-inner">
				<div className="nf-code">404</div>

				<p className="nf-msg">This page doesn't exist. Try one of these instead.</p>

				<div className="nf-routes">
					{ROUTES.map((r) => (
						<Link key={r.href} href={r.href} className="nf-route">
							<span className="nf-route-caret">/</span>
							{r.label}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
