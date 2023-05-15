import React from 'react';
import Link from 'next/link';

const Header = () =>{
    return(
        <React.Fragment>{/* Serve apenas para agrupar. Mas não faz uma div nova */}
            <header className='wrapper'>
                <div className='header'>
                    <Link href='/'>
                        <a>
                            <img className="logo" src='/Logo.jpg' alt='Logo'/>
                        </a>
                    </Link>
                </div>
            </header>
            <div className='menu'>
                <Link href='/sobre'>
                    <a className='ancora'>Sobre</a>
                </Link>
                <Link href='/contato'>
                    <a className='ancora'>Contato</a>
                </Link>
                <Link href='/pesquisa'>
                    <a className='ancora'>Pesquisa</a>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default Header;
