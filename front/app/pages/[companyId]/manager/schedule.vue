<template>
  <div class="page-wrapper flex">
    <Sidebar :items="sidebarItems" />
    <main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden">
      <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>
      <div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none"></div>
      <div class="relative z-10 max-w-[120rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[1.6rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]">
        <!-- Page header -->
        <div class="mb-[4rem] max-[768px]:mb-[2.4rem]">
          <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]">Vadītāja panelis</p>
          <h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide">Darbinieku maiņas</h1>
        </div>

        <!-- Error -->
        <Transition name="error-slide">
          <div v-if="error" class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]">
            <svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0 error-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z"/>
            </svg>
            <span class="flex-1">{{ error }}</span>
            <button @click="error = ''" class="error-close ml-auto flex-shrink-0 w-[2rem] h-[2rem] rounded-full flex items-center justify-center transition-all duration-150">
              <svg class="w-[1.1rem] h-[1.1rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </Transition>

        <!-- ── Create Shift ── -->
        <div class="filter-card rounded-[1.6rem] p-[2.8rem] mb-[2rem] max-[768px]:p-[1.6rem]">
          <div class="flex items-center gap-[1.4rem] mb-[2.4rem] pb-[2rem]" style="border-bottom: 1px solid var(--border)">
            <div class="empty-icon w-[4rem] h-[4rem] rounded-[1rem] flex items-center justify-center flex-shrink-0">
              <svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
            </div>
            <div>
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.1rem]">Grafiks</p>
              <h2 class="page-title text-[1.8rem] leading-tight">Izveidot maiņu</h2>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-[1.6rem] mb-[2.4rem] max-[768px]:gap-[1.2rem]">
            <div class="flex flex-col gap-[0.6rem]">
              <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Darbinieks</label>
              <select v-model="form.profile_id" class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200">
                <option disabled value="">Izvēlēties darbinieku</option>
                <option v-for="emp in employees" :key="emp.id" :value="emp.id">
                  {{ emp.first_name }} {{ emp.last_name }}
                </option>
              </select>
            </div>
            <div class="flex flex-col gap-[0.6rem]">
              <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Datums</label>
              <input type="date" v-model="form.shift_date" class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
            </div>
            <div class="flex flex-col gap-[0.6rem]">
              <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Sākuma laiks</label>
              <input type="time" v-model="form.starts_at" class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
            </div>
            <div class="flex flex-col gap-[0.6rem]">
              <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Beigu laiks</label>
              <input type="time" v-model="form.ends_at" class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
            </div>
          </div>
          <div class="flex justify-end">
            <button @click="submitShift" class="calc-btn relative flex items-center gap-[0.8rem] px-[2.4rem] py-[1.1rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 max-[480px]:w-full max-[480px]:justify-center">
              <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              Pievienot maiņu
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
            </button>
          </div>
        </div>

        <!-- ── Date Range + Export ── -->
        <div class="filter-card rounded-[1.6rem] p-[2.4rem] mb-[2rem] max-[768px]:p-[1.6rem]">
          <div class="flex flex-wrap items-end gap-[1.6rem] max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-[1.2rem]">
            <!-- Date range -->
            <div class="flex items-center gap-[1.2rem] max-[480px]:flex-col max-[480px]:items-stretch max-[480px]:gap-[1rem]">
              <div class="flex flex-col gap-[0.4rem]">
                <label class="page-label text-[1rem] tracking-[0.15em] uppercase">No</label>
                <input type="date" v-model="startDate" class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
              </div>
              <div class="arrow-sep mt-[1.8rem] text-[1.4rem] max-[480px]:hidden">→</div>
              <div class="flex flex-col gap-[0.4rem]">
                <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Līdz</label>
                <input type="date" v-model="endDate" class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
              </div>
            </div>
            <button @click="fetchShifts" class="calc-btn relative flex items-center justify-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200">
              <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
              </svg>
              Pielietot
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
            </button>
            <!-- Export buttons -->
            <div class="flex items-center gap-[1rem] max-[768px]:ml-0 ml-auto max-[480px]:flex-wrap">
              <span class="page-label text-[1rem] tracking-[0.15em] uppercase mr-[0.4rem] max-[480px]:w-full">Eksportēt</span>
              <button @click="exportCSV" class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200">
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                </svg>
                CSV
              </button>
              <button @click="exportXLS" class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200">
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125"/>
                </svg>
                XLS
              </button>
              <button @click="exportPDF" class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200">
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                </svg>
                PDF
              </button>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center gap-[1.6rem] py-[4rem] justify-center">
          <div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin"></div>
          <span class="page-label text-[1.2rem] tracking-[0.12em]">Ielādē maiņas…</span>
        </div>

        <!-- ── Shifts Table (desktop) + Cards (mobile) ── -->
        <div v-else-if="processedShifts.length" class="table-card rounded-[1.6rem] overflow-hidden">
          <!-- Summary / search bar -->
          <div class="table-summary flex items-center justify-between px-[3rem] py-[2rem] flex-wrap gap-[1.6rem] max-[768px]:px-[1.6rem] max-[768px]:py-[1.4rem]">
            <div>
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Periods</p>
              <p class="table-text text-[1.4rem] max-[480px]:text-[1.2rem]">{{ startDate }} → {{ endDate }}</p>
            </div>
            <div class="search-wrapper relative flex-1 max-w-[32rem] max-[480px]:max-w-full max-[480px]:w-full">
              <div class="search-icon-wrap absolute left-[1.2rem] top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"/>
                </svg>
              </div>
              <input type="text" v-model="searchQuery" placeholder="Meklēt pēc vārda vai e-pasta…" class="search-input w-full pl-[3.8rem] pr-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200" />
            </div>
            <div class="text-right">
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Maiņas</p>
              <p class="page-title text-[2.4rem] leading-none tabular-nums">{{ processedShifts.length }}</p>
            </div>
          </div>

          <!-- ── DESKTOP TABLE ── -->
          <table class="w-full max-[768px]:hidden">
            <thead>
              <tr class="table-head-row">
                <th @click="sortBy('employee')" class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none">
                  <span class="flex items-center gap-[0.5rem]">Darbinieks <sort-arrow :active="sortKey==='employee'" :desc="sortDirection==='desc'" /></span>
                </th>
                <th @click="sortBy('email')" class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none">
                  <span class="flex items-center gap-[0.5rem]">E-pasts <sort-arrow :active="sortKey==='email'" :desc="sortDirection==='desc'" /></span>
                </th>
                <th @click="sortBy('date')" class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none">
                  <span class="flex items-center gap-[0.5rem]">Datums <sort-arrow :active="sortKey==='date'" :desc="sortDirection==='desc'" /></span>
                </th>
                <th @click="sortBy('start')" class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none">
                  <span class="flex items-center gap-[0.5rem]">Sākums <sort-arrow :active="sortKey==='start'" :desc="sortDirection==='desc'" /></span>
                </th>
                <th @click="sortBy('end')" class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none">
                  <span class="flex items-center gap-[0.5rem]">Beigas <sort-arrow :active="sortKey==='end'" :desc="sortDirection==='desc'" /></span>
                </th>
                <th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal">Darbības</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(shift, i) in processedShifts" :key="shift.id" class="table-row" :class="i % 2 === 0 ? 'row-even' : 'row-odd'">
                <td class="px-[3rem] py-[1.6rem]">
                  <div class="flex items-center gap-[1.2rem]">
                    <div class="emp-avatar w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center text-[1.1rem] text-white flex-shrink-0">
                      {{ shift.company_user.user.first_name?.[0]?.toUpperCase() }}
                    </div>
                    <span class="table-text text-[1.3rem]">{{ shift.company_user.user.first_name }} {{ shift.company_user.user.last_name }}</span>
                  </div>
                </td>
                <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]">{{ shift.company_user.user.email }}</td>
                <td class="px-[3rem] py-[1.6rem]">
                  <span v-if="editingId !== shift.id" class="table-text text-[1.3rem]">{{ new Date(shift.shift_date).toLocaleDateString('en-GB') }}</span>
                  <input v-else type="date" v-model="editForm.shift_date" class="date-input rounded-[0.6rem] px-[1rem] py-[0.6rem] text-[1.2rem] outline-none" />
                </td>
                <td class="px-[3rem] py-[1.6rem]">
                  <span v-if="editingId !== shift.id" class="table-text text-[1.3rem] tabular-nums">{{ shift.starts_at }}</span>
                  <input v-else type="time" v-model="editForm.starts_at" class="date-input rounded-[0.6rem] px-[1rem] py-[0.6rem] text-[1.2rem] outline-none" />
                </td>
                <td class="px-[3rem] py-[1.6rem]">
                  <span v-if="editingId !== shift.id" class="table-text text-[1.3rem] tabular-nums">{{ shift.ends_at }}</span>
                  <input v-else type="time" v-model="editForm.ends_at" class="date-input rounded-[0.6rem] px-[1rem] py-[0.6rem] text-[1.2rem] outline-none" />
                </td>
                <td class="px-[3rem] py-[1.6rem]">
                  <div class="flex items-center justify-end gap-[0.8rem]">
                    <template v-if="editingId !== shift.id">
                      <button @click="startEdit(shift)" class="action-btn edit-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]">
                        Rediģēt
                      </button>
                      <button @click="deleteShift(shift)" class="action-btn delete-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]">
                        Dzēst
                      </button>
                    </template>
                    <template v-else>
                      <button @click="confirmEdit(shift)" class="action-btn confirm-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]">
                        Apstiprināt
                      </button>
                      <button @click="cancelEdit" class="action-btn cancel-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]">
                        Atcelt
                      </button>
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="table-foot-row">
                <td colspan="5" class="px-[3rem] py-[1.8rem] text-[1.1rem] tracking-[0.12em] uppercase text-right table-sub">Kopējais maiņu skaits</td>
                <td class="px-[3rem] py-[1.8rem] text-[1.8rem] text-right tabular-nums font-medium page-title">{{ processedShifts.length }}</td>
              </tr>
            </tfoot>
          </table>

          <!-- ── MOBILE CARDS ── -->
          <div class="hidden max-[768px]:block">
            <!-- Sort chips -->
            <div class="sort-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1.2rem] overflow-x-auto">
              <span class="page-label text-[1rem] tracking-[0.15em] uppercase flex-shrink-0">Kārtot:</span>
              <button
                v-for="col in mobileSortCols" :key="col.key"
                @click="sortBy(col.key)"
                class="sort-chip flex items-center gap-[0.4rem] px-[1rem] py-[0.5rem] rounded-full text-[1.1rem] flex-shrink-0 transition-all duration-150"
                :class="sortKey === col.key ? 'sort-chip-active' : ''"
              >
                {{ col.label }}
              </button>
            </div>

            <!-- Shift cards -->
            <div class="flex flex-col divide-y divide-[var(--border)]">
              <div v-for="shift in processedShifts" :key="shift.id" class="shift-card px-[1.6rem] py-[1.8rem]">
                <div class="flex items-center justify-between gap-[1.2rem] mb-[1.2rem]">
                  <div class="flex items-center gap-[1.2rem] min-w-0">
                    <div class="emp-avatar w-[3.6rem] h-[3.6rem] rounded-full flex items-center justify-center text-[1.3rem] text-white flex-shrink-0">
                      {{ shift.company_user.user.first_name?.[0]?.toUpperCase() }}
                    </div>
                    <div class="min-w-0">
                      <p class="table-text text-[1.4rem] font-medium truncate">{{ shift.company_user.user.first_name }} {{ shift.company_user.user.last_name }}</p>
                      <p class="table-sub text-[1.1rem] truncate">{{ shift.company_user.user.email }}</p>
                    </div>
                  </div>
                  <span class="date-badge flex-shrink-0 text-[1.1rem] px-[1rem] py-[0.3rem] rounded-full tabular-nums">
                    {{ new Date(shift.shift_date).toLocaleDateString('en-GB') }}
                  </span>
                </div>

                <div v-if="editingId === shift.id" class="flex flex-col gap-[1rem] mb-[1.2rem]">
                  <div class="flex items-center gap-[1rem]">
                    <label class="page-label text-[1rem] tracking-[0.15em] uppercase w-[8rem] flex-shrink-0">Datums</label>
                    <input type="date" v-model="editForm.shift_date" class="date-input rounded-[0.6rem] px-[1rem] py-[0.7rem] text-[1.3rem] outline-none flex-1" />
                  </div>
                  <div class="flex items-center gap-[1rem]">
                    <label class="page-label text-[1rem] tracking-[0.15em] uppercase w-[8rem] flex-shrink-0">Sākums</label>
                    <input type="time" v-model="editForm.starts_at" class="date-input rounded-[0.6rem] px-[1rem] py-[0.7rem] text-[1.3rem] outline-none flex-1" />
                  </div>
                  <div class="flex items-center gap-[1rem]">
                    <label class="page-label text-[1rem] tracking-[0.15em] uppercase w-[8rem] flex-shrink-0">Beigas</label>
                    <input type="time" v-model="editForm.ends_at" class="date-input rounded-[0.6rem] px-[1rem] py-[0.7rem] text-[1.3rem] outline-none flex-1" />
                  </div>
                </div>

                <div v-else class="flex items-center gap-[1.6rem] mb-[1.2rem]">
                  <div class="flex items-center gap-[0.6rem]">
                    <svg class="w-[1.2rem] h-[1.2rem] flex-shrink-0" style="color:var(--text-muted)" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="table-text text-[1.3rem] tabular-nums">{{ shift.starts_at }}</span>
                  </div>
                  <span class="table-sub text-[1.1rem]">→</span>
                  <span class="table-text text-[1.3rem] tabular-nums">{{ shift.ends_at }}</span>
                </div>

                <div class="flex items-center gap-[0.8rem]">
                  <template v-if="editingId !== shift.id">
                    <button @click="startEdit(shift)" class="action-btn edit-btn flex-1 flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem]">
                      Rediģēt
                    </button>
                    <button @click="deleteShift(shift)" class="action-btn delete-btn flex-1 flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem]">
                      Dzēst
                    </button>
                  </template>
                  <template v-else>
                    <button @click="confirmEdit(shift)" class="action-btn confirm-btn flex-1 flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem]">
                      Apstiprināt
                    </button>
                    <button @click="cancelEdit" class="action-btn cancel-btn flex-1 flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem]">
                      Atcelt
                    </button>
                  </template>
                </div>
              </div>

              <div class="flex items-center justify-between px-[1.6rem] py-[1.4rem] table-foot-row">
                <span class="page-label text-[1rem] tracking-[0.15em] uppercase">Kopējais maiņu skaits</span>
                <span class="page-title text-[2rem] tabular-nums font-medium">{{ processedShifts.length }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="!loading" class="flex flex-col items-center justify-center py-[8rem] text-center">
          <div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]">
            <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
            </svg>
          </div>
          <p class="table-sub text-[1.4rem] tracking-[0.06em]">Šajā periodā maiņas nav atrastas.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

