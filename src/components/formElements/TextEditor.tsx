"use client";

import dynamic from "next/dynamic";

import { HTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import "react-quill/dist/quill.snow.css";

interface TextareaProps<T extends FieldValues>
  extends HTMLAttributes<HTMLTextAreaElement> {
  name: Path<T>;
  control: Control<T>;
}

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export default function Textarea<T extends FieldValues>({
  control,
  name,
  ...props
}: TextareaProps<T>) {
  return (
    <Controller
      control={control}
      render={({ field }) => (
        <QuillNoSSRWrapper
          theme="snow"
          value={field.value}
          onChange={field.onChange}
        />
      )}
      name={name}
      defaultValue={"" as T[typeof name]}
    />
  );
}
