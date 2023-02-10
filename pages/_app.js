import '../styles/globals.css'
import { StoreProvider } from '../utilis/Store'

function MyApp({ Component, pageProps }) {
  return <StoreProvider>
    <Component {...pageProps} />
    
    </StoreProvider>
}

export default MyApp

//helllo