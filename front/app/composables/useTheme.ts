export const useTheme = () => {
  const isDark = useState<boolean>('isDark', () => false)

  const initTheme = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = saved ? saved === 'dark' : prefersDark
      applyTheme()
    }
  }

  const applyTheme = () => {
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }

  return { isDark, toggleTheme, initTheme }
}