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
      const { id } = req.query;
      const post = await postRepository.findOne({
        where: { id: parseInt(id as string) },
      });
      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }
      res.status(200).json(post);
    } else if (req.method === "DELETE") {
      const { id } = req.query;
      await postRepository.delete(id as string);
      res.status(204).end();
    } else if (req.method === "PUT") {
      const { id, title, slug, content } = req.body;
      const post = await postRepository.findOne(id);
      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }
      post.title = title;
      post.slug = slug;
      post.content = content;
      await postRepository.save(post);
      res.status(200).json(post);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.log("Error in posts API: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
