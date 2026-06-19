const LOCAL_BASE = 'http://localhost:8069/warm_paws/api';
const ZEABUR_BASE = 'https://heartwarming.zeabur.app/warm_paws/api';

const DEFAULT_BASE =
  typeof window !== 'undefined' && window.location.hostname.endsWith('zeabur.app')
    ? ZEABUR_BASE
    : LOCAL_BASE;

export const ODOO_API_BASE = import.meta.env.VITE_ODOO_API_BASE || DEFAULT_BASE;

function authHeader() {
  try {
    const user = JSON.parse(localStorage.getItem('warm-paws:user') || 'null');
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  } catch {
    return {};
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${ODOO_API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
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
  createAdoptionApplication(payload) {
    return request('/adoption-applications', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  getMyAdoptionApplications() {
    return request('/me/adoption-applications');
  },
  getMyAdoptionRecords() {
    return request('/me/adoption-records');
  },
  createVisitAppointment(payload) {
    return request('/visit-appointments', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  cancelVisitAppointment(id) {
    return request(`/visit-appointments/${id}/cancel`, {
      method: 'POST',
    });
  },
  getMyVisitAppointments() {
    return request('/me/visit-appointments');
  },
  createVolunteerApplication(payload) {
    return request('/volunteer-applications', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  getVolunteerTestimonials(params) {
    return request(`/volunteer-testimonials${query(params)}`);
  },
  createVolunteerTestimonial(payload) {
    return request('/volunteer-testimonials', {
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
  lineLogin(payload) {
    return request('/line-login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  getMe() {
    return request('/me');
  },
  updateMe(payload) {
    return request('/me', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  getMyFavorites() {
    return request('/me/favorites');
  },
  toggleMyFavorite(animalId) {
    return request('/me/favorites', {
      method: 'POST',
      body: JSON.stringify({ animalId }),
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
