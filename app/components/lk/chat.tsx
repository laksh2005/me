import React from "react";
import { ChatCard, KEEPR_CHATS_INTRO } from "@/util/keepr-chats";

/** WhatsApp-style chat cards. Server-rendered: no client JavaScript. */
export function ChatCards({ cards }: { cards: ChatCard[] }) {
	return (
		<>
			<h2># {KEEPR_CHATS_INTRO.tag}</h2>
			<p className="lk-chat-sub">
				{KEEPR_CHATS_INTRO.title}. {KEEPR_CHATS_INTRO.subtitle}
			</p>
			<div className="lk-chats">
				{cards.map((card) => (
					<figure key={card.title} className="lk-chat">
						<figcaption className="lk-chat-title">{card.title}</figcaption>
						<div className="lk-thread" role="img" aria-label={`Chat example: ${card.title}`}>
							{card.lines.map((line, i) =>
								"divider" in line ? (
									<span key={i} className="lk-gap">
										{line.divider}
									</span>
								) : (
									<div key={i} className={`lk-bub ${line.from}`}>
										{line.quote && <span className="lk-quote">↪︎ {line.quote}</span>}
										{line.text && <span className="lk-bub-text">{line.text}</span>}
										{line.answer && <span className="lk-ans">👉 {line.answer}</span>}
										<span className="lk-time">{line.time}</span>
									</div>
								),
							)}
						</div>
						<p className="lk-chat-cap">{card.caption}</p>
					</figure>
				))}
			</div>
		</>
	);
}
