import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <div className='flex flex-row '>
    <div className=' h-full min-h-screen flex flex-col w-1/6 bg-gray-200 pt-20 space-y-4 px-5'>
          <a href='/product-list' className='cursor-pointer'>
                  Products
          </a>
          <a href='/cart-list' className='cursor-pointer'>
                  Carts
          </a>
    </div>
    <div className='pt-20 pl-10 pb-10'>
    <Component {...pageProps} />
    </div>
  </div>
}

export default MyApp
