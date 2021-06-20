let users = [];

function joinUser(socketId, userName, roomName){
    const user = {
        socketID: socketId,
        roomname: roomName,
        username: userName
    }
    users.push(user)
    return user
}

function removeUser(id){
    const getID = users => users.socketID === id;
    const index = users.findIndex(getID);
    if(index !== -1){
        return users.splice(index,1)[0];
    }
}
module.exports= {joinUser, removeUser}