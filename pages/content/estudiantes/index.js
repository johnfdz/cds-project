import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login')
  }, [status]);

  if (status === 'authenticated') {
    return (
      <>
        <h1>estudiantes</h1>
      </>
    )
  }

  
  return (
    <h1>Loading</h1>
  )
}
