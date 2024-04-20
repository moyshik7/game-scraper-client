import { Epic } from "./sites/epicgames.js";
import { HumbleBundle } from "./sites/humblebundle.js";
import { ItchIO } from "./sites/itch.js";
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

        return resolve(result);
    });
}

SearchGame("fantasy").then(console.log).catch(console.error)