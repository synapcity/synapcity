import { config } from "@/config";
import { wisp } from "@/lib/wisp";
import type { MetadataRoute } from "next";
import urlJoin from "url-join";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await wisp.getPosts();
  return [
    {
      url: config.blogUrl,
      lastModified: new Date(),
      priority: 0.8,
    },
    ...result.posts.map((post) => {
      return {
        url: urlJoin(config.blogUrl, "posts", post.slug),
        lastModified: new Date(post.updatedAt),
        priority: 0.8,
      };
    }),
  ];
}
