import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children }) => {
    return(
        <div className='layout'>
            <Header />
            <div className='container mx-auto'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;