import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, ""); // スラッグから拡張子 .md を取り除く
  const fullPath = join(postsDirectory, `${realSlug}.md`); // 投稿ディレクトリとスラッグを結合して完全なパスを作成
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents); // matter関数を使ってメタデータとコンテンツを分離

  return { ...data, slug: realSlug, content } as Post;
}

// すべての投稿を取得し、日付順に並べ替えたリストを返します。
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
