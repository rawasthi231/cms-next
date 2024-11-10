import { GetServerSideProps } from "next";

import Head from "next/head";
import Link from "next/link";

import { useInfiniteQuery } from "@tanstack/react-query";

import config from "@/config/index";
import DataList from "@/components/dataList";

import { IData } from "@/typings/index";

export default function Pages({ initialpages }: { initialpages: IData[] }) {
  const { data, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["pages"],
    queryFn: ({ pageParam = 0 }) =>
      fetch(`${config.baseUrl}/api/pages?page=${pageParam}`).then((res) =>
        res.json()
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: { pages: [initialpages], pageParams: [0] },
    select: (data) => data.pages.flat(),
  });

  console.log("data", data);

  const handleView = (id: number) => {
    console.log(`Viewing post with ID: ${id}`);
    // Redirect or show post details
  };

  const handleEdit = (id: number) => {
    console.log(`Editing post with ID: ${id}`);
    // Redirect to edit page or open edit modal
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting post with ID: ${id}`);
    // Confirm and delete post from state or database
    // setPosts(posts.filter((post) => post.id !== id));
  };

  const handleCreateNew = () => {
    console.log("Creating a new post");
    // Redirect to create post page or open modal
  };

  return (
    <>
      <Head>
        <title>pages</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>pages</h1>
        {/* {data?.pages.map((page, i) => (
          <div key={i}>
            {page?.map((post: IData) => (
              <Link key={post.id} href={`/pages/${post.id}`}>
                <div key={post.id}>
                  <h2>{post.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        ))} */}
      </div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <DataList
          posts={data}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreateNew={handleCreateNew}
        />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`${config.baseUrl}/api/pages?page=0`);
    const initialpages = await res.json();

    return {
      props: {
        initialpages,
      },
    };
  } catch (error) {
    console.error("error", error);
    return {
      props: {
        initialpages: [],
      },
    };
  }
};
