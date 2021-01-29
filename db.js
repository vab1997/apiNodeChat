const db = require('mongoose');

db.Promise = global.Promise;

async function connect(url) {
    try {
        await db.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('[db] Conectada con exito')
    } catch (error) {
        console.log('[db] Error al conectar db')
        console.log(error)
    }
}

module.exports = connect