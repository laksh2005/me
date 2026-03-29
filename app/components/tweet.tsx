"use client";

import { useEffect, useRef } from "react";

interface TweetEmbedProps {
	html: string;
	tweetId?: string;
}

// Singleton to ensure script is only loaded once
let twitterScriptLoaded = false;
let twitterScriptPromise: Promise<void> | null = null;

function loadTwitterScript(): Promise<void> {
	if (twitterScriptLoaded) {
		return Promise.resolve();
	}

	if (twitterScriptPromise) {
		return twitterScriptPromise;
	}

	twitterScriptPromise = new Promise((resolve) => {
		if ((window as any).twttr?.widgets) {
			twitterScriptLoaded = true;
			resolve();
			return;
		}

		const script = document.createElement("script");
		script.src = "https://platform.twitter.com/widgets.js";
		script.async = true;
		script.charset = "utf-8";

		script.onload = () => {
			twitterScriptLoaded = true;
			resolve();
		};

		script.onerror = () => {
			twitterScriptLoaded = true;
			resolve();
		};

		document.body.appendChild(script);
	});

	return twitterScriptPromise;
}

export function TweetEmbed({ html, tweetId }: TweetEmbedProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const processTweet = async () => {
			try {
				await loadTwitterScript();

				if ((window as any).twttr?.widgets) {
					(window as any).twttr.widgets.load(containerRef.current);
				}
			} catch (error) {
				console.error("Failed to load tweet:", error);
			}
		};

		processTweet();
	}, [html]);

	return (
		<div
			ref={containerRef}
			className="flex justify-center my-6 min-h-[200px] [&_iframe]:mx-auto"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
