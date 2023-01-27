import { SessionProvider } from "next-auth/react"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp