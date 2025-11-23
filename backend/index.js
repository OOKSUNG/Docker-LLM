const express = require("express");
const cors = require("cors"); 
const { Pool } = require("pg");
const axios = require("axios");

const app = express();
app.use(express.json());

app.use(cors());


// DB 연결
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: "db",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
});

// LLM 요청
app.post("/ask", async (req, res) => {
    const { prompt } = req.body;
    console.log("Received /ask request:", req.body); 
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    try {
        // LLM 컨테이너에 요청
        const llmRes = await axios.post(
            "http://llm:80/generate",
            { inputs: prompt },
            { timeout: 60000 }
        );

        const answer = llmRes.data.generated_text;
        console.log("LLM answer:", answer);

        // DB에 저장
        const dbRes = await pool.query(
            "INSERT INTO prompts(prompt_text, response_text) VALUES($1, $2)",
            [prompt, answer]
        );
        console.log("DB insert result:", dbRes.rowCount);

        res.json({ answer });
    } catch (err) {
        console.error("LLM request failed:", err);
        res.status(500).json({ error: "LLM request failed" });
    }
});

const PORT = process.env.PORT || 4000;  
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
