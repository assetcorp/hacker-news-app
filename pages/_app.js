/* eslint-disable react/prop-types */
import React from 'react'
import '../src/app.css'
// Components
import App from 'next/app'
import WebApp from '../src/components/App'
import MainApp from '../src/components/MainApp'
import Header from '../src/components/Header'

const NewsApp = ( { Component, pageProps, router } ) => {

  const AppComponent = (
    <WebApp>
      <Header />
      <MainApp>
        <Component {...pageProps} />
      </MainApp>
    </WebApp>
  )

  // eslint-disable-next-line no-undef
  return (
    <div>
      {AppComponent}
    </div>
  )
}

NewsApp.getInitialProps = async ( appContext ) => {
  const appProps = await App.getInitialProps( appContext )
  return { ...appProps }
}

export default NewsApp
