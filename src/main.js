import { Epic } from "./sites/epicgames.js";
import { Gamivo } from "./sites/gamivo.js";
import { HumbleBundle } from "./sites/humblebundle.js";
import { IndieGala } from "./sites/indiegala.js";
import { ItchIO } from "./sites/itch.js";
import { Kinguin } from "./sites/kinguin.js";
import { Steam } from "./sites/steam.js";

const SearchGame = (query) => {
    return new Promise(async (resolve, reject) => {
        if (!query) {
            reject("Query is required");
        }
        let result = [];
        let data;

        data = await Steam(query).catch(console.error)
        if(data.length > 1){
            result.push(data[0])
        }

        data = await HumbleBundle(query).catch(console.error)
        if(data.length > 1){
            result.push(data[0])
        }

        data = await ItchIO(query).catch(console.error)
        if(data.length > 1){
            result.push(data[0])
        }

        data = await Epic(query).catch(console.error)
        if(data.length > 1){
            result.push(data[0])
        }

        data = await Kinguin(query).catch(console.error)
        if(data.length > 1){
            result.push(data[0])
        }

        data = await IndieGala(query).catch(console.error)
        if(data.length > 1){
            result.push(data[0])
        }

        data = await Gamivo(query).catch(console.error)
        if(data.length > 1){
            result.push(data[0])
        }

        return resolve(result);
    });
}

SearchGame("Farcry").then(console.log).catch(console.error)