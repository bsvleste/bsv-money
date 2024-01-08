import { signIn } from 'next-auth/react'

type ButtonLoginProps = {
  email: string
  password: string
}
export function ButtonLogin({ email, password }: ButtonLoginProps) {
  return (
    <button
      onClick={() =>
        signIn('credentials', {
          email,
          password,

          redirect: true,
          callbackUrl: '/main',
        })
      }
      disabled={!email || !password}
    >
      Login
    </button>
  )
}
