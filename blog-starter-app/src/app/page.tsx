import Container from "@/app/components/container";
import { MoreStories } from "@/app/components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main>
      <Container>{<MoreStories posts={allPosts} />}</Container>
    </main>
  );
}
