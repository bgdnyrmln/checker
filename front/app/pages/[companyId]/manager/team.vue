<template>
  <div class="page-wrapper flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 pl-[22rem] min-h-screen relative overflow-hidden">
      <!-- Ambient blobs -->
      <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>
      <div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none"></div>

      <div class="relative z-10 max-w-[120rem] mx-auto py-[4rem] px-[4rem]">

        <!-- Page header -->
        <div class="mb-[4rem]">
          <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]">Manager Panel</p>
          <h1 class="page-title text-[3.6rem] leading-none tracking-wide">Company Team</h1>
        </div>

        <!-- Error -->
        <div v-if="error" class="error-pill flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] mb-[2.4rem] text-[1.3rem]">
          <svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
          </svg>
          {{ error }}
        </div>

        <!-- Table card -->
        <div class="table-card rounded-[1.6rem] overflow-hidden">

          <!-- Table toolbar -->
          <div class="table-summary flex items-center justify-between px-[3rem] py-[2rem] gap-[2rem] flex-wrap">
            <div>
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Members</p>
              <p class="table-text text-[1.4rem]">
                <span v-if="loading">Loading…</span>
                <span v-else>{{ filteredEmployees.length }} {{ filteredEmployees.length === 1 ? 'employee' : 'employees' }}</span>
              </p>
            </div>

            <!-- Search -->
            <div class="search-wrapper relative flex-1 max-w-[32rem]">
              <div class="search-icon absolute left-[1.2rem] top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"/>
                </svg>
              </div>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search by name or email…"
                class="search-input w-full pl-[3.8rem] pr-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200"
              />
            </div>
          </div>

          <!-- Loading skeleton -->
          <div v-if="loading" class="px-[3rem] py-[4rem] flex flex-col gap-[1.6rem]">
            <div v-for="i in 4" :key="i" class="skeleton-row rounded-[0.8rem] h-[4.8rem]"></div>
          </div>

          <!-- Table -->
          <table v-else class="w-full">
            <thead>
              <tr class="table-head-row">
                <th
                  @click="sortBy('name')"
                  class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none"
                >
                  <span class="flex items-center gap-[0.6rem]">
                    Name
                    <sort-icon :active="sortKey === 'name'" :dir="sortDirection" />
                  </span>
                </th>
                <th
                  @click="sortBy('email')"
                  class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none"
                >
                  <span class="flex items-center gap-[0.6rem]">
                    Email
                    <sort-icon :active="sortKey === 'email'" :dir="sortDirection" />
                  </span>
                </th>
                <th
                  @click="sortBy('role')"
                  class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none"
                >
                  <span class="flex items-center gap-[0.6rem]">
                    Role
                    <sort-icon :active="sortKey === 'role'" :dir="sortDirection" />
                  </span>
                </th>
                <th
                  @click="sortBy('hourly_pay')"
                  class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none"
                >
                  <span class="flex items-center gap-[0.6rem]">
                    Hourly Pay
                    <sort-icon :active="sortKey === 'hourly_pay'" :dir="sortDirection" />
                  </span>
                </th>
                <th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(employee, i) in filteredEmployees"
                :key="employee.id"
                class="table-row"
                :class="i % 2 === 0 ? 'row-even' : 'row-odd'"
              >
                <!-- NAME -->
                <td class="px-[3rem] py-[1.6rem]">
                  <div class="flex items-center gap-[1.2rem]">
                    <div class="emp-avatar w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center text-[1.1rem] text-white flex-shrink-0">
                      {{ employee.first_name?.[0]?.toUpperCase() }}
                    </div>
                    <span class="table-text text-[1.3rem]">{{ employee.first_name }} {{ employee.last_name }}</span>
                  </div>
                </td>

                <!-- EMAIL -->
                <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]">{{ employee.email }}</td>

                <!-- ROLE -->
                <td class="px-[3rem] py-[1.6rem]">
                  <div v-if="editingId === employee.id">
                    <select v-model="editForm.role" class="field-select rounded-[0.6rem] px-[1rem] py-[0.6rem] text-[1.2rem] outline-none">
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                  <span v-else>
                    <span class="role-badge text-[1.1rem] px-[1rem] py-[0.3rem] rounded-full capitalize" :class="employee.role === 'manager' ? 'badge-manager' : 'badge-employee'">
                      {{ employee.role }}
                    </span>
                  </span>
                </td>

                <!-- HOURLY PAY -->
                <td class="px-[3rem] py-[1.6rem]">
                  <div v-if="editingId === employee.id">
                    <input
                      v-model="editForm.hourly_pay"
                      type="number"
                      step="0.01"
                      class="field-input rounded-[0.6rem] px-[1rem] py-[0.6rem] text-[1.2rem] w-[9rem] outline-none tabular-nums"
                    />
                  </div>
                  <span v-else class="table-text text-[1.3rem] tabular-nums">${{ employee.hourly_pay }}</span>
                </td>

                <!-- ACTIONS -->
                <td class="px-[3rem] py-[1.6rem]">
                  <div class="flex items-center justify-end gap-[0.8rem]">
                    <!-- View mode -->
                    <template v-if="editingId !== employee.id">
                      <button @click="startEdit(employee)" class="action-btn edit-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-150">
                        <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"/>
                        </svg>
                        Edit
                      </button>
                      <button @click="deleteEmployee(employee)" class="action-btn delete-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-150">
                        <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                        </svg>
                        Delete
                      </button>
                    </template>

                    <!-- Edit mode -->
                    <template v-else>
                      <button @click="confirmEdit(employee)" class="action-btn confirm-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-150">
                        <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                        </svg>
                        Confirm
                      </button>
                      <button @click="cancelEdit" class="action-btn cancel-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-150">
                        <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                        Cancel
                      </button>
                    </template>
                  </div>
                </td>
              </tr>

              <!-- Empty state -->
              <tr v-if="!filteredEmployees.length">
                <td colspan="5" class="px-[3rem] py-[5rem] text-center">
                  <div class="flex flex-col items-center gap-[1.2rem]">
                    <div class="icon-badge w-[4.8rem] h-[4.8rem] rounded-[1.2rem] flex items-center justify-center mx-auto">
                      <svg class="w-[2rem] h-[2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
                      </svg>
                    </div>
                    <p class="table-sub text-[1.3rem]">No employees found.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

