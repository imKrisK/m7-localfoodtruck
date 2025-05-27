import express from 'express';
import * as favoritesController from '../controllers/favoritesController.js';

const router = express.Router();

router.get('/', favoritesController.getAllFavorites);
router.get('/:id', favoritesController.getFavoriteById);
router.post('/', favoritesController.createFavorite);
router.delete('/:id', favoritesController.deleteFavorite);

export default router;
