import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const ACCESS_TOKEN_KEY = 'tq_access_token'
const REFRESH_TOKEN_KEY = 'tq_refresh_token'

export const tokenStorage = {
  getAccess: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  set: (access, refresh) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, access)
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
}

// No default Content-Type here: axios infers 'application/json' for plain
// object payloads on its own, and a hardcoded default would otherwise stop
// axios from setting the correct multipart boundary on FormData uploads.
const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((requestConfig) => {
  const access = tokenStorage.getAccess()
  if (access) {
    requestConfig.headers.Authorization = `Bearer ${access}`
  }
  return requestConfig
})

let refreshPromise = null

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error
    if (response?.status === 401 && !config._retried && tokenStorage.getRefresh()) {
      config._retried = true
      try {
        refreshPromise = refreshPromise || api.post('/auth/login/refresh/', {
          refresh: tokenStorage.getRefresh(),
        })
        const { data } = await refreshPromise
        tokenStorage.set(data.access, tokenStorage.getRefresh())
        config.headers.Authorization = `Bearer ${data.access}`
        return api(config)
      } catch (refreshError) {
        tokenStorage.clear()
        return Promise.reject(refreshError)
      } finally {
        refreshPromise = null
      }
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  registerEntrepreneur: (data) => api.post('/auth/register/entrepreneur/', data),
  registerEnterprise: (data) => api.post('/auth/register/enterprise/', data),
  login: (data) => api.post('/auth/login/', data),
  me: () => api.get('/auth/me/'),
}

// Admin API
export const adminAPI = {
  stats: () => api.get('/auth/admin/stats/'),
  listUsers: (params) => api.get('/auth/admin/users/', { params }),
  getUser: (id) => api.get(`/auth/admin/users/${id}/`),
  createUser: (data) => api.post('/auth/admin/users/', data),
  updateUser: (id, data) => api.patch(`/auth/admin/users/${id}/`, data),
  deleteUser: (id) => api.delete(`/auth/admin/users/${id}/`),
  approveUser: (id) => api.post(`/auth/admin/users/${id}/approve/`),
  suspendUser: (id) => api.post(`/auth/admin/users/${id}/suspend/`),
  activateUser: (id) => api.post(`/auth/admin/users/${id}/activate/`),
  setAdmin: (id, isAdmin) => api.post(`/auth/admin/users/${id}/set-admin/`, { is_admin: isAdmin }),
  resetPassword: (id, newPassword) => api.post(`/auth/admin/users/${id}/reset-password/`, { new_password: newPassword }),
  loginHistory: (id) => api.get(`/auth/admin/users/${id}/login-history/`),
  exportUsers: (params) => api.get('/auth/admin/users/export/', { params, responseType: 'blob' }),
  listMentorships: (params) => api.get('/auth/admin/mentorships/', { params }),
  createMentorship: (data) => api.post('/auth/admin/mentorships/', data),
  updateMentorship: (id, data) => api.patch(`/auth/admin/mentorships/${id}/`, data),
  deleteMentorship: (id) => api.delete(`/auth/admin/mentorships/${id}/`),
}

// Enterprise API
export const enterpriseAPI = {
  searchSuppliers: (params) => api.get('/auth/enterprise/suppliers/', { params }),
  listPrograms: () => api.get('/auth/enterprise/programs/'),
  createProgram: (data) => api.post('/auth/enterprise/programs/', data),
  updateProgram: (id, data) => api.patch(`/auth/enterprise/programs/${id}/`, data),
  deleteProgram: (id) => api.delete(`/auth/enterprise/programs/${id}/`),
  getApplicants: (id) => api.get(`/auth/enterprise/programs/${id}/applicants/`),
  respondToApplication: (id, statusValue) => api.patch(`/auth/enterprise/program-applications/${id}/`, { status: statusValue }),
}

// Entrepreneur API
export const entrepreneurAPI = {
  getProfile: () => api.get('/auth/entrepreneur/profile/'),
  updateProfile: (data) => api.patch('/auth/entrepreneur/profile/', data),
  listDocuments: () => api.get('/auth/entrepreneur/documents/'),
  uploadDocument: (name, file) => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('file', file)
    return api.post('/auth/entrepreneur/documents/', formData)
  },
  deleteDocument: (id) => api.delete(`/auth/entrepreneur/documents/${id}/`),
  listAvailablePrograms: () => api.get('/auth/entrepreneur/programs/'),
  applyToProgram: (id, message) => api.post(`/auth/entrepreneur/programs/${id}/apply/`, { message }),
  myApplications: () => api.get('/auth/entrepreneur/my-applications/'),
  myFeedback: () => api.get('/auth/entrepreneur/feedback/'),
}

// Mentor API
export const mentorAPI = {
  getAssignedEntrepreneurs: () => api.get('/auth/mentor/assigned-entrepreneurs/'),
  listFeedback: () => api.get('/auth/mentor/feedback/'),
  createFeedback: (data) => api.post('/auth/mentor/feedback/', data),
}

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
