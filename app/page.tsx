import React from "react";
import { AskConsole } from "./components/ask/ask-console";

/**
 * The homepage is the console, and nothing else.
 *
 * No scrolling document, no stacked sections. A visitor asks and the answer
 * arrives in place. `/projects`, `/projects/[slug]`, `/blog` and `/blog/[id]`
 * still exist as real pages for sharing and search, and answers link into
 * them, but browsing from here never leaves this one window.
 */
export default function Home() {
	return (
		<main id="top" className="ak-root">
			<AskConsole />
		</main>
	);
}
