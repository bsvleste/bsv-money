'use client'
import { ButtonLogin } from '@/components/ButtonLogin'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <main className="">
      <form action="">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonLogin email={email} password={password} />
      </form>
    </main>
  )
}

Home.requireAuth = true
