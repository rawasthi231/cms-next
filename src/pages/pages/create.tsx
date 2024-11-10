import Head from "next/head";

import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import config from "@/config/index";
import PageEditor from "@/components/postEditor";

import { IData } from "@/typings";
import { errorToast, successToast } from "@/components/toast";

export default function CreatePage() {
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    Partial<IData>,
    unknown,
    Partial<IData>
  >({
    mutationFn: (newPage: Partial<IData>) =>
      fetch(`${config.baseUrl}/api/pages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPage),
      }).then((res) => res.json()),
    onSuccess: async (data) => {
      console.log("Page created successfully", data);
      successToast("Page created successfully");
      router.push("/pages?refetch=true");
    },
    onError: (error) => {
      console.log("Error while creating page", error);
      errorToast("Oops! Something went wrong");
    },
  });

  return (
    <>
      <Head>
        <title>Create Page</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageEditor
        title="Create New Page"
        isPending={isPending}
        onSave={mutate}
      />
    </>
  );
}
