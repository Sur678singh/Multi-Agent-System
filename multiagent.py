from langchain_groq import ChatGroq
from dotenv import load_dotenv
from langgraph.graph import StateGraph,START
from pydantic import BaseModel
from langchain_tavily import TavilySearch
from typing import TypedDict
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# *****************************load Env File*************************************
load_dotenv()
app = FastAPI()

# CORS (IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# make llm
llm=ChatGroq(model='openai/gpt-oss-20b')

# ************************************Tool***************************************
# dearch tool
search=TavilySearch(max_results=2)

# *****************************State*********************************************
class MultiAgent(TypedDict):
    research:str
    writer:str
    question:str
    final_answer:str

# ********************************Custom Function********************************
# first function
def create_research(state:MultiAgent):
    query=state['question']
    response=search.invoke(query)
    return {'research':response}

# second function
def create_writer(state:MultiAgent):
    research=state['research']
    # prompt for writting
    writer_prompt=f"""You are a helpful Agent.Based on the this research:{research}
write a detailed answer in clean and structured way.
"""
    response=llm.invoke(writer_prompt)
    return {'writer':response.content}

# third function
def create_reveiwer(state:MultiAgent):
    writer=state['writer']
    # prompt
    review_prompt=f"""improved the answer:{writer}
make it clear, structured and correct way and do not used special charectors,keep simple.
"""
    result=llm.invoke(review_prompt)
    return {'final_answer':result.content}

# *********************************Graph*****************************************
graph=StateGraph(MultiAgent)

# create a node
graph.add_node('research',create_research)
graph.add_node('writer',create_writer)
graph.add_node('reviewer',create_reveiwer)

# add edges
graph.add_edge(START,'research')
graph.add_edge('research','writer')
graph.add_edge('writer','reviewer')

agent=graph.compile()

# ================= API =================
class Query(BaseModel):
    question: str

@app.post("/ask")
def ask(q: Query):
    result = agent.invoke({'question': q.question})

    return {
        "research": result.get("research", ""),
        "writer": result.get("writer", ""),
        "final_answer": result.get("final_answer", "")
    }

# /*********************************query********************************************
intial_state={'question':'Generate a research on AI?'}
final=agent.invoke(intial_state)
# print(final['final_answer'])