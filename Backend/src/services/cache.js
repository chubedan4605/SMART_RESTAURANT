const crypto = require("crypto");
const { getRedisClient, isRedisReady } = require("../config/redis");

function encodeOrHash(s) {
  if (!s) return "";
  const str = String(s);
  if (str.length <= 64) return encodeURIComponent(str);
  return crypto.createHash("sha1").update(str).digest("hex");
}

function buildKey(parts = []) {
  return parts.map((p) => String(p)).join("|");
}

async function getJson(key) {
  const client = getRedisClient();
  if (!client || !isRedisReady()) return null;
  try {
    const raw = await client.get(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Redis get cache failed:", err.message);
    return null;
  }
}

async function setJson(key, ttlInSeconds, value) {
  const client = getRedisClient();
  if (!client || !isRedisReady()) return;
  try {
    await client.setEx(key, ttlInSeconds, JSON.stringify(value));
  } catch (err) {
    console.warn("Redis set cache failed:", err.message);
  }
}

async function getVersion(versionKey = "menu:version") {
  const client = getRedisClient();
  if (!client || !isRedisReady()) return "0";
  try {
    let version = await client.get(versionKey);
    if (!version) {
      version = "1";
      await client.set(versionKey, version);
    }
    return String(version);
  } catch (err) {
    console.warn("Redis getVersion failed:", err.message);
    return "0";
  }
}

async function bumpVersion(versionKey = "menu:version") {
  const client = getRedisClient();
  if (!client || !isRedisReady()) return;
  try {
    await client.incr(versionKey);
  } catch (err) {
    console.warn("Redis bumpVersion failed:", err.message);
  }
}

module.exports = {
  encodeOrHash,
  buildKey,
  getJson,
  setJson,
  getVersion,
  bumpVersion,
};
