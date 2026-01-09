import { auth } from "@/auth";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const params = {search : query || null};

  const session = await auth();
  console.log(session?.id);

  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY, params
  });

  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading">
          Welcome to the Blog of <br /> Peace Maker
        </h1>
        <p className="sub-heading max-w-2xl!">
          Things that he is passionate about.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for "${query}"` : "Latest Posts"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="text-center text-20-semibold">No posts found.</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
