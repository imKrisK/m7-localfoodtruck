import * as UserModel from '../models/userModel.js';

export async function getAllUsers(req, res) {
  const users = await UserModel.getAllUsers();
  res.json(users);
}

export async function getUserById(req, res) {
  try {
    const user = await UserModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
}

export async function getUserByEmail(req, res) {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const user = await UserModel.getUserByEmail(email);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}

export async function createUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  const existing = await UserModel.getUserByEmail(email);
  if (existing) return res.status(409).json({ error: 'Email already registered' });
  const newUser = await UserModel.createUser({ name, email, password });
  res.status(201).json(newUser);
}

export async function updateUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const updated = await UserModel.updateUser(req.params.id, { name, email, password });
    if (updated === null) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(400).json({ error: 'Invalid ID' });
  }
}

export async function deleteUser(req, res) {
  try {
    const deleted = await UserModel.deleteUser(req.params.id);
    if (deleted === null) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deleted);
  } catch (err) {
    console.error('Delete error:', err);
    res.status(400).json({ error: 'Invalid ID' });
  }
}
