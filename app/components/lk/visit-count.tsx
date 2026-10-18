"use client";

import { useEffect, useState } from "react";

/** "total visits: N", counted once per browser session. Hidden if the counter is unavailable. */
export function VisitCount() {
	const [total, setTotal] = useState<number | null>(null);

	useEffect(() => {
		let counted = false;
		try {
			counted = sessionStorage.getItem("lk-visit") === "1";
		} catch {
			// Storage blocked: count this load and move on.
		}
		fetch("/api/visits", { method: counted ? "GET" : "POST" })
			.then((r) => (r.ok ? r.json() : null))
			.then((d) => {
				if (typeof d?.total !== "number") return;
				setTotal(d.total);
				try {
					sessionStorage.setItem("lk-visit", "1");
				} catch {}
			})
			.catch(() => {});
	}, []);

	if (total === null) return null;
	return <p className="lk-visits">total visits: {total.toLocaleString("en-IN")}</p>;
}
