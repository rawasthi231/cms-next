import { GetServerSideProps } from "next";

import Head from "next/head";
import Link from "next/link";

import { useInfiniteQuery } from "@tanstack/react-query";

import config from "@/config/index";

import { IPosts } from "@/typings/index";

export default function Posts({ initialPosts }: { initialPosts: IPosts[] }) {
  const { data, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) =>
      fetch(`${config.baseUrl}/api/posts?page=${pageParam}`).then((res) =>
        res.json()
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: { pages: [initialPosts], pageParams: [0] },
  });

  console.log("isFetching", isFetching);
  console.log("hasNextPage", hasNextPage);

  return (
    <>
      <Head>
        <title>Posts</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Posts</h1>
        {data.pages.map((page, i) => (
          <div key={i}>
            {page.map((post: IPosts) => (
              <Link key={post.id} href={`/posts/${post.id}`}>
                <div key={post.id}>
                  <h2>{post.title}</h2>
                  {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`${config.baseUrl}/api/posts?page=0`);
    const initialPosts = await res.json();

    return {
      props: {
        initialPosts,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        initialPosts: [],
      },
    };
  }
};
