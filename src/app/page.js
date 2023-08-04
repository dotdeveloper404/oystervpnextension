'use client'

import React from 'react'
import Login from './login/page'
import Home from './home/page'
import { useSession } from 'next-auth/react'

const Index = () => {
  const session = useSession();


  if (session.status === "loading") {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  return (
    <>
      {session.status === 'authenticated'
       ? (<Home />) 
       : (<Login />)
       }
    </>
  )
}

export default Index