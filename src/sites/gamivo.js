import fetch from "node-fetch";

export const Gamivo = (query) => {
    return new Promise((resolve, reject) => {
        if (!query) {
            reject("Query is required");
        }
        fetch("https://search.gamivo.com/_search/", {
            "headers": {
                "accept": "application/json",
                "content-type": "application/json",
                "Referer": "https://www.gamivo.com/",
            },
            "body": JSON.stringify({
                from: 0,
                size: 6,
                sort: [
                    { inStock: 'desc' },
                    { preorderOrPrepurchase: 'desc' },
                    { popularity: 'desc' },
                    '_score'
                ],
                query: {
                    bool: {
                        must: [],
                        filter: [],
                        should: [
                            {
                                match:{
                                    name: {
                                        query: query,
                                        operator: "and",
                                        fuzziness: "2",
                                        prefix_length: 3,
                                        zero_terms_query: "all"
                                    }
                                }
                            },
                            {
                                "match":{
                                    "name.dehyphen": {
                                        query: query,
                                        operator: "and",
                                        fuzziness: "2",
                                        prefix_length: 3,
                                        zero_terms_query: "all"
                                    }
                                }
                            }
                        ],
                        minimum_should_match: 1
                    }
                },
                    post_filter: {
                        bool: {
                            filter: []
                        }
                    },
                    aggs: {}
            }),
            "method": "POST"
        })
            .then((res) => res.json())
            .then((data) => {
                const results = []

                data.hits.hits.forEach((item) => {
                    const image = `https://cdn-cf.gamivo.com/image_cartcover.jpg?f=${item?._source?.cover?.id}&n=${item?._source?.cover?.filename}&h=${item?._source?.cover?.version}`
                    results.push({
                        name: item._source.name,
                        price: item._source.lowestPrice,
                        original: item._source.officialPrice,
                        image: image,
                        offer: (item._source.officialPrice > item._source.lowestPrice),
                        platforms: [],
                        link: `https://www.gamivo.com/product/${item._source.slug}`,
                        store: "Gamivo",
                    })
                    //console.log(item._source.platforms)
                })
                return resolve(results)
            })
            .catch(err => {
                console.log("HumbleBumble Error")
                console.log(err)
                resolve([])
            });
    });
}

//Gamivo("Far cry").then(console.log).catch(console.error)


/*
RAW API DATA

{
    _index: 'app_prod_2024-04-21-120003',
    _id: '121304',
    _score: 33.597496,
    _source: {
        name: 'Song of Farca EN/RU/ZH Global Steam Gift',   
        displayName: 'Song of Farca EN/RU/ZH Global Steam Gift',
        releaseDate: '2021-07-22',
        releaseDateTimestamp: 1626912000,
        slug: 'song-of-farca-steam-gift',
        metacriticValue: 0,
        preorder: false,
        prePurchase: false,
        preorderOrPrepurchase: false,
        productType: [Object],
        lowestPrice: 5.47,
        officialPrice: 16.79,
        lowestWholesalePrice: 0,
        inStock: true,
        popularity: 0,
        cover: {
            id: 497874,
            filename: '10a18f97-9286-483d-8be4-125007c98d1d.jpg',
            version: '84d6925ba68360ba733b48ca82f06039'
        },,
        platform: [Object],
        platforms: [Array],
        region: [Object],
        genres: [Array],
        collections: [],
        languages: [Array],
        offers: [Array],
        countries: [Array],
        smartPrice: 4.1
    },
    sort: [ 1, 0, 0, 33.597496 ]
}
*/