const axios = require('axios');
const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

const { findConnections, sendMessage } = require('../webSocket');

module.exports = {

async index (request, response){
    const devs = await Dev.find();
    return response.json(devs);
},


async store (request, response) {
    const { github_username, techs, latitude, longitude} = request.body;

    let dev = await Dev.findOne({ github_username});

    if(!dev){
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio } = apiResponse.data;
    
        const techsArray = parseStringAsArray(techs);
        
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };
    
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });

        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray,
        );
        
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return response.json(dev);
},

async update(request, response) {
    const {github_username,name, bio, techs, location} = request.body;

    let dev = await Dev.findOne({github_username});

    if(!dev)
    {
        const techsArray = parseStringAsArray(techs);
        
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        dev = await Dev.update({
            name,
            bio,
            techs: techsArray,
            location: location,
        })
    }
    return response.json(dev);

},

async destroy(request, response) {
    const {user} = request.params;
    console.log(user);

    Dev.deleteOne({github_username: user}, (err) => {
        if (err) return handleError(err);
    } );
    return response.json(Dev);
},

};