import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";

// import SearchBar from "@/app/components/SearchBar";
import ArticleContent from "@/app/components/features/ArticleContent/ArticleContent";

import { Toc } from "@/app/components/features/SidebarItems/toc";

async function getAboutArticleBySlug(slug: string) {
  const aboutDirectoryPath = path.join(process.cwd(), "/app/(pages)/aboutBlog");
  const cleanSlug = slug.replace(/\.mdx$/, "");
  const articlePath = path.join(aboutDirectoryPath, `${cleanSlug}.mdx`);
  const articleContents = await fs.readFile(articlePath, "utf8");
  const parsedMatter = matter(articleContents);
  return {
    ...parsedMatter.data,
    title: parsedMatter.data.title,
    content: parsedMatter.content,
  };
}

const getBlogArticle = async (slug: string) => {
  const article = await getAboutArticleBySlug(slug);
  return article;
};

const AboutPage = async ({ params }: { params: { slug: string } }) => {
  const blogArticle = await getBlogArticle("aboutBlog.mdx");
  return (
    <ArticleContent
      blogArticle={blogArticle}
      // SidebarComponents={[<SearchBar key="searchBar" />, <Toc key="toc" />]}
      SidebarComponents={[<Toc key="toc" />]}
    />
  );
};

export default AboutPage;
