export interface Bookmark {
  _id: string;
  link: string;
  title: string;
  description?: string;
  tags?: string[];
}
