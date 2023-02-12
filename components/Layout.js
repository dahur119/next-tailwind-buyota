import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react';
import { Store } from '../utilis/Store';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import { ToastContainer } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
function Layout({title, children}) {
  const {status, data:session} = useSession()
  const {state, dispatch} = useContext(Store)
  const {cart} = state;
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(()=>{
    setCartItemCount(cart.cartItems.reduce((a, c)=>a+c.quantity, 0))

  }, [cart.cartItems])

  const logoutClickHandler =() =>{
    Cookies.remove('cart')
    dispatch({type:'CART_RESET'})
    signOut({callbackUrl:'/login'})
  }
 
  return (
    <>
       <Head>
        <title>{title ? title + ' - Buyota':'Buyota' }</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position='bottom-center' limit={1}/>
    <div className='flex min-h-screen flex-col justify-between '>
        <header>
            <nav className='flex h-12 items-center px-4 justify-between shadow-md ' >
              <Link href="/" legacyBehavior >
               <a className='text-lg font-bold'>Buyota</a>
                </Link>   

              <div>
                  <Link href="/cart" legacyBehavior>
                  <a className='p-2'>
                    cart 
                  {cartItemCount > 0 && (
                    <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                      {cartItemCount}
 
                    </span>

                   )}
                  </a>
                  </Link>
                
                  {status === 'loading' ? ('loading') :
                  
                     session?.user ?
                      <Menu as="div" className='relative in-block'>
                        <Menu.Button className="text-blue-600">
                          {session.user.name}

                        </Menu.Button>
                        <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg">
                          <Menu.Item>
                            <DropdownLink className="dropdown-link" href="/profile">
                              Profile

                            </DropdownLink>
                          </Menu.Item>

                          <Menu.Item>
                            <DropdownLink className="dropdown-link" href="/order-history">
                                Order history

                            </DropdownLink>
                          </Menu.Item>
                          <Menu.Item>
                            <DropdownLink className="dropdown-link" href="/#" onClick={logoutClickHandler}>
                              logout

                            </DropdownLink>
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                  :
                  (
                    <Link href="/login" legacyBehavior>
                       <a className='p-2'>login</a>
                  </Link>
                  )
                
                }
                 
              </div>
            </nav>

        </header> 
        <main className='container m-auto mt-4 px-4'>

            {children}

        </main>
        <footer className='flex h-10 justify-center items-center shadow-inner'>
            footer

        </footer>

    </div>
    
    </>
  )
}

export default Layout