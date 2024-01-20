import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from "@clerk/themes"
const inter = Inter({ subsets: ['latin'] })
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'StreamIt',
  description: 'Let\'s Stream!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{baseTheme:dark}}>
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute='class' forcedTheme='dark' storageKey='streamit-theme'>
        <Toaster theme='light' position='bottom-center'/>
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}
