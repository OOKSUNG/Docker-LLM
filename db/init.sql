CREATE TABLE prompts (
    id SERIAL PRIMARY KEY,
    prompt_text TEXT,
    response_text TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);