const keys = {
  favorites: 'warm-paws:favorites',
  applications: 'warm-paws:applications',
  user: 'warm-paws:user',
};

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFavorites() {
  return read(keys.favorites, []);
}

export function toggleFavorite(id) {
  const favorites = getFavorites();
  const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
  write(keys.favorites, next);
  return next;
}

export function saveApplication(application) {
  const applications = read(keys.applications, []);
  const next = [{ id: Date.now(), createdAt: new Date().toISOString(), ...application }, ...applications];
  write(keys.applications, next);
  return next;
}

export function getApplications() {
  return read(keys.applications, []);
}

export function saveUser(user) {
  write(keys.user, user);
}

export function getUser() {
  return read(keys.user, null);
}
