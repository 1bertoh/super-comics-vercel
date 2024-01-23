import { Inter } from 'next/font/google'
import './globals.css'
import '@/public/styles/navbar.css'
import '@/public/styles/section-item.css'
import '@/public/styles/pagination.css'
import "@/public/styles/tooltip.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: "Super Comic: The best reading for comics",
    description:
        "Super Comic is a free reading comic site.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  className={inter.className}>{children}</body>
    </html>
  )
}
