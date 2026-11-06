export type PostStatus = "published" | "draft";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Absolute URL or site path (demo uploads). */
  coverImage: string | null;
  coverAlt: string;
  /** Sanitized HTML produced by the rich text editor. */
  contentHtml: string;
  readingMinutes: number;
  status: PostStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  views: number;
};

/** What the public list needs — keeps full HTML off listing pages. */
export type PostSummary = Pick<
  Post,
  "id" | "slug" | "title" | "excerpt" | "coverImage" | "coverAlt" | "readingMinutes" | "publishedAt"
>;

export type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  coverAlt: string;
  contentHtml: string;
  status: PostStatus;
};
