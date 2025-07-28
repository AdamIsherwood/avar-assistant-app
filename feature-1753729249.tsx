```python
import streamlit as st
import pandas as pd
import plotly.express as px

def plot_chart(df, chart_type):
    if chart_type == "Bar Chart":
        fig = px.bar(df, x="Year", y="Life expectancy", color="Country")
    elif chart_type == "Line Chart":
        fig = px.line(df, x="Year", y="Life expectancy", color="Country")
    elif chart_type == "Scatter Plot":
        fig = px.scatter(df, x="Year", y="Life expectancy", color="Country")
    else:  # Default to bar chart
        fig = px.bar(df, x="Year", y="Life expectancy", color="Country")

    st.plotly_chart(fig, use_full_width=True)

df = pd.read_csv("life_expectancy_data.csv")

st.title("Life Expectancy Data Visualization")

selected_countries = st.multiselect("Select Countries", df["Country"].unique())

if selected_countries:
    filtered_df = df[df["Country"].isin(selected_countries)]
else:  # Show all countries if none are selected
    filtered_df = df


chart_type = st.selectbox("Select Chart Type", ["Bar Chart", "Line Chart", "Scatter Plot"])

plot_chart(filtered_df, chart_type)


```
