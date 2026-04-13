from multiagent import agent
import streamlit as st

# title for website
st.title("🪬 Multi Agent System")
# users input
user_input=st.text_input("Type Here")
#  button
if st.button("Run"):
    # result
    response=agent.invoke({'question':user_input})
    st.write(response['final_answer'])