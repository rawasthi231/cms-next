import * as Yup from "yup";

export const postSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  slug: Yup.string().required("Slug is required"),
  content: Yup.string().required("Content is required"),
});
