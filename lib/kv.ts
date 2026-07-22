import { Redis } from "@upstash/redis";

let _kv: Redis | null = null;

export function getKV(): Redis {
  if (_kv) return _kv;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN. Set these in your Vercel environment variables."
    );
  }

  _kv = new Redis({ url, token });
  return _kv;
}
