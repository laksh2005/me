/**
 * Chat mockups for the Keepr page: one card per feature, written as the
 * conversation a user would actually have on WhatsApp.
 */
export type ChatLine =
	| {
			from: "you" | "keepr";
			time: string;
			text: string;
			/** The saved message Keepr quotes back, shown as a WhatsApp quote bubble. */
			quote?: string;
			/** The extracted answer, shown after a pointing hand. */
			answer?: string;
	  }
	| { divider: string };

export interface ChatCard {
	title: string;
	caption: string;
	lines: ChatLine[];
}

export const KEEPR_CHATS_INTRO = {
	tag: "in chat",
	title: "What it looks like",
	subtitle: "No app, no commands to learn. Just WhatsApp.",
};

export const KEEPR_CHATS: ChatCard[] = [
	{
		title: "Save anything",
		caption: "Text, links, photos, forwards. Send it and it's kept.",
		lines: [
			{ from: "you", time: "10:42", text: "Office wifi password is sunflower42" },
			{ from: "keepr", time: "10:42", text: "Saved ✅" },
		],
	},
	{
		title: "Ask in plain words, get just the answer",
		caption:
			"Pulls out exactly what you asked for (a password, link, date or place) and quotes where it came from.",
		lines: [
			{ from: "you", time: "18:05", text: "what's the wifi password?" },
			{
				from: "keepr",
				time: "18:05",
				quote: "Office wifi password is sunflower42",
				text: "",
				answer: "sunflower42",
			},
		],
	},
	{
		title: "Voice notes become searchable",
		caption: "Talk instead of typing. The words are saved, and the recording is never stored.",
		lines: [
			{ from: "you", time: "09:14", text: "🎙️ voice note 0:08" },
			{
				from: "keepr",
				time: "09:14",
				text: "Saved ✅ 🎙️ \"call the plumber on monday about the leak\"",
			},
			{ divider: "later" },
			{ from: "you", time: "20:31", text: "what did I say about the plumber" },
			{
				from: "keepr",
				time: "20:31",
				quote: "🎙️ voice note",
				text: "Call the plumber on Monday about the leak",
			},
		],
	},
	{
		title: "Keepr offers reminders on its own",
		caption: "Mention a date and Keepr offers to remind you.",
		lines: [
			{ from: "you", time: "13:02", text: "dentist moved to 4pm thursday" },
			{
				from: "keepr",
				time: "13:02",
				text: "Saved ✅ Want a reminder Thu, Nov 5, 4:00 PM? Reply yes.",
			},
			{ from: "you", time: "13:02", text: "yes" },
			{
				from: "keepr",
				time: "13:03",
				text: "Got it! I'll remind you Thu, Nov 5, 4:00 PM: dentist moved to 4pm thursday",
			},
		],
	},
];
