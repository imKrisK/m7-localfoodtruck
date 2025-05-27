import * as ReviewModel from '../models/reviewModel.js';

export async function getAllReviews(req, res) {
  const reviews = await ReviewModel.getAllReviews();
  res.json(reviews);
}

export async function getReviewById(req, res) {
  try {
    const review = await ReviewModel.getReviewById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
}

export async function createReview(req, res) {
  const review = await ReviewModel.createReview(req.body);
  res.status(201).json(review);
}

export async function updateReview(req, res) {
  try {
    const updated = await ReviewModel.updateReview(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Review not found' });
    res.json(updated);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
}

export async function deleteReview(req, res) {
  try {
    const deleted = await ReviewModel.deleteReview(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Review not found' });
    res.json(deleted);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
}
