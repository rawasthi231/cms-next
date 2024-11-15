import { GetServerSideProps } from "next";

import Head from "next/head";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useInfiniteQuery } from "@tanstack/react-query";

import config from "@/config/index";
import DataList from "@/components/dataList";
import CMSLayout from "@/layouts/CMSlayout";

import { IData } from "@/typings/index";

export default function Posts({ initialPosts }: { initialPosts: IData[] }) {
  const router = useRouter();

  const [postContent, setPostContent] = useState<string>("");

  useEffect(() => {
    if (router.query.refetch) {
      refetch();
    }
  }, []);

  const { data, hasNextPage, isFetching, refetch } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) =>
      fetch(`${config.baseUrl}/api/posts?page=${pageParam}`).then((res) =>
        res.json()
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: { pages: [initialPosts], pageParams: [0] },
    select: (data) => data.pages.flat(),
  });

  const handleView = (slug: string) => {
    console.log(`Viewing post with ID: ${slug}`);
    router.push(`/posts/${slug}`);
  };

  const handleEdit = (slug: string) => {
    console.log(`Editing post with ID: ${slug}`);
    router.push(`/posts/${slug}/edit`);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      console.log(`Deleting post with ID: ${id}`);
      try {
        const res = await fetch(`${config.baseUrl}/api/posts/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          refetch();
        } else {
          alert("Failed to delete post");
        }
      } catch (error) {
        alert("Error: " + JSON.stringify(error));
      }
    }
  };

  const handleCreateNew = () => {
    router.push("/posts/create");
  };
  return (
    <>
      <Head>
        <title>Posts</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CMSLayout title="Posts">
        <div className="min-h-screen bg-gray-100 flex ">
          <DataList
            data={data}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreateNew={handleCreateNew}
          />
        </div>
      </CMSLayout>
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
    console.error("error", error);
    return {
      props: {
        initialPosts: [],
      },
    };
  }
};
