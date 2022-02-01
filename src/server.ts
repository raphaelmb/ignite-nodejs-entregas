import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Testing" });
});

app.listen(3000, () => console.log("Server is running on port 3000."));
