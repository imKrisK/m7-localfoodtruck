import express from 'express';
import * as reviewsController from '../controllers/reviewsController.js';

const router = express.Router();

router.get('/', reviewsController.getAllReviews);
router.get('/:id', reviewsController.getReviewById);
router.post('/', reviewsController.createReview);
router.put('/:id', reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

export default router;
