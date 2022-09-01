import React from 'react';

const Footer = () => {
    return(
        <div className='footerdev'>
            <div className='footer'>
                <p><a href={'https://api.whatsapp.com/send?phone=45998230308&text=Meu%20Cupom'} target='_blank'><img alt='whatsapp' src='/whatsapp.png' className='whatsapp' /> Nosso Contato:  (45)99823-0308</a></p>
            </div>
            <div className='desenvolvedor'>
                <div className=''>
                    Projeto desenvolvido por:
                    Christopher Lopes / {' '} 
                    <a className='meucontato' href="https://www.linkedin.com/in/christopher-lopes/">linkedin</a> /
                    <a className='meucontato' href="https://github.com/ChristopherSLopes">gitHub</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;

