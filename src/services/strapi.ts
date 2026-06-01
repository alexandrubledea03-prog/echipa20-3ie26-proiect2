import fallback from "@/assets/article-fallback.jpg";

export const STRAPI_URL =
  import.meta.env.VITE_STRAPI_URL ?? "https://joyful-moonlight-b000d90e41.strapiapp.com";

export const FALLBACK_IMAGE = fallback;

export interface StrapiImage {
  url: string;
  formats?: Record<string, { url: string }>;
  alternativeText?: string | null;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug?: string | null;
  description?: string | null;
}

export interface ArticleBlock {
  __component: string;
  id: number;
  body?: string;
  title?: string;
  file?: StrapiImage | null;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  description?: string | null;
  slug?: string | null;
  publishedAt: string;
  cover?: StrapiImage | null;
  category?: Category | null;
  author?: { name?: string } | null;
  blocks?: ArticleBlock[];
}

export interface About {
  id: number;
  documentId: string;
  title: string;
  blocks?: ArticleBlock[];
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}${path}`);
  if (!res.ok) throw new Error(`Strapi request failed: ${res.status}`);
  const json = await res.json();
  return json.data as T;
}

export const getImageUrl = (img?: StrapiImage | null): string => {
  if (!img?.url) return FALLBACK_IMAGE;
  return img.url.startsWith("http") ? img.url : `${STRAPI_URL}${img.url}`;
};

export const fetchArticles = () => request<Article[]>("/api/articles?populate=*");
export const fetchArticle = (documentId: string) =>
  request<Article>(`/api/articles/${documentId}?populate=*`);
export const fetchCategories = () => request<Category[]>("/api/categories?populate=*");
export const fetchCategory = (documentId: string) =>
  request<Category>(`/api/categories/${documentId}?populate=*`);
export const fetchCategoryArticles = (documentId: string) =>
  request<Article[]>(
    `/api/articles?populate=*&filters[category][documentId][$eq]=${documentId}`,
  );
export const fetchAbout = () => request<About>("/api/about?populate=*");
