import { ImageResponse } from "next/server";

/**
 * The preview card shown when laksh1.me is shared on LinkedIn, Slack, X or
 * WhatsApp. Rendered at build time in the site's own style, so it never
 * goes stale or depends on an image hosted somewhere else.
 */

export const runtime = "edge";
export const alt = "Laksh Nijhawan · Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ROLES = ["Byro", "The Times of India", "IAmMaturity", "WriteCream"];
const PROJECTS: [string, string][] = [
	["Parity", "52K rows/s"],
	["CodePersona", "5K+ users · 95 countries"],
	["Keepr", "95% intent accuracy"],
];

export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					background: "#ffffff",
					color: "#111111",
					padding: "72px 80px",
					fontFamily: "sans-serif",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div style={{ fontSize: 68, fontWeight: 600, letterSpacing: "-0.03em" }}>Laksh Nijhawan</div>
					<div style={{ fontSize: 32, color: "#8a8a8a", marginTop: 8 }}>
						software engineer · zero to production
					</div>
					<div style={{ fontSize: 28, color: "#444444", marginTop: 36, maxWidth: 940, lineHeight: 1.4 }}>
						{`40+ products shipped since 2023. Now at Byro; before that ${ROLES.slice(1).join(", ")}.`}
					</div>
				</div>

				<div style={{ display: "flex", gap: 20 }}>
					{PROJECTS.map(([name, metric]) => (
						<div
							key={name}
							style={{
								display: "flex",
								flexDirection: "column",
								border: "2px solid #e8e8e8",
								borderRadius: 18,
								padding: "20px 26px",
								flex: 1,
							}}
						>
							<div style={{ fontSize: 28, fontWeight: 600 }}>{name}</div>
							<div style={{ fontSize: 22, color: "#2f7d32", marginTop: 6 }}>{metric}</div>
						</div>
					))}
				</div>

				<div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#8a8a8a" }}>
					<span>laksh1.me</span>
					<span>B.Tech AI &amp; DS · class of 2027</span>
				</div>
			</div>
		),
		size,
	);
}
