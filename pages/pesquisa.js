import React, {useState} from 'react';
import PageTitle from './components/PageTitle'

const Pesquisa = () => {
    const [ form, setForm ] = useState({ //Apenas colocaos o formulario em um useState
        Nome : '',
        Whatsapp : '',
        Nota : 0
    })
    const notas = [0, 1, 2, 3, 4, 5]
    const [ sucess, setSuccess ] = useState(false)
    const [ retorno, setRetorno ] = useState({})
    const save = async () =>{
        try{
            const response = await fetch('/api/save', { //O response é a resposta do fetch, o fetch sempre retorna uma resposta.
                method: 'POST',
                body: JSON.stringify(form)
            }) //para enviar
            const data = await response.json() //data pega os dados como json. Talbem como processo assima.
            setSuccess(true)
            setRetorno(data)
        } catch(err) {
            console.log(err);
        }
    }
    const onChange = evt =>{
        const value = evt.target.value  //Como é um evento sintetico,
        const key = evt.target.name 
        setForm(old => ({
            ...old, //Pega as informações antigas.
            [key] : value
        }))
    }
    return(
        <div>
            <PageTitle title='Pesquisa'/>
            <h1 className='titulo'>Criticas e sugestões</h1>
            <p>
                O restaurante x estara sempre em busca por atender melhor seus clientes.<br/>
                Por isso, estamos sempre abertos a ouvir a sua opinião.
            </p>
            { !sucess && <div className='form'>
                <label className='label'>Seu Nome:</label>
                <input type='text' className='input' placeholder='Nome' onChange={onChange} name='Nome' value={form.Nome}  required />
                <label className='label'>Whatsapp:</label>
                <input type='tel' className='input' placeholder='Whatsapp' onChange={onChange} name='Whatsapp' value={form.Whatsapp}  required/>
                <label className='label'>Sugestões e comentários:</label>
                <textarea className='input' cols='35' rows='8' onChange={onChange} name='Comentario' value={form.Comentario}></textarea>

                <label className='label'>Nota:</label>
                <div className='divRadio'>
                {notas.map(nota => {
                    return (
                        <label className='label'>
                            {nota} <br/>
                            <input type='radio' name='Nota' value={nota} onChange={onChange}/>
                        </label>
                    )
                })}
                </div>
                <button className='button' onClick={save}>Salvar</button>

            </div> /* se não tiver cupom ainda, mostra esse, se não, mostre o cupom*/}
            { sucess && <div className='div-cupom'> 
                <p className='cupom-blue'>Obrigado por contribuir com sua sugestão.</p>
                {
                    retorno.showCoupom && 
                    <div className='cupom-div'>
                        Seu Cupom:<br/>
                        <span className='text-cupom'>{retorno.Cupom}</span>
                    </div>
                }
                {/*cupom-blue  promocao-cupom   text-cupom*/
                    retorno.showCoupom && 
                    <div className='cupom-div'>
                        <span className='promocao-cupom'>{retorno.Promo}</span>
                        <br/>
                        <span>Tire um print ou foto desta tela e apresente ao garçon</span>
                    </div>
                }
            </div>}
        </div>
    )
}

export default Pesquisa;
