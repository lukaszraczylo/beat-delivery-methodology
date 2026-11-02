import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeTheme } from './components/theme/theme'
// FontAwesome is the only icon system on the site, and it ships with the
// build: no third-party request, and the icons render offline.
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/styles/main.css'
import './main.css'

// The theme is applied before the app mounts, so a cold load never paints the
// wrong theme first.
initializeTheme()

const app = createApp(App)
app.use(router)
app.mount('#app')
