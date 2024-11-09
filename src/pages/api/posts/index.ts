import { NextApiRequest, NextApiResponse } from "next";

import Database from "@lib/database";

import { Post } from "@lib/entities/posts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const postRepository = await Database.getRepository(Post);
    if (req.method === "GET") {
      console.log("GET request received");
      const allPosts = await postRepository.find();
      console.log("All posts: ", allPosts);
      res.status(200).json(allPosts);
    } else if (req.method === "POST") {
      const { title, slug, content } = req.body;
      console.log("POST request received with data: ", req.body);
      const newPost = postRepository.create({ title, slug, content });
      await postRepository.save(newPost);
      res.status(201).json(newPost);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.log("Error in posts API: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