definePageMeta({
  middleware: 'auth-company',
  requiresManager: true
})

const route = useRoute()
const companyId = route.params.companyId

const sidebarItems = [
  { text: 'Home',        to: `/${companyId}/manager` },
  { text: 'Company',     to: `/${companyId}/manager/company` },
  { text: 'Team',        to: `/${companyId}/manager/team` },
  { text: 'Schedule',    to: `/${companyId}/manager/schedule` },
  { text: 'Attendance',  to: `/${companyId}/manager/attendancy` },
  { text: 'Payrolls',    to: `/${companyId}/manager/payrolls` },
  { text: 'Invites',     to: `/${companyId}/manager/invite` },
  { text: 'Holidays',    to: `/${companyId}/manager/holidays` },
  { text: 'Sick Leaves', to: `/${companyId}/manager/sick-leaves` },
]

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const employees  = ref([])
const loading    = ref(false)
const error      = ref('')
const editingId  = ref(null)
const editForm   = ref({ hourly_pay: 0, role: 'employee' })
const searchQuery    = ref('')
const sortKey        = ref('')
const sortDirection  = ref('asc')

const filteredEmployees = computed(() => {
  let data = [...employees.value]
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    data = data.filter(emp =>
      `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q)
    )
  }
  if (sortKey.value) {
    data.sort((a, b) => {
      let aVal = a[sortKey.value]
      let bVal = b[sortKey.value]
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()
      if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }
  return data
})

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }
}

const fetchEmployees = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/companies/${companyId}/employees`)
    employees.value = res.data
  } catch (e) {
    error.value = 'Failed to load employees'
  } finally {
    loading.value = false
  }
}

const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const startEdit  = (emp) => { editingId.value = emp.id; editForm.value = { hourly_pay: emp.hourly_pay, role: emp.role } }
const cancelEdit = () => (editingId.value = null)

const confirmEdit = async (emp) => {
  try {
    await getCsrfToken()
    await axios.put(`/api/companies/${companyId}/employees/${emp.id}`, {
      hourly_pay: editForm.value.hourly_pay,
      role: editForm.value.role
    })
    emp.hourly_pay = editForm.value.hourly_pay
    emp.role = editForm.value.role
    editingId.value = null
  } catch (e) {
    error.value = 'Failed to update employee'
  }
}

