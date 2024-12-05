

## 🚀 Getting Started

To get started with this project, you will need to install dependencies and run the project . 

### Install Dependencies

```npm i```

### Run Server

```npm run dev```

### Install LangFlow Locally

```python -m pip install langflow```

### Run Langflow

```python -m langflow run```

### CURL CMD

```
curl -X POST http://localhost:3000/langflow \
-H "Content-Type: application/json" \
-d '{
      "nodes": [
        { "id": "1", "type": "input", "config": { "prompt": "What can I do for you?" } },
        { "id": "2", "type": "llm", "config": { "model": "gpt-3.5-turbo" } }
      ],
      "edges": [
        { "source": "1", "target": "2" }
      ]
    }'

```