import express from "express";

import { Epic } from "./sites/epicgames.js";
import { Gamivo } from "./sites/gamivo.js";
import { HumbleBundle } from "./sites/humblebundle.js";
import { IndieGala } from "./sites/indiegala.js";
import { ItchIO } from "./sites/itch.js";
import { Kinguin } from "./sites/kinguin.js";
import { Steam } from "./sites/steam.js";
import { GoG } from "./sites/gog.js";

const SearchGame = (query) => {
    return new Promise(async (resolve, reject) => {
        if (!query) {
            reject("Query is required");
        }
        let result = [];
        let data;

        data = await Steam(query).catch(console.error)
        if(data){
            if(data.length >= 1){
                result.push(data[0])
            }
            if(data.length >= 2){
                result.push(data[1])
            }
        }
        

        data = await HumbleBundle(query).catch(console.error)
        if(data){
            if(data.length >= 1){
                result.push(data[0])
            }
            if(data.length >= 2){
                result.push(data[1])
            }
        }

        data = await ItchIO(query).catch(console.error)
        if(data){
            if(data.length >= 1){
                result.push(data[0])
            }
            if(data.length >= 2){
                result.push(data[1])
            }
        }

        data = await Epic(query).catch(console.error)
        if(data){
            if(data.length >= 1){
                result.push(data[0])
            }
            if(data.length >= 2){
                result.push(data[1])
            }
        }

        data = await Kinguin(query).catch(console.error)
        if(data){
            if(data.length >= 1){
                result.push(data[0])
            }
            if(data.length >= 2){
                result.push(data[1])
            }
        }

        data = await IndieGala(query).catch(console.error)
        if(data){
            if(data.length >= 1){
                result.push(data[0])
            }
            if(data.length >= 2){
                result.push(data[1])
            }
        }

        data = await Gamivo(query).catch(console.error)
        if(data){
            if(data.length >= 1){
                result.push(data[0])
            }
            if(data.length >= 2){
                result.push(data[1])
            }
        }

        data = await GoG(query).catch(console.error)
        if(data){
            if(data.length >= 1){
                result.push(data[0])
            }
            if(data.length >= 2){
                result.push(data[1])
            }
        }

        return resolve(result);
    });
}

//SearchGame("Farcry").then(console.log).catch(console.error)


const app = express();

app.get("/", (req, res) => {
    res.send("Working!");
});
app.get("/search/", (req, res) => {
    if (!req.query.q) {
        res.status(400).send("Query is required");
    }
    //console.log(req.query.q)
    SearchGame(req.query.q).then((data) => {
        res.json(data);
    }).catch((err) => { 
        res.status(500).send(err);
    });
})

app.listen(process.env.PORT || 80, () => { //443 https
    console.log("Server is online");
})