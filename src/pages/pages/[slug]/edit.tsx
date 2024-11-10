import { GetServerSideProps } from "next";

import Head from "next/head";

import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import config from "@/config/index";
import PageEditor from "@/components/postEditor";

import { IData } from "@/typings";
import { errorToast, successToast } from "@/components/toast";

export default function EditPage({ page }: { page: IData }) {
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    Partial<IData>,
    unknown,
    Partial<IData>
  >({
    mutationFn: (updatedPage: Partial<IData>) =>
      fetch(`${config.baseUrl}/api/pages/${page.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPage),
      }).then((res) => res.json()),
    onSuccess: async (data) => {
      console.log("Page updated successfully", data);
      successToast("Page updated successfully");
      router.push("/pages?refetch=true");
    },
    onError: (error) => {
      console.log("Error while updating page", error);
      errorToast("Oops! Something went wrong");
    },
  });

  return (
    <>
      <Head>
        <title>Edit Page</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageEditor
        title="Edit Page"
        isPending={isPending}
        onSave={mutate}
        data={page}
      />
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
