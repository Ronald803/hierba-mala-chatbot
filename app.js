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

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])
const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)
const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

// const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
//     .addAnswer('🙌 Hola bienvenid@ a *Hierba Mala*')
//     .addAnswer(
//         [
//             'te comparto los siguientes botones de interes sobre la Herboristeria',
//             '👉 *doc* para ver la documentación',
//             '👉 *gracias*  para ver la lista de videos',
//             '👉 *discord* unirte al discord',
//         ],
//         null,
//         null,
//         [flowDocs, flowGracias, flowTuto, flowDiscord]
//     )

const flowPanetonChocolate = addKeyword(['Chocolate Paneton']).addAnswer(
    [
        '📄 Elegiste el sabor Chocolate',
        '📄 Cuantos panetones desea ordenar?'
    ],
    []
)
const flowPanetonVanilla = addKeyword(['Vanilla', 'vainilla', 'vainila','sabor vainila']).addAnswer(
    [
        '📄 Elegiste el sabor Vainilla',
        '📄 Cuantos panetones desea ordenar?'
    ],
    null,
    []
)
const flowPanetones = addKeyword(['Panetones', 'paneton', 'panetones','Paneton']).addAnswer(
    [
        '📄 Elige el sabor de Paneton que te guste',
        '📄 Paneton de *Chocolate*',
        '📄 Paneton de *Vainilla*',
    ],
    null,
    [flowPanetonChocolate,flowPanetonVanilla]
)
const flowRoscaChocolate = addKeyword(['Chocolate Rosca']).addAnswer(
    [
        '📄 Elegiste el sabor Chocolate',
        '📄 Cuantas Roscas desea ordenar?'
    ],
    null,
    []
)
const flowRoscaVanilla = addKeyword(['Vanilla', 'vainilla', 'vainila','sabor vainila']).addAnswer(
    [
        '📄 Elegiste el sabor Vainilla',
        '📄 Cuantos Roscas desea ordenar?'
    ],
    null,
    []
)
const flowRoscas = addKeyword(['Roscas', 'rosca']).addAnswer(
    [
        '📄 Elige el sabor de Rosca que te guste',
        '📄 Rosca de *Chocolate*',
        '📄 Rosca de *Vainilla*'
    ],
    
    null,
    [flowRoscaChocolate,flowRoscaVanilla]
)
const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenid@ a *Hierba Mala*')
    .addAnswer(
            [
                'te comparto las siguientes opciones de interes sobre la Herboristeria',
                '👉 *Panetones*',
                '👉 *Roscas*',
                '👉 *Panetones y Roscas*',
            ],
            null,
            null,
            [flowDocs,flowPanetones,flowRoscas]
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