definePageMeta({ middleware: 'auth-company', requiresManager: true })

const route     = useRoute()
const companyId = route.params.companyId

const sidebarItems = [
  { text: 'Sākums',       to: `/${companyId}/manager` },
  { text: 'Uzņēmums',     to: `/${companyId}/manager/company` },
  { text: 'Komanda',       to: `/${companyId}/manager/team` },
  { text: 'Grafiks',      to: `/${companyId}/manager/schedule` },
  { text: 'Apmeklējumi',   to: `/${companyId}/manager/attendancy` },
  { text: 'Algas',         to: `/${companyId}/manager/payrolls` },
  { text: 'Ielūgumi',      to: `/${companyId}/manager/invite` },
  { text: 'Brīvdienas',    to: `/${companyId}/manager/holidays` },
  { text: 'Slimības atvaļinājumi', to: `/${companyId}/manager/sick-leaves` },
]

axios.defaults.withCredentials              = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const employees     = ref([])
const shifts        = ref([])
const loading       = ref(false)
const error         = ref('')
const searchQuery   = ref('')
const sortKey       = ref('')
const sortDirection = ref('asc')
const form          = ref({ profile_id: '', shift_date: '', starts_at: '', ends_at: '' })
const editingId     = ref(null)
const editForm      = ref({ profile_id: '', shift_date: '', starts_at: '', ends_at: '' })

