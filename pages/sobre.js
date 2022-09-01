import React from 'react';
import PageTitle from './components/PageTitle'

const Sobre = () => {
    return(
        <div>
            <PageTitle title='Sobre Nós'/>
            <h1 className='titulo'>Sobre</h1>
            <p>Nascemos da vontade de criar uma exelente experiencia para nossos clientes</p>
            <p>Em 2020 Fulano da silva teve sentiu falta de um ambiente familiar em que possa levar sua familia para comer uma comida saborosa.</p>
            <p>Então ele criou a Restaurante PalpiteBox para entregar esse ambiente familiar para sua familia.</p>
        </div>
    )
}

export default Sobre;
