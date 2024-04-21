import * as Cheerio from "cheerio";
import fetch from "node-fetch";

export const IndieGala = (query) => {
    return new Promise((resolve, reject) => {
        if (!query) {
            reject("Query is required");
        }
        fetch("https://www.indiegala.com/search/query", {
            "headers": {
                "accept": "application/json",
                "accept-language": "en-US,en;",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "Referer": "https://www.indiegala.com/store",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": JSON.stringify({
                input_string: query,
            }),
            "method": "POST"
        }).then((res) => res.json()).then(data => {
            const $ = Cheerio.load(data.html);

            const result = []

            $(".results-item").map((i, el) => {
                const link = "https://www.indiegala.com" + $(el).find("figure").find("a").attr("href");
                const image = $(el).find("figure").find("a").find("img").attr("src");
                const name = $(el).find("div").find("a").text();
                let price = $(el).find(".price").find("div").find("div").find("strong").text();

                if(price === "SHOWCASE"){
                    price = "N/A"
                }
                
                result.push({
                    name: name,
                    image: image,
                    link: link,
                    price: price,
                    original: "N/A",
                    offer: false,
                    platforms: [],
                    store: "IndieGala",
                })
            })
            .catch(err => {
                console.log("IndieGala Error")
                console.log(err)
                resolve([])
            });

            return resolve(result)
        });
    });
}

//IndieGala("fantasy").then(console.log).catch(console.log)