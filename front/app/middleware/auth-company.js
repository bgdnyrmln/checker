import axios from 'axios'

export default defineNuxtRouteMiddleware(async (to) => {
  let user = null
  let profiles = []

  try {
    const res = await axios.get('/api/user/profiles', {
      withCredentials: true
    })

    user = res.data.user
    profiles = res.data.profiles || []

  } catch (e) {
    return navigateTo('/')
  }

  if (!user) {
    return navigateTo('/')
  }

  /**
   * ===============================
   * COMPANY ROUTES (company_id)
   * ===============================
   */
  const companyId = to.params.companyId?.toString()
  if (!companyId) return

  // 🔥 FIXED: no more pivot
  const companyProfile = profiles.find(
    p => p.company_id.toString() === companyId
  )

  if (!companyProfile) {
    return navigateTo('/')
  }

  const role = companyProfile.role

  // Role enforcement
  if (to.meta.requiresManager && role !== 'manager') {
    return navigateTo(`/${companyProfile.id}/personal-cabinet`)
  }

  if (to.meta.requiresEmployee && role !== 'employee') {
    return navigateTo(`/${companyProfile.id}/personal-cabinet`)
  }

  useState('activeCompany', () => companyProfile)
})
