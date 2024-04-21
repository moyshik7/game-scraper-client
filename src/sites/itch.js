import * as Cheerio from "cheerio";
import fetch from "node-fetch";

export const ItchIO = (query) => {
    try {
    return new Promise((resolve, reject) => {
        if (!query) {
            reject("Query is required");
        }
        fetch(`https://itch.io/search?q=${query}`)
            .then((res) => res.text())
            .then((data) => {
                const $ = Cheerio.load(data);
                const result = []
                $(".game_grid_widget > .game_cell").map((i, el) => {
                    result.push({
                        name: $(el).find(".game_title").text(),
                        image: $(el).find(".game_thumb").find("a").find("img").attr("data-lazy_src"),
                        link: $(el).find(".game_thumb").find("a").attr("href"),
                        price: "N/A",
                        original: "N/A",
                        offer: false,
                        platforms: [],
                        store: "Itch.io",
                    })
                })
                return resolve(result);
            })
            .catch(err => {
                console.log("itch.io Error")
                console.log(err)
                resolve([])
            });
    });
    } catch (err){
        console.log(err)
    }
}

//ItchIO("fantasy").then(console.log).catch(console.error)
