import { useEffect, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { adminAPI } from '../../api/client'
import AdminLayout from '../../components/admin/AdminLayout'
import '../../styles/Admin.css'
import '../../styles/Auth.css'

const CREATE_INITIAL = {
  role: 'entrepreneur',
  email: '',
  password: '',
  phone_number: '',
  full_name: '',
  country: '',
  business_name: '',
  industry: '',
  company_name: '',
  contact_person: '',
  company_size: '',
  expertise: '',
}

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [createOpen, setCreateOpen] = useState(false)
  const [createData, setCreateData] = useState(CREATE_INITIAL)
  const [createError, setCreateError] = useState('')

  const [resetTarget, setResetTarget] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [resetError, setResetError] = useState('')

  const [historyTarget, setHistoryTarget] = useState(null)
  const [history, setHistory] = useState([])

  const pageSize = 20
  const totalPages = Math.max(1, Math.ceil(count / pageSize))

  const loadUsers = () => {
    setLoading(true)
    setError('')
    const params = { page }
    if (search) params.search = search
    if (roleFilter) params.role = roleFilter
    if (statusFilter === 'active') params.is_active = true
    if (statusFilter === 'inactive') params.is_active = false
    if (statusFilter === 'pending') params.is_approved = false

    adminAPI.listUsers(params)
      .then(({ data }) => {
        setUsers(data.results)
        setCount(data.count)
      })
      .catch(() => setError('Could not load users.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, roleFilter, statusFilter])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    loadUsers()
  }

  const runAction = async (action) => {
    try {
      await action()
      loadUsers()
    } catch {
      setError('Action failed.')
    }
  }

  const handleApprove = (user) => runAction(() => adminAPI.approveUser(user.id))
  const handleSuspend = (user) => runAction(() => adminAPI.suspendUser(user.id))
  const handleActivate = (user) => runAction(() => adminAPI.activateUser(user.id))
  const handleSetAdmin = (user, isAdmin) => runAction(() => adminAPI.setAdmin(user.id, isAdmin))

  const handleDelete = (user) => {
    if (window.confirm(`Delete ${user.email}? This cannot be undone.`)) {
      runAction(() => adminAPI.deleteUser(user.id))
    }
  }

  const handleExport = async () => {
    const params = {}
    if (search) params.search = search
    if (roleFilter) params.role = roleFilter
    const { data } = await adminAPI.exportUsers(params)
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.download = 'users.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }

  const handleCreateChange = (e) => {
    const { name, value } = e.target
    setCreateData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    setCreateError('')
    try {
      await adminAPI.createUser(createData)
      setCreateOpen(false)
      setCreateData(CREATE_INITIAL)
      loadUsers()
    } catch (err) {
      const detail = err.response?.data
      setCreateError(
        typeof detail === 'object' ? Object.values(detail).flat().join(' ') : 'Could not create user.'
      )
    }
  }

  const openResetModal = (user) => {
    setResetTarget(user)
    setNewPassword('')
    setResetError('')
  }

  const handleResetSubmit = async (e) => {
    e.preventDefault()
    setResetError('')
    try {
      await adminAPI.resetPassword(resetTarget.id, newPassword)
      setResetTarget(null)
    } catch (err) {
      const detail = err.response?.data
      setResetError(
        typeof detail === 'object' ? Object.values(detail).flat().join(' ') : 'Could not reset password.'
      )
    }
  }

  const openHistoryModal = async (user) => {
    setHistoryTarget(user)
    const { data } = await adminAPI.loginHistory(user.id)
    setHistory(data)
  }

  return (
    <AdminLayout>
      <h1>User Management</h1>

      {error && <div className="error-message">{error}</div>}

      <form className="admin-toolbar" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setPage(1) }}>
          <option value="">All Roles</option>
          <option value="entrepreneur">Entrepreneur</option>
          <option value="enterprise">Enterprise</option>
          <option value="mentor">Mentor</option>
          <option value="super_admin">Super Admin</option>
        </select>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}>
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Suspended</option>
          <option value="pending">Pending Approval</option>
        </select>
        <button type="submit" className="btn btn-primary">Search</button>
        <div className="spacer" />
        <button type="button" className="btn btn-outline" onClick={handleExport}>Export CSV</button>
        <button type="button" className="btn btn-primary" onClick={() => setCreateOpen(true)}>Create User</button>
      </form>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan="6">Loading...</td></tr>
            )}
            {!loading && users.length === 0 && (
              <tr><td colSpan="6">No users found.</td></tr>
            )}
            {!loading && users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {!user.is_approved && <span className="admin-badge pending">Pending</span>}
                  {user.is_approved && user.is_active && <span className="admin-badge active">Active</span>}
                  {user.is_approved && !user.is_active && <span className="admin-badge inactive">Suspended</span>}
                </td>
                <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                <td>{user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}</td>
                <td>
                  <div className="admin-row-actions">
                    {!user.is_approved && (
                      <button onClick={() => handleApprove(user)}>Approve</button>
                    )}
                    {user.is_active ? (
                      <button onClick={() => handleSuspend(user)}>Suspend</button>
                    ) : (
                      <button onClick={() => handleActivate(user)}>Activate</button>
                    )}
                    {user.role === 'super_admin' ? (
                      <button onClick={() => handleSetAdmin(user, false)}>Remove Admin</button>
                    ) : (
                      <button onClick={() => handleSetAdmin(user, true)}>Make Admin</button>
                    )}
                    <button onClick={() => openResetModal(user)}>Reset Password</button>
                    <button onClick={() => openHistoryModal(user)}>Login History</button>
                    <button className="danger" onClick={() => handleDelete(user)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-pagination">
        <button className="btn btn-outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button className="btn btn-outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>

      {createOpen && (
        <div className="admin-modal-overlay" onClick={() => setCreateOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create User</h2>
            <form onSubmit={handleCreateSubmit}>
              {createError && <div className="error-message">{createError}</div>}

              <div className="form-group">
                <label htmlFor="role">Account Type *</label>
                <select id="role" name="role" value={createData.role} onChange={handleCreateChange}>
                  <option value="entrepreneur">Entrepreneur</option>
                  <option value="enterprise">Enterprise</option>
                  <option value="mentor">Mentor</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" value={createData.email} onChange={handleCreateChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input type="password" id="password" name="password" value={createData.password} onChange={handleCreateChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <input type="tel" id="phone_number" name="phone_number" value={createData.phone_number} onChange={handleCreateChange} />
              </div>

              {createData.role === 'entrepreneur' && (
                <>
                  <div className="form-group">
                    <label htmlFor="full_name">Full Name *</label>
                    <input type="text" id="full_name" name="full_name" value={createData.full_name} onChange={handleCreateChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country *</label>
                    <input type="text" id="country" name="country" value={createData.country} onChange={handleCreateChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="business_name">Business Name *</label>
                    <input type="text" id="business_name" name="business_name" value={createData.business_name} onChange={handleCreateChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="industry">Industry *</label>
                    <input type="text" id="industry" name="industry" value={createData.industry} onChange={handleCreateChange} required />
                  </div>
                </>
              )}

              {createData.role === 'enterprise' && (
                <>
                  <div className="form-group">
                    <label htmlFor="company_name">Company Name *</label>
                    <input type="text" id="company_name" name="company_name" value={createData.company_name} onChange={handleCreateChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact_person">Contact Person *</label>
                    <input type="text" id="contact_person" name="contact_person" value={createData.contact_person} onChange={handleCreateChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="industry">Industry *</label>
                    <input type="text" id="industry" name="industry" value={createData.industry} onChange={handleCreateChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company_size">Company Size *</label>
                    <input type="text" id="company_size" name="company_size" value={createData.company_size} onChange={handleCreateChange} required />
                  </div>
                </>
              )}

              {createData.role === 'mentor' && (
                <>
                  <div className="form-group">
                    <label htmlFor="full_name">Full Name *</label>
                    <input type="text" id="full_name" name="full_name" value={createData.full_name} onChange={handleCreateChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expertise">Area of Expertise</label>
                    <input type="text" id="expertise" name="expertise" value={createData.expertise} onChange={handleCreateChange} placeholder="e.g. Financial Strategy, Marketing" />
                  </div>
                </>
              )}

              <div className="admin-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setCreateOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {resetTarget && (
        <div className="admin-modal-overlay" onClick={() => setResetTarget(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Reset Password</h2>
            <p>{resetTarget.email}</p>
            <form onSubmit={handleResetSubmit}>
              {resetError && <div className="error-message">{resetError}</div>}
              <div className="form-group">
                <label htmlFor="new_password">New Password *</label>
                <div className="password-input">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="new_password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowNewPassword((prev) => !prev)} aria-label={showNewPassword ? 'Hide password' : 'Show password'}>
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <div className="admin-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setResetTarget(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Reset Password</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {historyTarget && (
        <div className="admin-modal-overlay" onClick={() => setHistoryTarget(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Login History</h2>
            <p>{historyTarget.email}</p>
            {history.length === 0 && <p>No login history yet.</p>}
            {history.map((entry) => (
              <div className="admin-activity-item" key={entry.id}>
                {new Date(entry.timestamp).toLocaleString()}
                {entry.ip_address && <time>{entry.ip_address}</time>}
              </div>
            ))}
            <div className="admin-modal-actions">
              <button type="button" className="btn btn-outline" onClick={() => setHistoryTarget(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
