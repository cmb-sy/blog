import { NextRequest, NextResponse } from "next/server";
import blogData from "@/blog-data.json";
import { getPostsData } from "@/app/lib/posts";

const GET = (req: NextRequest, { params }: { params: { id: string } }) => {
  console.log("aaaa", getPostsData());
  const { id } = params;
  console.log("id見るぜよ", IDBCursor);
  const postsData = getPostsData();

  const blogArticle = postsData.find((blog) => blog.id === id);

  if (!blogArticle) {
    return NextResponse.json({}, { status: 404 });
  }

  return NextResponse.json(blogArticle, { status: 200 });
};

export { GET };
