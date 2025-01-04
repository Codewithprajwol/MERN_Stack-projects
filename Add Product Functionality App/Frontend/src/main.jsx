import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from './components/ui/provider'
import { BrowserRouter } from 'react-router-dom'
import { ColorModeProvider } from './components/ui/color-mode.jsx'

createRoot(document.getElementById('root')).render(
    <Provider>
      <ColorModeProvider>
      <BrowserRouter>
    <App />
    </BrowserRouter> 
    </ColorModeProvider>
    </Provider>
)
