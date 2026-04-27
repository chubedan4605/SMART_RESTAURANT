const MENU_CACHE_VERSION_KEY = "menu:version";

// TTL cache cho các endpoint menu công khai (giá trị có thể set qua .env)
const MENU_PUBLIC_TTL_SECONDS =
  Number(process.env.REDIS_MENU_PUBLIC_TTL) || 300;
const MENU_GUEST_TTL_SECONDS = Number(process.env.REDIS_MENU_GUEST_TTL) || 300;
const MENU_TOPCHEF_TTL_SECONDS =
  Number(process.env.REDIS_MENU_TOPCHEF_TTL) || 300;


module.exports = {
  MENU_CACHE_VERSION_KEY,
  MENU_PUBLIC_TTL_SECONDS,
  MENU_GUEST_TTL_SECONDS,
  MENU_TOPCHEF_TTL_SECONDS,
};