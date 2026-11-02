import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeTheme } from './components/theme/theme'
import './assets/styles/main.css'
import './main.css'

// The theme is applied before the app mounts, so a cold load never paints the
// wrong theme first.
initializeTheme()

const app = createApp(App)
app.use(router)
app.mount('#app')