let errorTimer = null
const setError = (msg) => {
  error.value = msg
  clearTimeout(errorTimer)
  errorTimer = setTimeout(() => { error.value = '' }, 5000)
}

const mobileSortCols = [
  { key: 'employee', label: 'Name' },
  { key: 'date',     label: 'Date' },
  { key: 'start',    label: 'Start' },
  { key: 'end',      label: 'End' },
]

const today      = new Date()
const formatDate = (d) => d.toISOString().slice(0, 10)
const startDate  = ref(formatDate(new Date(today.getFullYear(), today.getMonth(), 1)))
const endDate    = ref(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)))

const fetchEmployees = async () => {
  try {
    const res = await axios.get(`/api/companies/${companyId}/employees`)
    employees.value = res.data
  } catch {
    setError('Failed to load employees')
  }
}

const fetchShifts = async () => {
  loading.value = true
  error.value   = ''
  try {
    const res = await axios.get(`/api/shifts/company/${companyId}`, {
      params: { start_date: startDate.value, end_date: endDate.value }
    })
    shifts.value = res.data
  } catch {
    setError('Failed to load shifts')
  } finally {
    loading.value = false
  }
}

const processedShifts = computed(() => {
  let data = [...shifts.value]
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    data = data.filter(s =>
      `${s.company_user.user.first_name} ${s.company_user.user.last_name}`.toLowerCase().includes(q) ||
      s.company_user.user.email.toLowerCase().includes(q)
    )
  }
  if (sortKey.value) {
    data.sort((a, b) => {
      let aVal, bVal
      switch (sortKey.value) {
        case 'employee': aVal = `${a.company_user.user.first_name} ${a.company_user.user.last_name}`; bVal = `${b.company_user.user.first_name} ${b.company_user.user.last_name}`; break
        case 'email':    aVal = a.company_user.user.email;  bVal = b.company_user.user.email;  break
        case 'date':     aVal = new Date(a.shift_date);     bVal = new Date(b.shift_date);     break
        case 'start':    aVal = a.starts_at;                bVal = b.starts_at;                break
        case 'end':      aVal = a.ends_at;                  bVal = b.ends_at;                  break
      }
      if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection.value === 'asc' ?  1 : -1
      return 0
    })
  }
  return data
})

