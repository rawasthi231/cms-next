import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Head from "next/head";

import config from "@/config/index";
import CMSLayout from "@/layouts/CMSlayout";

import { IData } from "@/typings/index";

export default function Pages({ page }: { page: IData }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Pages | {page.title}</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CMSLayout title={page.title}>
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back
            </button>
            <button
              onClick={() => router.push(`/pages/${page.slug}/edit`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit
            </button>
          </div>

          <div
            className="bg-white p-2 rounded mt-6 max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </CMSLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { params } = context;
    const res = await fetch(`${config.baseUrl}/api/pages/${params?.slug}`);
    const page = await res.json();

    return {
      props: {
        page,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        page: [],
      },
    };
  }
};
