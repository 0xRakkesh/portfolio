import { Redis } from '@upstash/redis';

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let redisClient = null;

export function getRedisClient() {
  if (redisClient) {
    return redisClient;
  }

  if (!redisUrl || !redisToken) {
    throw new Error('Missing Upstash Redis environment variables');
  }

  redisClient = new Redis({
    url: redisUrl,
    token: redisToken,
  });

  return redisClient;
}