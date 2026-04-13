// ================= START PROCESS =================
async function startProcess() {
    const question = document.getElementById("question").value;

    if (!question) {
        alert("Please enter a question!");
        return;
    }

    resetUI();

    // Start Node
    activateNode("startNode");

    setTimeout(async () => {
        activateNode("researchNode");
        updateStatus("researchStatus", "Searching...");

        try {
            // 🔥 Wake up Render server (important)
            await fetch("https://multi-agent-system-5289.onrender.com/");

            const res = await fetch("https://multi-agent-system-5289.onrender.com/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question: question })
            });

            // ❗ Error handling
            if (!res.ok) {
                throw new Error("API Error");
            }

            const data = await res.json();

            // ================= RESEARCH =================
            updateContent("researchContent", data.research);
            updateStatus("researchStatus", "Completed ✅");

            setTimeout(() => {
                activateNode("writerNode");
                updateStatus("writerStatus", "Writing...");

                // ================= WRITER =================
                updateContent("writerContent", data.writer);
                updateStatus("writerStatus", "Completed ✅");

                setTimeout(() => {
                    activateNode("reviewerNode");
                    updateStatus("reviewerStatus", "Reviewing...");

                    // ================= FINAL =================
                    updateContent("reviewerContent", data.final_answer);
                    updateStatus("reviewerStatus", "Completed ✅");

                    activateNode("endNode");

                    // Update state
                    updateState(
                        question,
                        data.research,
                        data.writer,
                        data.final_answer
                    );

                }, 1500);

            }, 1500);

        } catch (err) {
            console.error("ERROR:", err);
            alert("Backend connection error!");
        }

    }, 1000);
}


// ================= FORMAT CONTENT =================
function formatContent(text) {

    // 🔥 Fix: object → string
    if (typeof text !== "string") {
        text = JSON.stringify(text, null, 2);
    }

    return text
        .replace(/^# (.*$)/gim, '<h2 style="color:#3b82f6;margin-top:10px;">$1</h2>')
        .replace(/^## (.*$)/gim, '<h3 style="color:#8b5cf6;">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#22c55e;">$1</strong>')
        .replace(/\n{2,}/g, "<br><br>")
        .replace(/\n/g, '<br>');
}


// ================= UPDATE CONTENT =================
function updateContent(id, text) {
    const element = document.getElementById(id);

    if (!text) {
        element.innerHTML = "<p>No data received</p>";
        return;
    }

    element.innerHTML = `<div class="result">${formatContent(text)}</div>`;
}


// ================= STATUS =================
function updateStatus(id, text) {
    document.getElementById(id).innerText = text;
}


// ================= NODE ACTIVE =================
function activateNode(id) {
    document.getElementById(id).classList.add("active");
}


// ================= RESET UI =================
function resetUI() {
    const statuses = ["researchStatus", "writerStatus", "reviewerStatus"];
    const contents = ["researchContent", "writerContent", "reviewerContent"];
    const nodes = ["startNode", "researchNode", "writerNode", "reviewerNode", "endNode"];

    statuses.forEach(id => {
        document.getElementById(id).innerText = "Waiting...";
    });

    contents.forEach(id => {
        document.getElementById(id).innerHTML =
            `<div class="placeholder"><p>Waiting for output...</p></div>`;
    });

    nodes.forEach(id => {
        document.getElementById(id).classList.remove("active");
    });

    document.getElementById("stateDisplay").innerText = `{
    "question": "",
    "research": "",
    "writer": "",
    "final_answer": ""
}`;
}


// ================= STATE UPDATE =================
function updateState(question, research, writer, final_answer) {
    const state = {
        question,
        research,
        writer,
        final_answer
    };

    document.getElementById("stateDisplay").innerText =
        JSON.stringify(state, null, 4);
}