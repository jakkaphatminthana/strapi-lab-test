export interface RawMySpecialBlog {
  id: number;
  title: string;
  description?: string;
  createdAt?: string;
  thumbnail?: { url?: string } | null;
  author?: { id?: string; name?: string; publisher?: string } | null;
}

export interface MySpecialBlogModel {
  id: number;
  title: string;
  description?: string;
  createdAt?: string;
  imageUrl?: string | null;
  author?: null | {
    id: string;
    name: string;
    publisher: string;
  };
}

const toModel = (raw: RawMySpecialBlog): MySpecialBlogModel => {
  return {
    id: raw?.id,
    title: raw.title || "",
    description: raw.description || "",
    createdAt: raw.createdAt || "",
    imageUrl: raw.thumbnail?.url || null,
    author: raw.author
      ? {
          id: raw.author.id,
          name: raw.author.name,
          publisher: raw.author.publisher,
        }
      : null,
  };
};

const MySpecialBlogUtils = { toModel };
export default MySpecialBlogUtils;
