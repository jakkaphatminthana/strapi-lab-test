export interface RawMyBlog {
  id: number;
  title?: string;
  description?: string;
  createdAt?: string;
  thumbnail?: { url?: string };
  author?: { id?: string; name?: string; publisher?: string };
}

export interface MyBlogCreateReq {
  title: string;
  description?: string;
  thumbnail?: number;
  detail?: any;
  author?: number;
}

export interface MyBlogEditReq {
  title?: string;
  description?: string;
  thumbnail?: number;
  detail?: any;
  author?: number;
}

export interface MyBlogModel {
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

const toModel = (raw: RawMyBlog): MyBlogModel => {
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

const MyBlog = { toModel };
export default MyBlog;
