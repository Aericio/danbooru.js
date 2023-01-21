import type { RelatedTagOptions } from "../types";
import type { GetRequestOptions } from "../danbooru";

/**
 * @see {@link https://github.com/danbooru/danbooru/blob/master/app/logical/related_tag_query.rb}
 */
export function related_tag(query: string, options?: Partial<RelatedTagOptions>): GetRequestOptions {
  return {
    route: "related_tag",
    searchParams: {
      query,
      ...options,
    },
  };
}
