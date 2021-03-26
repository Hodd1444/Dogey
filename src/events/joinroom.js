module.exports = async function joinroom(client) {
    //Gets the top room and joins it
    const rooms = await client.rooms.top;
    const topRoom = rooms[0];
    await client.rooms.join(topRoom).catch(err => console.log(err))
}