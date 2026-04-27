import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact/', data),
  list: () => api.get('/contact/'),
  get: (id) => api.get(`/contact/${id}/`),
}

// Services API
export const servicesAPI = {
  list: () => api.get('/services/'),
  get: (id) => api.get(`/services/${id}/`),
  byCategory: (category) => api.get('/services/by_category/', { params: { category } }),
}

// Case Studies API
export const caseStudiesAPI = {
  list: () => api.get('/case-studies/'),
  get: (id) => api.get(`/case-studies/${id}/`),
  featured: () => api.get('/case-studies/featured/'),
}

// Blog Posts API
export const blogAPI = {
  list: () => api.get('/blog-posts/'),
  get: (id) => api.get(`/blog-posts/${id}/`),
  featured: () => api.get('/blog-posts/featured/'),
}

// Resources API
export const resourcesAPI = {
  list: () => api.get('/resources/'),
  get: (id) => api.get(`/resources/${id}/`),
  byType: (type) => api.get('/resources/by_type/', { params: { type } }),
  download: (id) => api.post(`/resources/${id}/download/`),
}

// Team API
export const teamAPI = {
  list: () => api.get('/team-members/'),
  get: (id) => api.get(`/team-members/${id}/`),
}

// Testimonials API
export const testimonialsAPI = {
  list: () => api.get('/testimonials/'),
  get: (id) => api.get(`/testimonials/${id}/`),
}

export default api
