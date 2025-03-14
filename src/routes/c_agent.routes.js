import express from "express";
import { runAgent } from "../agents/c-programming.agent.js";

const router = express.Router();

// Ask a question
router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    const response = await runAgent(question);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Debug code
router.post("/debug", async (req, res) => {
  try {
    const { code } = req.body;
    const response = await runAgent(`Debug this code:\n${code}`);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;