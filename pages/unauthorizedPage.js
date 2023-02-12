import React from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

function unauthorizedPage() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const {message} = router.query
  return (
    <Layout title='Unauthorized Page'>
        <h1 className='text-xl'>Access Denied</h1>
        {message && <div className='mb-4 text-red-500'>{message}</div>}

    </Layout>
    
  )
}

export default unauthorizedPage