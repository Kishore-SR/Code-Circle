import { SignOutButton, SignUpButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
      <SignUpButton/>

      <SignOutButton/>
      <h1>Welcome to Code Snippets</h1>
    </div>
  )
}