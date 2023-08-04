import AuthProvider from '@/components/AuthProvider/AuthProvider'
import './globals.css'
import { Poppins } from 'next/font/google'


const poppins = Poppins({  weight: '400', subsets  : ['latin']})

export const metadata = {
  title: 'OysterVPN browser extension',
  description: 'OysterVPN browser extension',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
