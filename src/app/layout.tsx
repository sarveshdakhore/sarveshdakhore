import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <meta name="google-adsense-account" content="ca-pub-7726311284531292" />
        <meta name="description" content={metadata.description || 'Default Description'} />
      </Head>
      <div className={inter.className}>{children}</div>
    </>
  )
}