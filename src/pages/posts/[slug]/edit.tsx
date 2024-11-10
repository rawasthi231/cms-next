import { GetServerSideProps } from "next";

import Head from "next/head";

import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import config from "@/config/index";
import PostEditor from "@/components/postEditor";

import { IData } from "@/typings";
import { errorToast, successToast } from "@/components/toast";

export default function EditPost({ post }: { post: IData }) {
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    Partial<IData>,
    unknown,
    Partial<IData>
  >({
    mutationFn: (updatedPost: Partial<IData>) =>
      fetch(`${config.baseUrl}/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      }).then((res) => res.json()),
    onSuccess: async (data) => {
      console.log("Post updated successfully", data);
      successToast("Post updated successfully");
      router.push("/posts?refetch=true");
    },
    onError: (error) => {
      console.log("Error while updating post", error);
      errorToast("Oops! Something went wrong");
    },
  });

  return (
    <>
      <Head>
        <title>Edit Post</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostEditor
        title="Edit Post"
        isPending={isPending}
        onSave={mutate}
        data={post}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { params } = context;
    const res = await fetch(`${config.baseUrl}/api/posts/${params?.slug}`);
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
