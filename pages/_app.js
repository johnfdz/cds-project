import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.min.js');
  }, []);
  
  if (Component.getLayout) {
    return Component.getLayout(
      <>
        <Head>
        </Head>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </>
    )
  }

  return (<>
    <Head>     
    </Head>
    <SessionProvider session={pageProps.session}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  </>)
}
