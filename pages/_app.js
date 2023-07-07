import "@/styles/globals.css";
import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Router from "next/router";
import Loader from "@/components/Loader";
import store from "@/store/store";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import {SessionProvider} from 'next-auth/react';


export default function App({ Component, pageProps, session }) {
  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();

  Router.events.on("routeChangeStart", (url) => {
    setPageLoading(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    setPageLoading(false);
  });
  return (
    <React.Fragment>
      <Head>
        <title>Branded t-shirts</title>
        <meta name="description" content="onine Bewry" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          {!router.pathname.includes("/dashboard") && <Header />}

          {pageLoading && <Loader />}
          <Component {...pageProps} />
          <Footer />
        </Provider>
      </SessionProvider>
    </React.Fragment>
  );
}
