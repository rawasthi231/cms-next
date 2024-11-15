import Head from "next/head";

import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import config from "@/config/index";
import PostEditor from "@/components/postEditor";

import { IData } from "@/typings";
import { errorToast, successToast } from "@/components/toast";

export default function CreatePost() {
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    Partial<IData>,
    unknown,
    Partial<IData>
  >({
    mutationFn: (newPost: Partial<IData>) =>
      fetch(`${config.baseUrl}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      }).then((res) => res.json()),
    onSuccess: async (data) => {
      console.log("Post created successfully", data);
      successToast("Post created successfully");
      router.push("/posts?refetch=true");
    },
    onError: (error) => {
      console.log("Error while creating post", error);
      errorToast("Oops! Something went wrong");
    },
  });

  return (
    <>
      <Head>
        <title>Create Post</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostEditor
        title="Create New Post"
        isPending={isPending}
        onSave={mutate}
      />
    </>
  );
}
