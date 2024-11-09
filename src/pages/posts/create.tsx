import Head from "next/head";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { postSchema } from "@/validation/schema";
import { useForm } from "react-hook-form";

import config from "@/config/index";

import InputWrapper from "@/components/formElements/InputWrapper";
import TextEditor from "@/components/formElements/TextEditor";
import Textbox from "@/components/formElements/Textbox";
import Button from "@/components/formElements/Button";

import { IPosts } from "@/typings";
import { errorToast, successToast } from "@/components/toast";

export default function CreatePost() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const { mutate, isPending } = useMutation<
    Partial<IPosts>,
    unknown,
    Partial<IPosts>
  >({
    mutationFn: (newPost: Partial<IPosts>) =>
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
    },
    onError: (error) => {
      console.log("Error while creating post", error);
      errorToast("Oops! Something went wrong");
    },
  });

  const onSubmit = (data: Partial<IPosts>) => {
    console.log("data", data);
    mutate(data);
  };

  return (
    <>
      <Head>
        <title>Create Post</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Render your posts here */}

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <InputWrapper.Label htmlFor="title">Title</InputWrapper.Label>
            <Textbox control={control} id="title" name="title" type="text" />
            {errors.title && errors.title.message ? (
              <InputWrapper.Error message={errors.title?.message} />
            ) : null}
          </InputWrapper>
          <InputWrapper>
            <InputWrapper.Label htmlFor="slug">Slug</InputWrapper.Label>
            <Textbox control={control} id="slug" name="slug" type="text" />
            {errors.title && errors.title.message ? (
              <InputWrapper.Error message={errors.title?.message} />
            ) : null}
          </InputWrapper>
          <InputWrapper>
            <InputWrapper.Label htmlFor="content">Content</InputWrapper.Label>
            <TextEditor control={control} id="content" name="content" />
            {errors.title && errors.title.message ? (
              <InputWrapper.Error message={errors.title?.message} />
            ) : null}
          </InputWrapper>
          <Button disabled={isPending}>
            {isPending ? "Creating Post..." : "Create Post"}
          </Button>
        </form>
      </div>
    </>
  );
}
