import {
  buildWispClient,
  GetPostsResult,
  GetPostResult,
} from "@wisp-cms/client";

export const wisp = buildWispClient({
  blogId: process.env.NEXT_PUBLIC_BLOG_ID as string,
});

export type { GetPostsResult, GetPostResult };
