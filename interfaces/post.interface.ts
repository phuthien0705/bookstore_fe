export interface IEachPostData {
  author: string;
  content: string;
  id: string;
  images: Array<{ key: string; url: string; _id: string }>;
  title: string;
}
