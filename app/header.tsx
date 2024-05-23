import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
import React from 'react'

export function Header() {
  return (
    <div className="border-b">
        <div className="container mx-auto justify-between flex bg-gray-50 py-4 items-center">
            <div>File Application</div>
            <div className='flex gap-2'>
                <OrganizationSwitcher />
                <UserButton />
                <SignedOut>
                    <SignInButton>
                        <Button>
                            Sign in
                        </Button>
                    </SignInButton>
                </SignedOut>
            </div>
        </div>
    </div>
  )
}