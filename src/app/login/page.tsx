import { auth, signIn } from '@/auth'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await auth()
  
  // Return to home if already logged in
  if (session?.user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-sm space-y-4 rounded-lg border p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form
          action={async () => {
            'use server'
            await signIn('github')
          }}
        >
          <Button className="w-full">Sign in with GitHub</Button>
        </form>
        <form
          action={async () => {
            'use server'
            await signIn('google')
          }}
        >
          <Button variant="outline" className="w-full">
            Sign in with Google
          </Button>
        </form>
      </div>
    </div>
  )
}
