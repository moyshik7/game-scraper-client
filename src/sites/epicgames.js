import fetch from "node-fetch";

export const Epic = (query) => {
    return new Promise((resolve, reject) => {
        if (!query) {
            reject("Query is required");
        }
        fetch(`https://store.epicgames.com/graphql?operationName=searchStoreQuery&variables=%7B%22allowCountries%22:%22BD%22,%22category%22:%22games%2Fedition%2Fbase%7Cbundles%2Fgames%7Cgames%2Fedition%7Ceditors%7Caddons%7Cgames%2Fdemo%7Csoftware%2Fedition%2Fbase%7Cgames%2Fexperience%22,%22count%22:40,%22country%22:%22BD%22,%22keywords%22:%22${query}%22,%22locale%22:%22en-US%22,%22sortBy%22:%22relevancy,viewableDate%22,%22sortDir%22:%22DESC,DESC%22,%22tag%22:%22%22,%22withPrice%22:true%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%227d58e12d9dd8cb14c84a3ff18d360bf9f0caa96bf218f2c5fda68ba88d68a437%22%7D%7D`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9,bn;q=0.8",
                "priority": "u=1, i",
            },
            "referrer": "https://store.epicgames.com/en-US/",
            "method": "GET",
        }).then((res) => res.json())
        .then(res => {
            const a = res.data.Catalog.searchStore.elements[0]
            //console.log(res.data.Catalog.searchStore.elements)
            return resolve(res.data.Catalog.searchStore.elements.map((item) => {
                if(!item?.productSlug){
                    return null
                }
                const result = {
                    name: item?.title || "N/A",
                    price: (item?.price?.totalPrice?.discountPrice || 100) / 100,
                    original: (item?.price?.totalPrice?.originalPrice || 100) / 100,
                    image: item?.keyImages[0]?.url || item?.keyImages[1]?.url || item?.keyImages[2]?.url || item?.keyImages[3]?.url,
                    offer: (item.price.totalPrice.discountPrice > 0),
                    platforms: [],
                    link: `https://www.epicgames.com/store/en-US/p/${item?.productSlug}`,
                    store: "Epic Games",
                }
                return result
            }))
        })
        .catch(err => {
            console.log("EpicGames Error")
            console.log(err)
            resolve([])
        })
    });
}

//Epic("Fortnite").then(console.log).catch(console.error)


/*
RAW API DATA
{
    title: 'Guardians of the Galaxy Pack',
    id: '910aa64abd964b018e957439c429c599',
    namespace: 'fn',
    description: "Do something good? Something bad? Maybe a bit of both. They're the Guardians of the Galaxy Pack. Includes 3 Outfits (with LEGO® Styles), 3 Back Blings, 3 Pickaxes and 2 Emotes.",
    effectiveDate: '2024-03-29T00:00:00.000Z',
    isCodeRedemptionOnly: false,
    keyImages: [ [Object], [Object], [Object], [Object], [Object] ],
    currentPrice: 2899,
    seller: { id: 'o-aa83a0a9bc45e98c80c1b1c9d92e9e', name: 'Epic Games' },
    productSlug: null,
    urlSlug: 'fortnite--guardians-of-the-galaxy-pack',
    url: null,
    tags: [],
    items: [ [Object] ],
    customAttributes: [ [Object] ],
    categories: [ [Object], [Object], [Object] ],
    catalogNs: { mappings: [Array] },
    offerMappings: [ [Object] ],
    developerDisplayName: 'Epic Games',
    publisherDisplayName: 'Epic Games',
    price: { totalPrice: [Object], lineOffers: [Array] },
    prePurchase: null,
    releaseDate: '2024-03-29T00:00:00.000Z',
    pcReleaseDate: '2024-03-29T00:00:00.000Z',
    viewableDate: '2024-03-29T00:00:00.000Z',
    approximateReleasePlan: null
}
*/