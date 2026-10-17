import { blogsData } from "@/util/data";

// The post page is a client component, so its metadata lives here.
export function generateMetadata({ params }: { params: { id: string } }) {
	const blog =
		blogsData.find((b) => b.slug === params.id) ??
		(/^\d+$/.test(params.id) ? blogsData[Number(params.id)] : undefined);
	if (!blog) return { title: "Post not found" };
	const description = blog.overview ?? blog.description;
	return {
		title: blog.title,
		description,
		openGraph: {
			title: blog.title,
			description,
			type: "article",
			images: blog.image ? [{ url: blog.image }] : undefined,
		},
	};
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
	return children;
}
