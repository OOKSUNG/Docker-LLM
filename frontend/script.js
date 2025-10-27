const sendBtn = document.getElementById("send");
const inputEl = document.getElementById("input");
const outputEl = document.getElementById("output");

sendBtn.addEventListener("click", async () => {
    const prompt = inputEl.value;
    if (!prompt) return;

    outputEl.value = "Loading...";

    try {
        const response = await fetch("http://localhost:5000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputs: prompt })
        });

        const data = await response.json();
        console.log(data);
        // Hugging Face TGI는 data[0].generated_text로 반환됨
        if (data.generated_text) {
            outputEl.value = data.generated_text;
        } else {
            outputEl.value = "No generated text in response";
        }
    } catch (err) {
        console.error(err);
        outputEl.value = "Error: " + err.message;
    }
});