const sortBy = (key) => {
  if (sortKey.value === key) { sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc' }
  else { sortKey.value = key; sortDirection.value = 'asc' }
}

const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const submitShift = async () => {
  try {
    await getCsrfToken()
    await axios.post('/api/shifts', form.value)
    fetchShifts()
  } catch {
    setError('Failed to create shift')
  }
}

const startEdit   = (s) => {
  editingId.value = s.id
  editForm.value  = { profile_id: s.company_user.id, shift_date: s.shift_date, starts_at: s.starts_at, ends_at: s.ends_at }
}
const cancelEdit  = () => { editingId.value = null }

const confirmEdit = async (s) => {
  try {
    await getCsrfToken()
    await axios.put(`/api/shifts/${s.id}`, editForm.value)
    s.shift_date = editForm.value.shift_date
    s.starts_at  = editForm.value.starts_at
    s.ends_at    = editForm.value.ends_at
    editingId.value = null
  } catch {
    setError('Failed to update shift')
  }
}

const deleteShift = async (s) => {
  if (!confirm('Delete this shift?')) return
  try {
    await getCsrfToken()
    await axios.delete(`/api/shifts/${s.id}`)
    shifts.value = shifts.value.filter(x => x.id !== s.id)
  } catch {
    setError('Failed to delete shift')
  }
}

const getExportData = () => processedShifts.value.map(s => ({
  Employee: `${s.company_user.user.first_name} ${s.company_user.user.last_name}`,
  Email:    s.company_user.user.email,
  Date:     new Date(s.shift_date).toLocaleDateString('en-GB'),
  Start:    s.starts_at,
  End:      s.ends_at,
}))

const exportCSV = () => {
  const ws = XLSX.utils.json_to_sheet(getExportData())
  const a  = Object.assign(document.createElement('a'), {
    href:     URL.createObjectURL(new Blob([XLSX.utils.sheet_to_csv(ws)], { type: 'text/csv' })),
    download: `shifts_${startDate.value}_${endDate.value}.csv`,
  })
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
}

const exportXLS = () => {
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(getExportData()), 'Shifts')
  XLSX.writeFile(wb, `shifts_${startDate.value}_${endDate.value}.xlsx`)
}

