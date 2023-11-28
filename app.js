//_____________________________________________
const axios = require('axios')
//____________________________________________

const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


//________________________________________________
//const url = 'http://localhost:8080';
const url = 'https://central-base-chatpi.vercel.app/'
function postClientRequestInfo (body){
    return axios.post(`${url}/api/hierbamala`,body)
}
//________________________________________________
const flowPanetonChocolate = addKeyword(['Chocolate Paneton','chocolate','choco','Paneton Chocolate'])
    .addAnswer(
        [
            '📄 Elegiste el sabor Chocolate'
        ],{
            media:'https://www.chocolatenegro.info/contenidos/imagenes/panettone-con-chocolate.jpg'
        }
    )
    .addAnswer('Si deseas ver más de nuestros productos escribe *Volver*.')
    .addAnswer(
        'Si ya estás listo para ordenar ¿Cuantos panetones de chocolate deseas?',
        {
            capture: true,
        },
        async (ctx, { flowDynamic, state }) => {
            await state.update({ name:ctx.pushName,cellphone:ctx.from,quantity: ctx.body,all: ctx })
            flowDynamic('Perfecto, si deseas ordenar algo más escribe *Volver*. Escribe *Pagar* y te enviaremos un QR para que puedas reservar tu pedido.')
            const myState = state.getMyState()
            const infoRequestClient = {
                name: myState.name,
                cellphone: myState.cellphone,
                product: 'paneton',
                flavor: 'chocolate',
                quantity: myState.quantity,
            }
            //console.log(infoRequestClient);
            await postClientRequestInfo(infoRequestClient)
                .then(answer=>{console.log(answer.data)})
                .catch(e=>{console.log(e)})
        }
    )

const flowPanetonClasico = addKeyword(['Paneton Clasico','clasico','clasico paneton','clásico'])
    .addAnswer(
        [
            '📄 Elegiste el Paneton Clasico'
        ],
        {
            media:'https://ichef.bbci.co.uk/news/640/cpsprodpb/139ED/production/_110256308_panetn.jpg'
        },
        null,
        []
    )
    .addAnswer('Si deseas ver más de nuestros productos escribe *Volver*.')
    .addAnswer(
        'Si ya estás listo para ordenar ¿Cuantos panetones clásicos deseas?',
        {
            capture: true,
        },
        async (ctx, { flowDynamic, state }) => {
            await state.update({ name:ctx.pushName,cellphone:ctx.from,quantity: ctx.body,all: ctx })
            flowDynamic('Perfecto, si deseas ordenar algo más escribe *Volver*. Escribe *Pagar* y te enviaremos un QR para que puedas reservar tu pedido.')
            const myState = state.getMyState()
            const infoRequestClient = {
                name: myState.name,
                cellphone: myState.cellphone,
                product: 'paneton',
                flavor: 'clasico',
                quantity: myState.quantity,
            }
            //console.log(infoRequestClient);
            await postClientRequestInfo(infoRequestClient)
                .then(answer=>{console.log(answer.data)})
                .catch(e=>{console.log(e)})
        }
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
const flowRoscaChocolate = addKeyword(['Rosca Chocolate','chocolate','chocolate rosca'])
    .addAnswer(
        [
            '📄 Elegiste el sabor Chocolate'
        ],
        {
            media:'https://www.platosplisplas.com/wp-content/uploads/2020/12/Rosca-de-mazapan-y-chocolate.jpg'
        },
        null,
        []
    )
    .addAnswer('Si deseas ver más de nuestros productos escribe *Volver*.')
    .addAnswer(
        'Si ya estás listo para ordenar ¿Cuántas roscas de chocolate deseas?',
        {
            capture: true,
        },
        async (ctx, { flowDynamic, state }) => {
            await state.update({ name:ctx.pushName,cellphone:ctx.from,quantity: ctx.body,all: ctx })
            flowDynamic('Perfecto, si deseas ordenar algo más escribe *Volver*. Escribe *Pagar* y te enviaremos un QR para que puedas reservar tu pedido.')
            const myState = state.getMyState()
            const infoRequestClient = {
                name: myState.name,
                cellphone: myState.cellphone,
                product: 'rosca',
                flavor: 'chocolate',
                quantity: myState.quantity,
            }
            //console.log(infoRequestClient);
            await postClientRequestInfo(infoRequestClient)
                .then(answer=>{console.log(answer.data)})
                .catch(e=>{console.log(e)})
        }
    )
const flowRoscaClásica = addKeyword(['Rosca Clasica','clasica','clásica'])
    .addAnswer(
        [
            '📄 Elegiste el sabor clásico',
        ],
        {
            media:'https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2020/01/rosca-de-chocolate-y-vainilla.jpg'
        },
        null,
        []
    )
    .addAnswer('Si deseas ver más de nuestros productos escribe *Volver*.')
    .addAnswer(
        'Si ya estás listo para ordenar ¿Cuántas roscas clásicas deseas?',
        {
            capture: true,
        },
        async (ctx, { flowDynamic, state }) => {
            await state.update({ name:ctx.pushName,cellphone:ctx.from,quantity: ctx.body,all: ctx })
            flowDynamic('Perfecto, si deseas ordenar algo más escribe *Volver*. Escribe *Pagar* y te enviaremos un QR para que puedas reservar tu pedido.')
            const myState = state.getMyState()
            const infoRequestClient = {
                name: myState.name,
                cellphone: myState.cellphone,
                product: 'rosca',
                flavor: 'clasico',
                quantity: myState.quantity,
            }
            //console.log(infoRequestClient);
            await postClientRequestInfo(infoRequestClient)
                .then(answer=>{console.log(answer.data)})
                .catch(e=>{console.log(e)})
        }
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
const flowPrincipal = addKeyword(['hola', 'ole', 'alo','volver'])
    .addAnswer(
            [
                '🙌 Hola bienvenid@ a *Hierba Mala*',
                'Te comparto las siguientes opciones de interes sobre la Herboristeria',
                '👉 *Panetones*',
                '👉 *Roscas*',
            ],
            {
                media:'https://scontent.flpb1-1.fna.fbcdn.net/v/t39.30808-6/309506057_511788110953071_2436255184347948860_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=N-ANk_3YDNUAX83r1Io&_nc_ht=scontent.flpb1-1.fna&oh=00_AfBq_5rnolwS84I9Nj2FU_FgzaRyeD3zSNCimXzH19gJgA&oe=6569D64C'
            },
            null,         
            [flowPanetones,flowRoscas]
    )
const flowPagar = addKeyword(['Pagar', 'pagar', 'pagar','pagar'])
.addAnswer(
    [
        '📄 Con este QR deposita la mitad del precio total para reservar tu pedido.'
    ],{
        media:'./unionqr.jpeg'
    },
    null,
    []
)

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowPagar])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
