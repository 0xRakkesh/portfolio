import { getRedisClient } from './redis.js';

const REVIEWS_KEY = 'portfolio:reviews';

function readStoredReviews(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

function normalizeReview(review) {
  return {
    id: review.id || crypto.randomUUID(),
    username: review.username,
    occupation: review.occupation,
    review: review.review,
    createdAt: review.createdAt || new Date().toISOString(),
  };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  const redis = getRedisClient();

  try {
    if (req.method === 'GET') {
      const value = await redis.get(REVIEWS_KEY);
      const reviews = readStoredReviews(value);
      return res.status(200).json({ reviews });
    }

    if (req.method === 'POST') {
      const { username, occupation, review } = req.body || {};

      if (!username || !occupation || !review) {
        return res.status(400).json({ error: 'Username, occupation, and review are required.' });
      }

      const nextReview = normalizeReview({ username, occupation, review });
      const value = await redis.get(REVIEWS_KEY);
      const existingReviews = readStoredReviews(value);
      const reviews = [nextReview, ...existingReviews].slice(0, 30);

      await redis.set(REVIEWS_KEY, JSON.stringify(reviews));

      return res.status(200).json({ review: nextReview });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    return res.status(500).json({ error: 'Reviews endpoint failed' });
  }
}