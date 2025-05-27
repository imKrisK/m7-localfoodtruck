import * as ItemModel from '../models/itemModel.js';

export async function getAllItems(req, res) {
  const items = await ItemModel.getAllItems();
  res.json(items);
}

export async function getItemById(req, res) {
  try {
    const item = await ItemModel.getItemById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
}

export async function createItem(req, res) {
  const { name, price, description, image } = req.body;
  const newItem = await ItemModel.createItem({ name, price, description, image });
  res.status(201).json(newItem);
}

export async function updateItem(req, res) {
  try {
    const { name, price, description, image } = req.body;
    const updated = await ItemModel.updateItem(req.params.id, { name, price, description, image });
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    res.json(updated);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
}

export async function deleteItem(req, res) {
  try {
    const deleted = await ItemModel.deleteItem(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    res.json(deleted);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
}
