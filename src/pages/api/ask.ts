import type { NextApiRequest, NextApiResponse } from "next";

type RAGResponse = {
  answer: string;
};

type ErrorResponse = {
  error: string;
};

type AskRequestBody = {
  query: string;
};

export default async function handler(
  req: NextApiRequest & { body: AskRequestBody },
  res: NextApiResponse<RAGResponse | ErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const { query } = req.body;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const response = await fetch("https://0da8-182-253-51-23.ngrok-free.app/rag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      return res.status(500).json({ error: "RAG server failed" });
    }

    const raw: unknown = await response.json();
    const data: RAGResponse = raw as RAGResponse;

    res.status(200).json(data);
  } catch (error) {
    console.error("Connection error:", error);
    res.status(500).json({ error: "Failed to connect to RAG server" });
  }
}
