import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { useEffect } from 'react';
import Script from "next/script";

export default function App({ Component, pageProps }) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  if (Component.getLayout) {
    return Component.getLayout(
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
        </Head>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"
        />
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </>
    )
  }

  return (<>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
      crossOrigin="anonymous"
    />
    <SessionProvider session={pageProps.session}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  </>)
}
