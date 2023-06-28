import "@/styles/globals.css"
import { LineChart } from "lucide-react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div
              className="absolute inset-0 bg-cover"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)",
              }}
            />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <LineChart className="mr-2 h-6 w-6" /> Stocks
            </div>
          </div>
          {children}
        </main>
      </body>
    </html>
  )
}
