"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Shared scroll-reveal wrapper, kept as its own client component so server
 * components (like the project detail page, which needs generateStaticParams)
 * can still use it without becoming client components themselves.
 */
export const Reveal: React.FC<{
	children: React.ReactNode;
	delay?: number;
	className?: string;
	y?: number;
}> = ({ children, delay = 0, className = "", y = 20 }) => (
	<motion.div
		initial={{ opacity: 0, y }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true, margin: "-90px" }}
		transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
		className={className}
	>
		{children}
	</motion.div>
);
