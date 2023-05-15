import React from 'react'
import Head from 'next/head'

const PageTitle = ({title}) =>{
    return(
        <Head>
            <title>{title} - Gabriela Modas</title>
        </Head>
    )
}

export default PageTitle;