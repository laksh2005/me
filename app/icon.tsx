import { ImageResponse } from "next/server";

/** Site icon: a white Instrument Serif "L" on a black rounded square. */

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export async function serifL() {
	const css = await (
		await fetch("https://fonts.googleapis.com/css2?family=Instrument+Serif&text=L")
	).text();
	const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
	if (!url) throw new Error("Instrument Serif not found");
	return (await fetch(url)).arrayBuffer();
}

export function renderIcon(px: number, radius: number, font: ArrayBuffer) {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: "#111111",
					borderRadius: radius,
					color: "#ffffff",
					fontFamily: "Instrument Serif",
					fontSize: px * 0.82,
					lineHeight: 1,
					paddingTop: px * 0.05,
				}}
			>
				L
			</div>
		),
		{
			width: px,
			height: px,
			fonts: [{ name: "Instrument Serif", data: font, weight: 400, style: "normal" }],
		},
	);
}

export default async function Icon() {
	return renderIcon(64, 14, await serifL());
}
