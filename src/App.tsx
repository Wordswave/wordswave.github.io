import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { AppRoutes } from './routes/AppRoutes'

const routerBasename =
  import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/+$/, '')

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename={routerBasename}>
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  )
}
