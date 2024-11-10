import { NextApiRequest, NextApiResponse } from "next";

import Database from "@lib/database";

import { Page } from "@lib/entities/pages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const pageRepository = await Database.getRepository(Page);
    if (req.method === "GET") {
      const allPages = await pageRepository.find();
      res.status(200).json(allPages);
    } else if (req.method === "POST") {
      const { title, slug, content } = req.body;
      const newPage = pageRepository.create({ title, slug, content });
      await pageRepository.save(newPage);
      res.status(201).json(newPage);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.log("Error in posts API: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
