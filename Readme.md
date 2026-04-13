# 🧠 Smart Web Research Agent (LangGraph + Groq)

An intelligent **AI-powered research assistant** built using **LangGraph**, **LangChain**, and **Groq LLMs**.
This agent can generate search queries, fetch real-time web data, filter relevant information, and produce structured, high-quality summaries.

---

## 🚀 Features

* 🔍 **Automated Web Research**
  Generates multiple search queries and collects real-time data.

* 🌐 **Web Scraping Integration**
  Extracts useful content from web pages using BeautifulSoup.

* 🧹 **Smart Filtering**
  Removes noise (ads, junk text) and keeps only relevant information.

* 🧠 **Structured Output (JSON)**
  Uses Pydantic + LangChain structured output for reliable results.

* ⚡ **LangGraph Workflow**
  Multi-step pipeline with nodes for query generation, research, and summarization.

* 🔗 **Tool-based Agent System**
  Integrates search + scraping tools with reasoning capabilities.

---

## 🏗️ Architecture

```
User Query
   ↓
Generate Queries (LLM)
   ↓
Web Search (Tavily)
   ↓
Web Scraping (BeautifulSoup)
   ↓
Filtering & Processing
   ↓
Final Summary (LLM)
```

---

## 🛠️ Tech Stack

* **LangGraph** – Workflow orchestration
* **LangChain** – Agent + tools framework
* **Groq (LLaMA3)** – Fast LLM inference
* **Tavily API** – Web search
* **BeautifulSoup** – Web scraping
* **Python** – Core language

---

## 📦 Installation

```bash
git clone https://github.com/your-username/research-agent.git
cd research-agent

pip install -r requirements.txt
```

---

## 🔑 Environment Variables

Create a `.env` file:

```
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

---

## ▶️ Usage

Run the script:

```bash
python main.py
```

Example query:

```
Which IPL team has the most followers on social media?
```

---

## 🧩 Project Structure

```
├── main.py              # Main execution file
├── multiagent.py             # Web search & scraping tools
├── multiagentfrontend.py             # LangGraph workflow
├── public-->HTML/CSS,JavaScript       # website flow        
├── .env                 # API keys
└── README.md
```

---

## 🧠 LangGraph Workflow

### Nodes:

* `generate_query` → Creates search queries
* `web_research` → Fetches web results
* `summarize` → Generates final answer

### State:

```python
class ResearchState:
    queries: List[str]
    results: List[str]
    summary: str
```

---

## 📊 Example Output

```json
{
  "queries": [
    "IPL team followers Instagram 2025",
    "most popular IPL team social media stats"
  ],
  "summary": "Chennai Super Kings has the highest followers..."
}
```

---

## ⚠️ Challenges & Fixes

| Problem             | Solution                          |
| ------------------- | --------------------------------- |
| Unstructured output | Used Pydantic + structured_output |
| Noisy web data      | Added filtering logic             |
| Slow response       | Limited search results            |
| Hallucination       | Used real-time web data           |

---

## 🔥 Future Improvements

* ✅ Multi-agent system (Planner + Researcher + Critic)
* ✅ PDF + Web hybrid research
* ✅ Streamlit UI
* ✅ Async scraping (faster execution)
* ✅ Source citation display

---

## 📌 Key Learnings

* Building **stateful AI agents** with LangGraph
* Handling **real-time web data**
* Ensuring **structured LLM outputs**
* Designing **scalable AI workflows**

---

## 🤝 Contributing

Feel free to fork this repo and submit pull requests 🚀

---

## 📄 License

This project is open-source and available under the MIT License.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