const exportPDF = () => {
  const doc = new jsPDF()
  doc.setFontSize(18); doc.text('Shifts Report', 14, 20)
  doc.setFontSize(11); doc.text(`Period: ${startDate.value} – ${endDate.value}`, 14, 30)
  autoTable(doc, {
    head: [['Employee', 'Email', 'Date', 'Start', 'End']],
    body: getExportData().map(r => [r.Employee, r.Email, r.Date, r.Start, r.End]),
    startY: 38,
  })
  doc.save(`shifts_${startDate.value}_${endDate.value}.pdf`)
}

onMounted(() => { fetchEmployees(); fetchShifts() })
</script>

<style scoped>
.page-wrapper { background-color: var(--bg-main); transition: background-color 0.3s ease; }
.blob-1 { background-color: var(--bg-subtle); opacity: 0.5; }
.blob-2 { background-color: var(--bg-subtle); opacity: 0.3; }
.page-label  { color: var(--text-light); }
.page-title  { color: var(--text-main); }
.table-text  { color: var(--text-main); }
.table-sub   { color: var(--text-muted); }
.table-empty { color: var(--text-light); }

.filter-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.date-input {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border-hover);
  color: var(--text-main);
  font-family: inherit;
  color-scheme: light;
}
[data-theme="dark"] .date-input { color-scheme: dark; }
.date-input:focus {
  border-color: var(--primary);
  background-color: var(--bg-card);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.arrow-sep { color: var(--text-light); }

.calc-btn {
  background-color: var(--primary);
  box-shadow: 0 0.2rem 0.8rem var(--primary-soft);
  font-family: inherit;
  cursor: pointer;
}
.calc-btn:hover { background-color: var(--primary-hover); box-shadow: var(--shadow-md); }

.export-btn {
  background-color: var(--bg-card);
  border: 1px solid var(--border-hover);
  color: var(--text-muted);
  font-family: inherit;
  cursor: pointer;
}
.export-btn:hover { border-color: var(--primary); color: var(--text-main); box-shadow: var(--shadow-sm); }

.spinner { border: 2px solid var(--border-hover); border-top-color: var(--primary); }

/* ── Error bar ── */
.error-bar {
  background-color: var(--danger-soft);
  border: 1px solid var(--danger);
  color: var(--danger);
}
.error-icon {
  animation: error-pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes error-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.45; }
}
.error-close {
  background-color: color-mix(in srgb, var(--danger) 12%, transparent);
  color: var(--danger);
  opacity: 0.7;
  border: none;
  cursor: pointer;
}
.error-close:hover {
  background-color: color-mix(in srgb, var(--danger) 24%, transparent);
  opacity: 1;
}

