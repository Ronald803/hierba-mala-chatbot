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
            flowDynamic('Perfecto, si deseas ordenar algo más escribe *Volver*')
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
            flowDynamic('Perfecto, si deseas ordenar algo más escribe *Volver*')
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
            flowDynamic('Perfecto, si deseas ordenar algo más escribe *Volver*')
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
            flowDynamic('Perfecto, si deseas ordenar algo más escribe *Volver*')
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
