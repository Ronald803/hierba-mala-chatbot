//_____________________________________________
const express       = require('express');
//____________________________________________

const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


//________________________________________________
// const app = express();
// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/index.html')
// })
// app.listen(4000)
//________________________________________________
let infoMsg = { number:0,nickname:"",clientName:"" }
const flowPanetonChocolate = addKeyword(['Chocolate Paneton','chocolate','choco','Paneton Chocolate'])
    .addAnswer(
        [
            '📄 Elegiste el sabor Chocolate',
            '📄 Cuantos panetones desea ordenar?'
        ],{
            media:'https://www.chocolatenegro.info/contenidos/imagenes/panettone-con-chocolate.jpg'
        }
    )
    .addAnswer(
        '¿Cuantos panetones deseas?',
        {
            capture: true,
        },
        async (ctx, { flowDynamic, state }) => {
            await state.update({ cantidad: ctx.body, all: ctx })
            flowDynamic('Gracias por tu nombre!')
            const myState = state.getMyState()
            infoMsg.number = myState.from
            infoMsg.name = myState.name
            infoMsg.nickname = myState.pushName
            console.log(myState.name)
            console.log(myState);
            console.log(infoMsg);
        }
    )

const flowPanetonClasico = addKeyword(['Paneton Clasico','clasico','clasico paneton','clásico']).addAnswer(
    [
        '📄 Elegiste el Paneton Clasico',
        '📄 Cuantos panetones desea ordenar?'
    ],
    {
        media:'https://ichef.bbci.co.uk/news/640/cpsprodpb/139ED/production/_110256308_panetn.jpg'
    },
    null,
    []
)
const flowPanetones = addKeyword(['Panetones', 'paneton', 'panetones','Paneton']).addAnswer(
    [
        '📄 Elige el sabor de Paneton que te guste',
        '📄 Paneton de *Chocolate*',
        '📄 Paneton de *Clásico*',
    ],
    null,
    null,
    [flowPanetonChocolate,flowPanetonClasico]
)
const flowRoscaChocolate = addKeyword(['Rosca Chocolate','chocolate','chocolate rosca']).addAnswer(
    [
        '📄 Elegiste el sabor Chocolate',
        '📄 Cuantas Roscas desea ordenar?'
    ],
    {
        media:'https://www.platosplisplas.com/wp-content/uploads/2020/12/Rosca-de-mazapan-y-chocolate.jpg'
    },
    null,
    []
)
const flowRoscaClásica = addKeyword(['Rosca Clasica','clasica','clásica']).addAnswer(
    [
        '📄 Elegiste el sabor Vainilla',
        '📄 Cuantos Roscas desea ordenar?'
    ],
    {
        media:'https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2020/01/rosca-de-chocolate-y-vainilla.jpg'
    },
    null,
    []
)
const flowRoscas = addKeyword(['Roscas', 'rosca']).addAnswer(
    [
        '📄 Elige el sabor de Rosca que te guste',
        '📄 Rosca de *Chocolate*',
        '📄 Rosca de *Clásica*'
    ],
    null,
    null,
    [flowRoscaChocolate,flowRoscaClásica]
)
const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer(
            [
                '🙌 Hola bienvenid@ a *Hierba Mala*',
                'Te comparto las siguientes opciones de interes sobre la Herboristeria',
                '👉 *Panetones*',
                '👉 *Roscas*',
                '👉 *Panetones y Roscas*',
            ],
            null,
            null,         
            [flowPanetones,flowRoscas]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
