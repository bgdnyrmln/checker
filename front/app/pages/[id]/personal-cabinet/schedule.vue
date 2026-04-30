<template>
  <div class="page-wrapper flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden">

      <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>
      <div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none"></div>

      <div class="relative z-10 max-w-[96rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[2rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]">

        <!-- Page header -->
        <div class="mb-[4rem] max-[768px]:mb-[2.4rem]">
          <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]">Personal Cabinet</p>
          <h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide">My Schedule</h1>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center gap-[1.6rem] py-[4rem] justify-center">
          <div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin"></div>
          <span class="page-label text-[1.2rem] tracking-[0.12em]">Loading schedule...</span>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]">
          <span>⚠</span> {{ error }}
        </div>

        <!-- Calendar card -->
        <div v-else class="calendar-card rounded-[1.6rem] p-[3rem] max-[768px]:p-[1.6rem]">
          <FullCalendar :options="calendarOptions" />
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'

definePageMeta({
  middleware: 'auth-company',
  requiresEmployee: true
})

const route = useRoute()
const profileId = route.params.id
const { isDark } = useTheme()

const sidebarItems = [
  { text: 'Dashboard',   to: `/${profileId}/personal-cabinet` },
  { text: 'Attendance',  to: `/${profileId}/personal-cabinet/attendance` },
  { text: 'Payroll',     to: `/${profileId}/personal-cabinet/payroll` },
  { text: 'Schedule',    to: `/${profileId}/personal-cabinet/schedule` },
  { text: 'Holidays',    to: `/${profileId}/personal-cabinet/holidays` },
  { text: 'Sick Leaves', to: `/${profileId}/personal-cabinet/sick-leaves` },
]

axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const loading  = ref(false)
const error    = ref('')
const events   = ref([])
const isMobile = ref(false)

const checkMobile = () => { isMobile.value = window.innerWidth <= 768 }

