import * as UserModel from '../models/userModel.js';
import Joi from 'joi';
import bcrypt from 'bcrypt';

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  avatar: Joi.string().allow('').optional() // allow avatar as base64 or URL
});

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
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, email, password, avatar } = req.body;
  const existing = await UserModel.getUserByEmail(email);
  if (existing) return res.status(409).json({ error: 'Email already registered' });
  const newUser = await UserModel.createUser({ name, email, password, avatar });
  res.status(201).json(newUser);
}

export async function updateUser(req, res) {
  const { error } = userSchema.validate({
    ...req.body,
    // Only validate password if provided, otherwise use a dummy valid password
    password: req.body.password && req.body.password.trim() !== '' ? req.body.password : 'dummyPassword123'
  });
  if (error && !(req.body.password === undefined || req.body.password === '')) return res.status(400).json({ error: error.details[0].message });

  try {
    const { name, email, password, avatar } = req.body;
    // Only update password if provided and not blank
    const updateData = { name, email, avatar };
    if (password && password.trim() !== '') {
      updateData.password = password;
    }
    const updated = await UserModel.updateUser(req.params.id, updateData);
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

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  const user = await UserModel.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  // Optionally, exclude password from response
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
}
