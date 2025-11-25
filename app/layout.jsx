import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/components/App.css'
import Providers from '../src/providers/providers'


export const metadata = {
  title: 'Weather App',
  description: 'Weather app converted from CRA',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
)
}