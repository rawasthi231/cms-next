import { GetServerSideProps } from "next";

import Head from "next/head";

import { useEffect } from "react";
import { useRouter } from "next/router";

import { useInfiniteQuery } from "@tanstack/react-query";

import config from "@/config/index";
import DataList from "@components/dataList";
import CMSLayout from "@/layouts/CMSlayout";

import { IData } from "@/typings/index";

export default function Pages({ initialPages }: { initialPages: IData[] }) {
  const router = useRouter();

  useEffect(() => {
    if (router.query.refetch) {
      refetch();
    }
  }, []);

  const { data, hasNextPage, isFetching, refetch } = useInfiniteQuery({
    queryKey: ["pages"],
    queryFn: ({ pageParam = 0 }) =>
      fetch(`${config.baseUrl}/api/pages?page=${pageParam}`).then((res) =>
        res.json()
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: { pages: [initialPages], pageParams: [0] },
    select: (data) => data.pages.flat(),
  });

  const handleView = (slug: string) => {
    console.log(`Viewing page with ID: ${slug}`);
    router.push(`/pages/${slug}`);
  };

  const handleEdit = (slug: string) => {
    console.log(`Editing page with ID: ${slug}`);
    router.push(`/pages/${slug}/edit`);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this page?");
    if (confirmDelete) {
      console.log(`Deleting page with ID: ${id}`);
      try {
        const res = await fetch(`${config.baseUrl}/api/pages/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          refetch();
        } else {
          alert("Failed to delete page");
        }
      } catch (error) {
        alert("Error: " + JSON.stringify(error));
      }
    }
  };

  const handleCreateNew = () => {
    router.push("/pages/create");
  };

  return (
    <>
      <Head>
        <title>Pages</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CMSLayout title="Pages">
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
    const res = await fetch(`${config.baseUrl}/api/pages?page=0`);
    const initialPages = await res.json();

    return {
      props: {
        initialPages,
      },
    };
  } catch (error) {
    console.error("error", error);
    return {
      props: {
        initialPages: [],
      },
    };
  }
};
