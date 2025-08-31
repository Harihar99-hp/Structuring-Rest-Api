const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory storage
let items = [];

// GET /api/items → return all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// POST /api/items → add a new item
app.post("/api/items", (req, res) => {
  const item = req.body;

  // Ensure each item has an id
  if (!item.id) {
    return res.status(400).json({ error: "Item must have an id" });
  }

  // Prevent duplicate IDs
  if (items.find((i) => i.id === item.id)) {
    return res.status(400).json({ error: "Item with this ID already exists" });
  }

  items.push(item);
  res.status(201).json(item);
});

// PUT /api/items/:id → update an existing item
app.put("/api/items/:id", (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;

  const index = items.findIndex((i) => i.id == id);
  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  items[index] = { ...items[index], ...updatedItem };
  res.json(items[index]);
});

// DELETE /api/items/:id → delete an item
app.delete("/api/items/:id", (req, res) => {
  const { id } = req.params;
  const index = items.findIndex((i) => i.id == id);

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  items.splice(index, 1);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