const fetchSchedule = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/shifts/schedule/${profileId}`)
    events.value = res.data.map(shift => ({
      id: shift.id,
      title: `${shift.starts_at.slice(0, 5)} – ${shift.ends_at.slice(0, 5)}`,
      start: shift.shift_date,
      allDay: true
    }))
  } catch (e) {
    error.value = 'Failed to load schedule'
  } finally {
    loading.value = false
  }
}

const calendarOptions = ref({
  plugins: [dayGridPlugin, listPlugin],
  initialView: 'dayGridMonth',
  height: 'auto',
  events: events.value,
  eventColor: '#4b5563',
  eventBorderColor: 'transparent',
  eventTextColor: '#ffffff',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,listMonth'
  },
  buttonText: {
    today: 'Today',
    month: 'Month',
    list: 'List'
  },
  dayMaxEvents: 2,
  views: {
    listMonth: {
      listDayFormat: { weekday: 'long', day: 'numeric', month: 'short' },
      listDaySideFormat: false,
      noEventsText: 'No shifts this month'
    }
  }
})

watch(events, (newEvents) => {
  calendarOptions.value = { ...calendarOptions.value, events: newEvents }
})

watch(isMobile, (mobile) => {
  calendarOptions.value = {
    ...calendarOptions.value,
    initialView: mobile ? 'listMonth' : 'dayGridMonth',
    headerToolbar: mobile
      ? { left: 'prev,next', center: 'title', right: 'today' }
      : { left: 'prev,next today', center: 'title', right: 'dayGridMonth,listMonth' }
  }
})

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  fetchSchedule()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style>
.calendar-card .fc {
  font-family: 'Circular Std', sans-serif;
  font-size: 1.3rem;
}

/* Toolbar */
.calendar-card .fc-toolbar {
  margin-bottom: 2.4rem !important;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
.calendar-card .fc-toolbar-title {
  font-size: 2rem !important;
  font-weight: 400 !important;
  letter-spacing: 0.02em;
  color: var(--text-main);
}
@media (max-width: 768px) {
  .calendar-card .fc-toolbar-title { font-size: 1.6rem !important; }
  .calendar-card .fc-toolbar { margin-bottom: 1.6rem !important; }
}

/* Nav buttons */
.calendar-card .fc-button {
  background-color: var(--bg-subtle) !important;
  border: 1px solid var(--border-hover) !important;
  color: var(--text-muted) !important;
  box-shadow: none !important;
  border-radius: 0.8rem !important;
  padding: 0.5rem 1.2rem !important;
  font-size: 1.2rem !important;
  font-family: 'Circular Std', sans-serif !important;
  transition: all 0.2s ease !important;
}
@media (max-width: 768px) {
  .calendar-card .fc-button {
    padding: 0.4rem 0.9rem !important;
    font-size: 1.1rem !important;
  }
}
.calendar-card .fc-button:hover {
  background-color: var(--border-hover) !important;
  color: var(--text-main) !important;
}
.calendar-card .fc-button-primary:not(:disabled).fc-button-active,
.calendar-card .fc-button-primary:not(:disabled):active {
  background-color: var(--primary) !important;
  border-color: var(--primary) !important;
  color: #fff !important;
}

/* Day header */
.calendar-card .fc-col-header-cell {
  padding: 1rem 0 !important;
  font-size: 1rem !important;
  letter-spacing: 0.15em !important;
  text-transform: uppercase !important;
  font-weight: 400 !important;
  color: var(--text-light) !important;
  background-color: transparent !important;
  border-color: var(--border) !important;
}
@media (max-width: 480px) {
  .calendar-card .fc-col-header-cell { font-size: 0.85rem !important; letter-spacing: 0.06em !important; }
}
.calendar-card .fc-col-header-cell a { color: inherit !important; text-decoration: none !important; }

/* Day cells */
.calendar-card .fc-daygrid-day {
  background-color: transparent !important;
  border-color: var(--border) !important;
}
.calendar-card .fc-daygrid-day:hover { background-color: var(--bg-subtle) !important; }
.calendar-card .fc-day-today { background-color: var(--primary-soft) !important; }
.calendar-card .fc-daygrid-day-number {
  font-size: 1.2rem !important;
  color: var(--text-muted) !important;
  padding: 0.8rem !important;
  text-decoration: none !important;
}
@media (max-width: 480px) {
  .calendar-card .fc-daygrid-day-number { font-size: 1rem !important; padding: 0.4rem !important; }
}
.calendar-card .fc-day-today .fc-daygrid-day-number {
  color: var(--primary) !important;
  font-weight: 600 !important;
}

/* Events */
.calendar-card .fc-event {
  border-radius: 0.6rem !important;
  padding: 0.2rem 0.8rem !important;
  font-size: 1.1rem !important;
  font-weight: 400 !important;
  letter-spacing: 0.03em !important;
  border: none !important;
  background-color: var(--primary) !important;
  color: #fff !important;
  cursor: default !important;
}
@media (max-width: 480px) {
  .calendar-card .fc-event { font-size: 0.9rem !important; padding: 0.15rem 0.4rem !important; }
}
.calendar-card .fc-event:hover { opacity: 0.85; }

/* +N more */
.calendar-card .fc-daygrid-more-link {
  font-size: 1rem !important;
  color: var(--text-muted) !important;
}

/* List view */
.calendar-card .fc-list {
  border-color: var(--border) !important;
  border-radius: 0.8rem !important;
  overflow: hidden;
}
.calendar-card .fc-list-day-cushion {
  background-color: var(--bg-subtle) !important;
  padding: 0.8rem 1.6rem !important;
}
.calendar-card .fc-list-day-text,
.calendar-card .fc-list-day-side-text {
  font-size: 1.2rem !important;
  color: var(--text-main) !important;
  text-decoration: none !important;
}
.calendar-card .fc-list-event {
  background-color: var(--bg-card) !important;
  border-bottom: 1px solid var(--border) !important;
}
.calendar-card .fc-list-event:hover td { background-color: var(--bg-subtle) !important; }
.calendar-card .fc-list-event-time {
  font-size: 1.2rem !important;
  color: var(--text-muted) !important;
  padding: 1.2rem 1.6rem !important;
  white-space: nowrap;
}
.calendar-card .fc-list-event-title {
  font-size: 1.3rem !important;
  color: var(--text-main) !important;
  padding: 1.2rem 1.6rem !important;
}
.calendar-card .fc-list-event-dot {
  border-color: var(--primary) !important;
}
.calendar-card .fc-list-empty {
  background-color: var(--bg-card) !important;
  color: var(--text-muted) !important;
  font-size: 1.3rem !important;
  padding: 4rem !important;
}

/* Scrollbar */
.calendar-card ::-webkit-scrollbar { width: 6px; }
.calendar-card ::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 3px; }
</style>

<style scoped>
.page-wrapper { background-color: var(--bg-main); transition: background-color 0.3s ease; }
.blob-1 { background-color: var(--bg-subtle); opacity: 0.5; }
.blob-2 { background-color: var(--bg-subtle); opacity: 0.3; }
.page-label { color: var(--text-light); }
.page-title { color: var(--text-main); }
.spinner { border: 1px solid var(--border-hover); border-top-color: var(--primary); }
.error-bar { background-color: var(--danger-soft); border: 1px solid var(--danger); color: var(--danger); }
.calendar-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
</style>