import fetch from "node-fetch";

export const Steam = (query) => {
    return new Promise((resolve, reject) => {
        if (!query) {
            reject("Query is required");
        }
        fetch(`https://store.steampowered.com/api/storesearch/?cc=us&l=en&term=${query}`)
            .then((res) => res.json())
            .then((data) => {
                return resolve(data.items.map((item) => {
                    let platforms = [];
                    if (item?.platforms?.windows) {
                        platforms.push("windows");
                    }
                    if (item?.platforms?.mac) {
                        platforms.push("mac");
                    }
                    if (item?.platforms?.linux) {
                        platforms.push("linux");
                    }

                    return ({
                        name: item?.name || "N/A",
                        price: (item?.price?.final || 100) / 100,
                        original: (item?.price?.initial || 100) / 100,
                        image: item?.tiny_image || item?.small_capsule || item?.large_capsule || item?.header_image || item?.large_capsule || item?.small_logo || item?.logo,
                        offer: item.offer || false,
                        platforms: platforms,
                        link: `https://store.steampowered.com/app/${item.id}`,
                        store: "Steam",
                    });
                }));
            })
            .catch(err => {
                console.log("Steam Error")
                console.log(err)
                resolve([])
            })
    });
}

//Steam("fantasy").then(console.log).catch(console.error)

/*
RAW APi DATA

{
  type: 'app',
  name: 'FINAL FANTASY XIV Online',
  id: 39210,
  price: { currency: 'USD', initial: 1999, final: 1999 },
  tiny_image: 'https://cdn.akamai.steamstatic.com/steam/apps/39210/capsule_231x87.jpg?t=1711488174',
  metascore: '83',
  platforms: { windows: true, mac: false, linux: false },
  streamingvideo: false
}
*/