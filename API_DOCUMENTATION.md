# Seed of Africa API Documentation

## Base URL

```
http://localhost:8000/api
```

## Authentication

Currently, the API is open for read operations. POST requests (form submissions) are allowed without authentication.

For future implementation:
- Token-based authentication can be added using Django REST Framework TokenAuthentication
- JWT can be implemented for stateless authentication

## Endpoints

### Contact Messages

#### Submit Contact Form
```http
POST /api/contact/
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+27 11 XXX XXXX",
  "company": "ABC Corporation",
  "service_type": "enterprise",
  "message": "I'm interested in your ESD solutions."
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+27 11 XXX XXXX",
  "company": "ABC Corporation",
  "service_type": "enterprise",
  "message": "I'm interested in your ESD solutions.",
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Service Types:**
- `enterprise` - Enterprise Solutions
- `entrepreneur` - Entrepreneur Program
- `both` - Both Programs

#### List Contact Messages (Admin Only)
```http
GET /api/contact/
```

### Services

#### List All Services
```http
GET /api/services/
```

#### Filter Services by Category
```http
GET /api/services/by_category/?category=enterprise_esd
```

**Categories:**
- `enterprise_esd` - Enterprise ESD Strategy
- `enterprise_scouting` - Enterprise Supplier Scouting
- `enterprise_reporting` - Enterprise Impact Reporting
- `entrepreneur_incubation` - Entrepreneur Incubation
- `entrepreneur_mentorship` - Entrepreneur Mentorship
- `entrepreneur_masterclass` - Entrepreneur Masterclass

**Response:**
```json
[
  {
    "id": 1,
    "title": "Predictive Scorecard Optimization",
    "category": "enterprise_esd",
    "description": "Data-driven modelling to ensure your ESD spend achieves 100% absorption...",
    "short_description": "Optimize ESD spend with AI-powered analytics",
    "icon": "📊"
  }
]
```

### Case Studies

#### List All Case Studies
```http
GET /api/case-studies/
```

#### List Featured Case Studies
```http
GET /api/case-studies/featured/
```

**Response:**
```json
[
  {
    "id": 1,
    "company_name": "TechSupply Solutions",
    "challenge": "Manufacturing supplier struggling with legacy systems",
    "solution": "AI-powered operational excellence program",
    "result": "3x output capacity in 18 months",
    "roi": "+250% Revenue Growth",
    "image": "/media/case_studies/techsupply.jpg",
    "featured": true
  }
]
```

### Blog Posts

#### List All Published Blog Posts
```http
GET /api/blog-posts/
```

#### List Featured Blog Posts
```http
GET /api/blog-posts/featured/
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "How AI is Disrupting ESD in South Africa",
    "excerpt": "Exploring the transformation of supplier development...",
    "content": "Full blog post content here...",
    "author": "Seed of Africa Team",
    "created_at": "2024-01-10T09:00:00Z",
    "featured": true,
    "published": true
  }
]
```

### Resources

#### List All Resources
```http
GET /api/resources/
```

#### Filter Resources by Type
```http
GET /api/resources/by_type/?type=template
```

**Resource Types:**
- `template` - Business plan templates
- `guide` - Implementation guides
- `workbook` - Learner workbooks
- `spreadsheet` - Excel spreadsheets

#### Download Resource (Increment Counter)
```http
POST /api/resources/{id}/download/
```

**Response:**
```json
{
  "downloads": 42
}
```

### Team Members

#### List Team Members
```http
GET /api/team-members/
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Jane Smith",
    "title": "Founder & CEO",
    "bio": "15+ years in ESD and supply chain development...",
    "email": "jane@seedofafrica.co.za",
    "linkedin": "https://linkedin.com/in/jane-smith",
    "image": "/media/team/jane-smith.jpg"
  }
]
```

### Testimonials

#### List Testimonials
```http
GET /api/testimonials/
```

**Response:**
```json
[
  {
    "id": 1,
    "client_name": "Thabo Mkhize",
    "client_company": "TechSupply Solutions",
    "client_role": "Managing Director",
    "testimonial": "Working with Seed of Africa transformed our business...",
    "rating": 5,
    "image": "/media/testimonials/thabo-mkhize.jpg"
  }
]
```

## Pagination

List endpoints support pagination:
```http
GET /api/case-studies/?page=2
```

Default page size: 10 items

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request parameters"
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

## CORS Headers

The API includes CORS headers for cross-origin requests from the frontend.

**Allowed Origins:**
- `http://localhost:3000` (development)
- `http://127.0.0.1:3000` (development)

## Rate Limiting

No rate limiting is currently implemented. Consider adding for production.

## Versioning

API version: v1 (implicitly, no version prefix in URLs)

For future versioning, consider:
```
/api/v1/contact/
/api/v2/contact/
```

## Frontend Integration Example

```javascript
// Submit contact form
const submitContact = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Fetch case studies
const fetchCaseStudies = async () => {
  try {
    const response = await fetch(`${API_URL}/case-studies/`);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Admin Dashboard

Access the Django admin panel at:
```
http://localhost:8000/admin
```

Manage:
- Contact messages
- Services
- Case studies
- Blog posts
- Resources
- Team members
- Testimonials

## Future Enhancements

- [ ] User authentication and profiles
- [ ] Advanced search and filtering
- [ ] Analytics and reporting
- [ ] File upload for resources
- [ ] Email notifications
- [ ] API rate limiting
- [ ] WebSocket for real-time updates
- [ ] GraphQL alternative endpoint
