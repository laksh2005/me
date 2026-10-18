import { renderIcon, serifL } from "./icon";

/** Home-screen icon for iOS. Square corners: iOS applies its own mask. */

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
	return renderIcon(180, 0, await serifL());
}