const deleteEmployee = async (emp) => {
  if (!confirm(`Delete ${emp.first_name} ${emp.last_name}?`)) return
  try {
    await getCsrfToken()
    await axios.delete(`/api/companies/${companyId}/employees/${emp.id}`)
    employees.value = employees.value.filter(e => e.id !== emp.id)
  } catch (e) {
    error.value = 'Failed to delete employee'
  }
}

onMounted(fetchEmployees)
</script>

<style scoped>
/* ── Layout ─────────────────────────────────────────────────────────── */
.page-wrapper { background-color: var(--bg-main); transition: background-color 0.3s ease; }
.blob-1 { background-color: var(--bg-subtle); opacity: 0.5; }
.blob-2 { background-color: var(--bg-subtle); opacity: 0.3; }

/* ── Typography tokens ───────────────────────────────────────────────── */
.page-label { color: var(--text-light); }
.page-title { color: var(--text-main); }
.table-text { color: var(--text-main); }
.table-sub  { color: var(--text-muted); }

/* ── Table card ──────────────────────────────────────────────────────── */
.table-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}
.table-summary  { border-bottom: 1px solid var(--border); }
.table-head-row { border-bottom: 1px solid var(--border); }
.table-row { border-bottom: 1px solid var(--border); transition: background-color 0.15s ease; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background-color: var(--bg-subtle); }
.row-even { background-color: var(--bg-card); }
.row-odd  { background-color: color-mix(in srgb, var(--bg-subtle) 40%, transparent); }

/* ── Search ──────────────────────────────────────────────────────────── */
.search-input {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border);
  color: var(--text-main);
  font-family: inherit;
}
.search-input::placeholder { color: var(--text-muted); }
.search-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent);
}
.search-icon { color: var(--text-muted); }

/* ── Avatar ──────────────────────────────────────────────────────────── */
.emp-avatar { background-color: var(--primary); }

/* ── Role badges ─────────────────────────────────────────────────────── */
.role-badge { font-size: 1.05rem; letter-spacing: 0.04em; }
.badge-manager {
  background-color: color-mix(in srgb, var(--primary) 15%, transparent);
  color: var(--primary);
  border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
}
.badge-employee {
  background-color: var(--bg-subtle);
  color: var(--text-muted);
  border: 1px solid var(--border);
}

/* ── Inline edit fields ──────────────────────────────────────────────── */
.field-input,
.field-select {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border);
  color: var(--text-main);
  font-family: inherit;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.field-input:focus,
.field-select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent);
}

/* ── Action buttons ──────────────────────────────────────────────────── */
.action-btn { font-family: inherit; font-weight: 500; cursor: pointer; border: 1px solid transparent; }

.edit-btn {
  background-color: var(--bg-subtle);
  border-color: var(--border-hover);
  color: var(--text-muted);
}
.edit-btn:hover { border-color: var(--primary); color: var(--text-main); }

.delete-btn {
  background-color: color-mix(in srgb, #ef4444 8%, transparent);
  border-color: color-mix(in srgb, #ef4444 20%, transparent);
  color: #ef4444;
}
.delete-btn:hover {
  background-color: color-mix(in srgb, #ef4444 16%, transparent);
  border-color: #ef4444;
}

.confirm-btn {
  background-color: color-mix(in srgb, #22c55e 12%, transparent);
  border-color: color-mix(in srgb, #22c55e 25%, transparent);
  color: #22c55e;
}
.confirm-btn:hover {
  background-color: color-mix(in srgb, #22c55e 20%, transparent);
  border-color: #22c55e;
}

.cancel-btn {
  background-color: var(--bg-subtle);
  border-color: var(--border);
  color: var(--text-muted);
}
.cancel-btn:hover { border-color: var(--border-hover); color: var(--text-main); }

/* ── Icon badge (empty state) ────────────────────────────────────────── */
.icon-badge {
  background-color: var(--bg-subtle);
  color: var(--text-muted);
}

/* ── Error pill ──────────────────────────────────────────────────────── */
.error-pill {
  background-color: color-mix(in srgb, #ef4444 10%, transparent);
  border: 1px solid color-mix(in srgb, #ef4444 25%, transparent);
  color: #ef4444;
}

/* ── Skeleton loading ────────────────────────────────────────────────── */
.skeleton-row {
  background: linear-gradient(
    90deg,
    var(--bg-subtle) 25%,
    color-mix(in srgb, var(--bg-subtle) 60%, var(--border)) 50%,
    var(--bg-subtle) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s ease infinite;
}
@keyframes shimmer { to { background-position: -200% 0; } }
</style>