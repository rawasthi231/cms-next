import { GetServerSideProps } from "next";

import Head from "next/head";

import config from "@/config/index";

import { IPosts } from "@/typings/index";

export default function Posts({ post }: { post: IPosts }) {
  return (
    <>
      <Head>
        <title>Posts | {post.title}</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { params } = context;
    const res = await fetch(`${config.baseUrl}/api/posts/${params?.id}`);
    const post = await res.json();

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        post: [],
      },
    };
  }
};
