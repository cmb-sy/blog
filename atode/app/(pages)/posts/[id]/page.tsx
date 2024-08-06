interface TBlog {
  id: string;
  title: string;
  content: string;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/posts/");

  const blogData = await res.json();
  return blogData.map((blog: TBlog) => ({
    id: blog.id,
  }));
}

const getBlogArticle = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`);

  //   console.log(res);
  const blogArticle = await res.json();

  return blogArticle;
};

const BlogArticlePage = async ({ params }: { params: { id: string } }) => {
  const blogArtcile = await getBlogArticle(params.id);

  return (
    <div className="container mx-auto py-5">
      <h2 className="text-[50px]">{blogArtcile.title}</h2>
      <p>{blogArtcile.content}</p>
    </div>
  );
};

export default BlogArticlePage;
