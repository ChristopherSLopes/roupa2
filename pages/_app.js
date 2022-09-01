import React from 'react';
import Layout from '../pages/components/Layout';
import './reset.css'
import './style.css'

const MyApp = ({Component, pageProps}) => {
    return(
        <Layout>
            <Component {...pageProps}/>{/* Esse é um children do layout*/}
        </Layout>
    )
}

export default MyApp;