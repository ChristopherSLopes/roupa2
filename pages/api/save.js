import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'
import {fromBase64} from '../../utils/base64'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const genCupom = () =>{
    const code = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase() //Pega os numeros transforma em exadecimal
    return code.substr(0,4) + '-' + code.substr(4,4) + '-' + code.substr(8,4);
}

export default async (req, res) =>{
    try{
        await doc.useServiceAccountAuth({
            client_email: process.env.SHEET_CLIENT_EMAIL,
            private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
        })
        await doc.loadInfo() 
        const sheet = doc.sheetsByIndex[1]
        const sheetEnd = doc.sheetsByIndex[3]

        const data = JSON.parse(req.body)

        const sheetConfig = doc.sheetsByIndex[2] //Peguei a terceira. O doc. pode pega planilhas de diversas formas, como id, count. Mas a melhor é o index
        await sheetConfig.loadCells('A1:B3') //Intervalo 

        const mostrarPromocaoCell = sheetConfig.getCell(2, 0) //Pega a celula 1, coluna 0. Mas só pode pega a celula que recebeu o load
        const textoCell = sheetConfig.getCell(2, 1)

        let Cupom = ''
        let Promo = ''
        if(mostrarPromocaoCell.value === 'VERDADEIRO'){ //Se tiver verdadeiro na planilha
            //TODO: gerar cupom
            Cupom = genCupom(),
            Promo = textoCell.value
        }

        //Nome:	Email:	Whatsapp:	Cupom:	Promo:
        await sheet.addRow({
            'Nome:': data.Nome,
            'Whatsapp:': data.Whatsapp,    //O nome, email, watsapp estão entre parenteses porque tem um ':', se não tivesse o ':' podia ser sem
            'Nota:': parseInt(data.Nota),
            'Comentário:': data.Comentario,
            'Data de Preenchimento:': moment().format('DD/MM/YYYY HH:mm:ss'),
            'Cupom:': Cupom,
            'Promo:': Promo //Para saber o que foi prometido
        })
        await sheetEnd.addRow({
            'Nome:': data.Nome,
            'Whatsapp:': data.Whatsapp,    //O nome, email, watsapp estão entre parenteses porque tem um ':', se não tivesse o ':' podia ser sem
            'Nota:': parseInt(data.Nota),
            'Comentário:': data.Comentario,
            'Data de Preenchimento:': moment().format('DD/MM/YYYY HH:mm:ss'),
            'Promo:': Promo
        })
        res.end(JSON.stringify({
            showCoupom: Cupom !== '',
            Cupom,
            Promo
        }));
    } catch(err){
        console.log(err);
        res.end('error')
    }
}