"use client"

import { trpc } from '@/libraries/trpc/client'

export default function Home() {
  const sample = trpc.sample.get.useQuery()

  if (sample.isLoading) return <div>loading...</div>

  return (
    <div>
      <p>Hello {sample.data?.text}</p>
    </div>
  )
}