import { GoogleSpreadsheet } from 'google-spreadsheet'
import {fromBase64} from '../../utils/base64'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)//url da planilha
//Ta no cslcsl

export default async(req, res) =>{ //Na comunicação http temos require e response por padrão já aceita um async   
    try{
        await doc.useServiceAccountAuth({
            client_email: process.env.SHEET_CLIENT_EMAIL,
            private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
        })
        await doc.loadInfo() //to pedindo para carregar as informações da planilha

        const sheet = doc.sheetsByIndex[2] //Peguei a terceira. O doc. pode pega planilhas de diversas formas, como id, count. Mas a melhor é o index
        await sheet.loadCells('A3:B2') //Intervalo celular

        const mostrarPromocaoCell = sheet.getCell(2, 0) //Pega a celula 1, coluna 0. Mas só pode pega a celula que recebeu o load
        const textoCell = sheet.getCell(2, 1)
    
        res.end(JSON.stringify({
            showCoupon: mostrarPromocaoCell.value === 'VERDADEIRO', //se o cupom for igual a verdadeiro
            message: textoCell.value
        }))
    } catch(err){ //Se não der erro, irá mostra nada.
        res.end(JSON.stringify({
            showCoupon: false,
            message: ''
        }))
    }
    
}