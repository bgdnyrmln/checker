import axios from 'axios'

export default defineNuxtRouteMiddleware(async (to) => {
  let user = null
  let profiles = []

  // Fetch user
  try {
    user = await axios.get('/api/user', { withCredentials: true })
      .then(res => res.data)
  } catch {
      return navigateTo('/')
  }

  // Fetch profiles (CompanyUser list)
  try {
    profiles = await axios.get('/api/user/profiles', { withCredentials: true })
      .then(res => res.data)
  } catch {
      return navigateTo('/')
  }

  /**
   * ===============================
   * COMPANY ROUTES (company_id)
   * ===============================
   */
  const companyId = to.params.companyId?.toString()
  if (!companyId) return

  const companyProfile = profiles.find(
    p => p.pivot.company_id.toString() === companyId
  )

  if (!companyProfile) {
    return navigateTo('/')
  }

  const role = companyProfile.pivot.role

  // Role enforcement
  if (to.meta.requiresManager && role !== 'manager') {
    return navigateTo(`/${companyProfile.id}/personal-cabinet`)
  }

  if (to.meta.requiresEmployee && role !== 'employee') {
    return navigateTo(`/${companyProfile.id}/personal-cabinet`)
  }

  useState('activeCompany', () => companyProfile)
})
