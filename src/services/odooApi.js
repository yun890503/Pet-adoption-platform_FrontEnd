const DEFAULT_BASE = 'http://localhost:8069/warm_paws/api';

export const ODOO_API_BASE = import.meta.env.VITE_ODOO_API_BASE || DEFAULT_BASE;

async function request(path, options = {}) {
  const response = await fetch(`${ODOO_API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || `Odoo API error: ${response.status}`);
  }
  return data;
}

function query(params) {
  const search = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') search.set(key, value);
  });
  const value = search.toString();
  return value ? `?${value}` : '';
}

export const odooApi = {
  getAnimals(params) {
    return request(`/animals${query(params)}`);
  },
  getAnimal(id) {
    return request(`/animals/${id}`);
  },
  createAdoptionInquiry(payload) {
    return request('/adoption-inquiries', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  createVolunteerApplication(payload) {
    return request('/volunteer-applications', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  createContactMessage(payload) {
    return request('/contact-messages', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  register(payload) {
    return request('/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  login(payload) {
    return request('/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  toggleFavorite(memberId, animalId) {
    return request(`/members/${memberId}/favorites`, {
      method: 'POST',
      body: JSON.stringify({ animalId }),
    });
  },
  getFavorites(memberId) {
    return request(`/members/${memberId}/favorites`);
  },
};
