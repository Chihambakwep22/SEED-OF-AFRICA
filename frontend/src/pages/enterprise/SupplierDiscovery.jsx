import { useEffect, useState } from 'react'
import { enterpriseAPI } from '../../api/client'
import EnterpriseLayout from '../../components/enterprise/EnterpriseLayout'
import '../../styles/Admin.css'
import '../../styles/Enterprise.css'

const INITIAL_FILTERS = {
  industry: '',
  location: '',
  business_stage: '',
  business_size: '',
  certifications: '',
  min_score: '',
}

export default function SupplierDiscovery() {
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [suppliers, setSuppliers] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const pageSize = 20
  const totalPages = Math.max(1, Math.ceil(count / pageSize))

  const loadSuppliers = () => {
    setLoading(true)
    setError('')
    const params = { page }
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params[key] = value
    })

    enterpriseAPI.searchSuppliers(params)
      .then(({ data }) => {
        setSuppliers(data.results)
        setCount(data.count)
      })
      .catch(() => setError('Could not load suppliers.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadSuppliers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    loadSuppliers()
  }

  return (
    <EnterpriseLayout>
      <h1>Supplier Discovery</h1>

      {error && <div className="error-message">{error}</div>}

      <form className="admin-toolbar supplier-filters" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={filters.industry}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <select name="business_stage" value={filters.business_stage} onChange={handleFilterChange}>
          <option value="">All Stages</option>
          <option value="idea">Idea</option>
          <option value="startup">Startup</option>
          <option value="growth">Growth</option>
          <option value="established">Established</option>
        </select>
        <input
          type="text"
          name="business_size"
          placeholder="Business Size"
          value={filters.business_size}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="certifications"
          placeholder="Certification"
          value={filters.certifications}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="min_score"
          placeholder="Min Score"
          min="0"
          max="100"
          value={filters.min_score}
          onChange={handleFilterChange}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {!loading && suppliers.length === 0 && <p>No suppliers match these filters.</p>}

      <div className="supplier-grid">
        {suppliers.map((supplier) => (
          <div className="supplier-card" key={supplier.id}>
            <div className="supplier-card-header">
              <h3>{supplier.business_name}</h3>
              <span className="admin-badge active">{supplier.performance_score}</span>
            </div>
            <p className="supplier-card-name">{supplier.full_name}</p>
            <p><strong>Industry:</strong> {supplier.industry}</p>
            <p><strong>Location:</strong> {supplier.location || supplier.country}</p>
            {supplier.business_stage && (
              <p><strong>Stage:</strong> {supplier.business_stage}</p>
            )}
            {supplier.business_size && (
              <p><strong>Size:</strong> {supplier.business_size}</p>
            )}
            {supplier.certifications && (
              <p><strong>Certifications:</strong> {supplier.certifications}</p>
            )}
            <a className="btn btn-outline" href={`mailto:${supplier.email}`}>Contact via Email</a>
          </div>
        ))}
      </div>

      <div className="admin-pagination">
        <button className="btn btn-outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button className="btn btn-outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </EnterpriseLayout>
  )
}
