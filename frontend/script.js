const sendBtn = document.getElementById("send");
const inputEl = document.getElementById("input");
const outputEl = document.getElementById("output");

sendBtn.addEventListener("click", async () => {
    const prompt = inputEl.value;
    if (!prompt) return;

    outputEl.value = "Loading...";

    try {
        const response = await fetch("http://127.0.0.1:5000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputs: prompt })
        });

        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.status);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
            outputEl.value = data[0]?.generated_text || "No response";
        } else if (data.generated_text) {
            outputEl.value = data.generated_text;
        } else {
            outputEl.value = "No response";
        }

    } catch (err) {
        console.error(err);
        outputEl.value = "Error: " + err.message;
    }
});