/* ── Error transition ── */
.error-slide-enter-active {
  animation: error-in 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.error-slide-leave-active {
  animation: error-out 0.22s ease-in forwards;
  overflow: hidden;
}
@keyframes error-in {
  from { opacity: 0; transform: translateY(-0.6rem) scaleY(0.9); }
  to   { opacity: 1; transform: translateY(0) scaleY(1); }
}
@keyframes error-out {
  from { opacity: 1; transform: translateY(0) scaleY(1);    max-height: 6rem;  margin-bottom: 2.4rem; padding-top: 1.4rem; padding-bottom: 1.4rem; }
  to   { opacity: 0; transform: translateY(-0.3rem) scaleY(0.94); max-height: 0; margin-bottom: 0;    padding-top: 0;      padding-bottom: 0; }
}

/* ── Table ── */
.table-card { background-color: var(--bg-card); border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.table-summary  { border-bottom: 1px solid var(--border); }
.table-head-row { border-bottom: 1px solid var(--border); }
.table-row { border-bottom: 1px solid var(--border); transition: background-color 0.15s ease; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background-color: var(--bg-subtle); }
.row-even { background-color: var(--bg-card); }
.row-odd  { background-color: color-mix(in srgb, var(--bg-subtle) 40%, transparent); }
.table-foot-row { border-top: 1px solid var(--border-hover); background-color: var(--bg-subtle); }
.emp-avatar { background-color: var(--primary); }

/* Mobile sort chips */
.sort-bar { border-bottom: 1px solid var(--border); }
.sort-chip {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-family: inherit;
}
.sort-chip:hover { border-color: var(--border-hover); color: var(--text-main); }
.sort-chip-active {
  background-color: color-mix(in srgb, var(--primary) 12%, transparent);
  border-color: color-mix(in srgb, var(--primary) 35%, transparent);
  color: var(--primary);
}

/* Mobile shift card */
.shift-card { background-color: var(--bg-card); transition: background-color 0.15s ease; }
.shift-card:active { background-color: var(--bg-subtle); }

/* Date badge on mobile cards */
.date-badge {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border);
  color: var(--text-muted);
}

.search-input {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border);
  color: var(--text-main);
  font-family: inherit;
}
.search-input::placeholder { color: var(--text-muted); }
.search-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-soft); }
.search-icon-wrap { color: var(--text-muted); }

.action-btn { font-family: inherit; font-weight: 500; cursor: pointer; border: 1px solid transparent; transition: all 0.15s ease; }
.edit-btn    { background-color: var(--bg-subtle); border-color: var(--border-hover); color: var(--text-muted); }
.edit-btn:hover { border-color: var(--primary); color: var(--text-main); }
.delete-btn  { background-color: var(--danger-soft); border-color: color-mix(in srgb, var(--danger) 30%, transparent); color: var(--danger); }
.delete-btn:hover { border-color: var(--danger); }
.confirm-btn { background-color: color-mix(in srgb, #22c55e 12%, transparent); border-color: color-mix(in srgb, #22c55e 30%, transparent); color: #22c55e; }
.confirm-btn:hover { background-color: color-mix(in srgb, #22c55e 20%, transparent); border-color: #22c55e; }
.cancel-btn  { background-color: var(--bg-subtle); border-color: var(--border); color: var(--text-muted); }
.cancel-btn:hover { border-color: var(--border-hover); color: var(--text-main); }

.empty-icon { background-color: var(--bg-subtle); color: var(--text-light); }

main::-webkit-scrollbar { width: 6px; }
main::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 3px; }
</style>