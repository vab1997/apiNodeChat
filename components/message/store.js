const Model = require('./model')


function addMessage(message) {
    const myMessage = new Model(message)
    myMessage.save()
}

async function getMessages(filterUser) {
    let filter = {}

    if(filterUser !== null){
        filter = {user: filterUser}
    }

    const messages = await Model.find(filter)
    return messages
}

async function updateMessage(id, message) {
    const foundMessage = await Model.findOne({_id: id})

    foundMessage.message = message
    const newMessage = await foundMessage.save()
    return newMessage
}

function removeMessage(id) {
    return Model.deleteOne({_id: id})
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateMessage: updateMessage,
    remove: removeMessage
}