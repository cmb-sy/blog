import { NextResponse } from "next/server";
import { getPostsData } from "@/app/lib/posts";

// import blogData from "@/blog-data.json";

const GET = () => {
  console.log("aa", getPostsData());
  const postsData = getPostsData();
  return NextResponse.json(postsData);
};

export { GET };
