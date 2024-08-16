import { MDXRemote } from "next-mdx-remote/rsc";
import Highlight from "@/app/components/HighRight";
import remarkGfm from "remark-gfm";
// import { Post } from "@/types/post";
import ProfileCard from "@/app/components/ProfileCard";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism";
import "prismjs/components/prism-python.js";
import "prismjs/themes/prism-tomorrow.css";
import Toc from "@/app/components/toc"; // Tocコンポーネントを追加

type Post = {
  slug: string;
  title: string;
  date: string;
  blogContentsHTML: string;
};

// SSG
export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/blog/", {
    cache: "force-cache",
  });
  const blogData = await res.json();
  return blogData.map((blog: Post) => ({
    slug: blog.slug,
  }));
}

const getBlogArticle = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
    cache: "force-cache",
  });
  const blogArticle = await res.json();
  return blogArticle;
};

const BlogArticlePage = async ({ params }: { params: { slug: string } }) => {
  const blogArticle = await getBlogArticle(params.slug);

  return (
    <div className="container mx-auto py-5 px-2 lg:px-10 flex justify-end w-full">
      <div className="flex flex-col w-full max-w-5xl">
        <div className="w-full lg:w-4/5 bg-white bg-gray-100 p-5 rounded-lg min-h-screen w-full max-w-5xl">
          <h1 className="text-3xl font-bold text-gray-800">
            {blogArticle.title}
          </h1>
          <br />
          <div className="text-gray-600">{blogArticle.date}</div>
          <br />
          <div className="prose prose-lg text-gray-700 max-w-5xl">
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
              integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
              crossOrigin="anonymous"
            />
            <MDXRemote
              source={blogArticle.content}
              components={{ Highlight }}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkMath],
                  rehypePlugins: [rehypePrism, rehypeKatex, rehypeSlug],
                },
              }}
            />
          </div>
        </div>
      </div>
      <aside className="w-full lg:w-1/5 bg-gray-200 p-5 rounded-lg mt-5 lg:mt-0 hidden lg:block">
        <ProfileCard />
        <div className="text-gray-700 mt-5">
          <Toc /> {/* Tocコンポーネントを追加 */}
        </div>
      </aside>
    </div>
  );
};

export default BlogArticlePage;
