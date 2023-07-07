import React from 'react'
import { getSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link';

const login = () => {

return (
<div className="bg-white">
      <div className="mx-auto max-w-7xl text-center">
        <div className="text-center relative isolate overflow-hidden  px-6 pt-16 shadow-2xl sm:px-16 md:pt-24 lg:px-24 lg:pt-0 md:py-10 py-5">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#FFA500" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:py-32">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Want to access Dashboard?
              <br />
            Login with admin account.
            </h2>
           
            <div className="mt-10 flex items-center justify-center gap-x-6 ">
              <button
              onClick={()=>signIn()}
               
                className="rounded-md bg-gray-300 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Admin Login
              </button>
              <Link href="/" className="text-sm font-semibold leading-6 text-gray-600">
                Home <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
         
        </div>
      </div>
    </div>
)
}

export default login

export async function getServerSideProps(context) {
   
    const session  = await getSession(context);
  
    if(session?.user?.email == process.env.NEXT_PUBLIC_EMAIL_ADMIN){
        return{
          redirect:{
            destination:'/dashboard'
          }
        }
    }
    if(session){
      return{
        redirect:{
          destination:'/'
        }
      }
    }

    return {
      // Passed to the page component as props
      props: { session },
    };
  }