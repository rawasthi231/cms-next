import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { IData } from "@/typings";

import InputWrapper from "@/components/formElements/InputWrapper";
import TextEditor from "@/components/formElements/TextEditor";
import Textbox from "@/components/formElements/Textbox";
import Button from "@/components/formElements/Button";
import CMSLayout from "@/layouts/CMSlayout";

import { postSchema } from "@/validation/schema";

interface PostEditorProps {
  title: string;
  data?: Partial<IData>;
  isPending: boolean;
  onSave: (content: Partial<IData>) => void;
}

const PostEditor = ({ data, isPending, onSave, title }: PostEditorProps) => {
  const router = useRouter();

  const [showPreview, setShowPreview] = useState(false);

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, []);

  useEffect(() => {
    if (watch("title")) {
      const slug = getValues("title")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      reset({ ...getValues(), slug });
    }
  }, [watch("title")]);

  return (
    <CMSLayout title={title}>
      <div className="mx-auto p-8 bg-white rounded-lg shadow-lg mt-5">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              showPreview
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-blue-600 border border-blue-600"
            }`}
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>
        {showPreview ? (
          <>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              {getValues("title")}
            </h1>
            <div
              className="bg-white p-2 rounded mt-6 max-w-none"
              dangerouslySetInnerHTML={{ __html: getValues("content") }}
            />
          </>
        ) : (
          <form onSubmit={handleSubmit(onSave)}>
            <InputWrapper className="mb-2">
              <InputWrapper.Label
                htmlFor="title"
                className="block text-gray-700 font-semibold mb-2"
              >
                Title
              </InputWrapper.Label>
              <Textbox
                control={control}
                id="title"
                name="title"
                type="text"
                className="w-full h-10 p-1 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.title && errors.title.message ? (
                <InputWrapper.Error message={errors.title?.message} />
              ) : null}
            </InputWrapper>
            <InputWrapper className="mb-2">
              <InputWrapper.Label
                htmlFor="slug"
                className="block text-gray-700 font-semibold mb-2"
              >
                Slug
              </InputWrapper.Label>
              <Textbox
                control={control}
                id="slug"
                name="slug"
                type="text"
                className="w-full h-10 p-1 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.title && errors.title.message ? (
                <InputWrapper.Error message={errors.title?.message} />
              ) : null}
            </InputWrapper>
            <InputWrapper className="mb-2">
              <InputWrapper.Label
                htmlFor="content"
                className="block text-gray-700 font-semibold mb-2"
              >
                Content
              </InputWrapper.Label>
              <TextEditor control={control} id="content" name="content" />
              {errors.title && errors.title.message ? (
                <InputWrapper.Error message={errors.title?.message} />
              ) : null}
            </InputWrapper>
            <Button
              disabled={isPending}
              className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none"
            >
              {data
                ? isPending
                  ? "Updating Post..."
                  : "Update Post"
                : isPending
                ? "Creating Post..."
                : "Create Post"}
            </Button>
          </form>
        )}
      </div>
    </CMSLayout>
  );
};

export default PostEditor;
