"use client";

import { useEffect, useState } from "react";

/** Current time in Delhi, e.g. "2:14am". Renders nothing until mounted. */
export function DelhiClock() {
	const [now, setNow] = useState<string | null>(null);

	useEffect(() => {
		const fmt = () =>
			new Intl.DateTimeFormat("en-US", {
				timeZone: "Asia/Kolkata",
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
			})
				.format(new Date())
				.replace(" ", "")
				.toLowerCase();
		setNow(fmt());
		const id = setInterval(() => setNow(fmt()), 30_000);
		return () => clearInterval(id);
	}, []);

	return <span>{now ? `${now} in Delhi, India` : "Delhi, India"}</span>;
}
