import express from "express";
import axios from "axios";

const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
    try {
        res.status(200).json({message:"hello success!"})
    } catch (error) {
        res.status(500).json({message:`Error : ${error}`})
    }
});

// POST endpoint to handle LangFlow JSON
app.post("/langflow", async (req, res) => {
    try {
      // Extract workflow JSON from the request body
      const workflowJson = req.body;
  
      // Step 1: Create a new workspace on LangFlow
      const langflowBaseUrl = "http://localhost:7860"; // Update with your LangFlow server URL
      const createWorkspaceResponse = await axios.post(`${langflowBaseUrl}/workspaces`, {
        name: "Imported Workflow",
      });
  
      const workspaceId = createWorkspaceResponse.data.id;
  
      // Step 2: Add components to the new workspace
      if (workflowJson.nodes) {
        for (const node of workflowJson.nodes) {
          await axios.post(`${langflowBaseUrl}/workspaces/${workspaceId}/components`, node);
        }
      }
  
      // Step 3: Add edges to connect the nodes
      if (workflowJson.edges) {
        for (const edge of workflowJson.edges) {
          await axios.post(`${langflowBaseUrl}/workspaces/${workspaceId}/edges`, edge);
        }
      }
  
      // Respond back to the client with success and workspace ID
      res.status(200).json({
        message: "Workflow created successfully in LangFlow!",
        workspaceId,
      });
    } catch (error:any) {
      console.error("Error creating workflow in LangFlow:", error.message);
      res.status(500).json({
        message: `Failed to create workflow in LangFlow: ${error.message}`,
      });
    }
  });

app.listen(3000,()=>{
    console.log("Server is running on port 3000!");
});


