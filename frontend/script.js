const sendBtn = document.getElementById("send");
const inputEl = document.getElementById("input");
const outputEl = document.getElementById("output");

sendBtn.addEventListener("click", async () => {
    const prompt = inputEl.value;
    if (!prompt) return;

    outputEl.value = "Loading...";

    try {
        // Docker 호스트에서 접근할 수 있는 포트 사용
        const response = await fetch("http://localhost:4000/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        outputEl.value = data.answer || "No answer received";
    } catch (err) {
        console.error(err);
        outputEl.value = "Error: " + err.message;
    }
});


