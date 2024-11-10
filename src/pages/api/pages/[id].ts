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
      const { id } = req.query;
      const page = await pageRepository.findOne({
        where: { slug: id as string },
      });
      if (!page) {
        res.status(404).json({ error: "Page not found" });
        return;
      }
      res.status(200).json(page);
    } else if (req.method === "DELETE") {
      const { id } = req.query;
      await pageRepository.delete(id as string);
      res.status(204).end();
    } else if (req.method === "PUT") {
      const { id, title, slug, content } = req.body;
      const page = await pageRepository.findOne({
        where: { id: +(id as string) },
      });
      if (!page) {
        res.status(404).json({ error: "Page not found" });
        return;
      }
      page.title = title;
      page.slug = slug;
      page.content = content;
      await pageRepository.save(page);
      res.status(200).json(page);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.log("Error in pages API: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
