"use client";

import { useEffect, useRef } from "react";

interface TweetEmbedProps {
	tweetId: string;
	html?: string;
}

let twitterScriptLoaded = false;

async function loadTwitterScript(): Promise<void> {
	if (twitterScriptLoaded) return;

	if ((window as any).twttr?.widgets) {
		twitterScriptLoaded = true;
		return;
	}

	return new Promise((resolve) => {
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
}

export function TweetEmbed({ tweetId, html }: TweetEmbedProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const initTweet = async () => {
			await loadTwitterScript();

			if ((window as any).twttr?.widgets) {
				(window as any).twttr.widgets.load(containerRef.current);
			}
		};

		// Use requestAnimationFrame to ensure DOM is ready
		requestAnimationFrame(() => {
			initTweet();
		});
	}, [tweetId, html]);

	if (tweetId) {
		return (
			<div
				ref={containerRef}
				className="flex justify-center my-6 min-h-[200px]"
			>
				<blockquote
					className="twitter-tweet"
					data-theme="light"
					data-dnt="true"
				>
					<a href={`https://twitter.com/laksh_2705/status/${tweetId}`}></a>
				</blockquote>
			</div>
		);
	}

	return (
		<div
			ref={containerRef}
			className="flex justify-center my-6 min-h-[200px]"
			dangerouslySetInnerHTML={{ __html: html || "" }}
		/>
	);
}
