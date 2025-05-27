import * as FavoriteModel from '../models/favoriteModel.js';

export async function getAllFavorites(req, res) {
  const favorites = await FavoriteModel.getAllFavorites();
  res.json(favorites);
}

export async function getFavoriteById(req, res) {
  try {
    const favorite = await FavoriteModel.getFavoriteById(req.params.id);
    if (!favorite) return res.status(404).json({ error: 'Favorite not found' });
    res.json(favorite);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
}

export async function createFavorite(req, res) {
  const favorite = await FavoriteModel.createFavorite(req.body);
  res.status(201).json(favorite);
}

export async function deleteFavorite(req, res) {
  try {
    const deleted = await FavoriteModel.deleteFavorite(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Favorite not found' });
    res.json(deleted);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
}
