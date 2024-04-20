import fetch from "node-fetch";

export const Kinguin = (query) => {
    return new Promise((resolve, reject) => {
        if (!query) {
            reject("Query is required");
        }
        fetch(`https://www.kinguin.net/services/library/api/v1/products/search?store=kinguin&phrase=${query}&size=5&visible=1&sort=bestseller.total,DESC`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9,bn;q=0.8",
                "cfipcountry": "BD",
                "guest-user-id": "1pp95k9dd49g8g3nzybtvtv9lhjoh1",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "cookie": "cf_clearance=3",
                "Referer": "https://www.kinguin.net/",
                "Referrer-Policy": "strict-origin"
            },
            "body": null,
            "method": "GET"
        }).then((res) => res.json())
        .then(data => {
            return resolve(data._embedded.products.map((item) => {
                return ({
                    name: item?.name || "N/A",
                    price: (item?.price?.lowestOffer || 100) / 100,
                    original: (item?.price?.market || 100) / 100,
                    image: item?.imageUrl || item?.hiImageUrl,
                    offer: ((item?.price?.discount || 0) > 1),
                    platforms: item?.attributes?.platforms || [],
                    link: `https://www.kinguin.net/${item?.attributes?.urlKey}`,
                    store: "Kinguin",
                });
            }))
        })
    });
}

//Kinguin("fantasy").then(console.log).catch(console.error)

/*
RAW APi DATA

{
    id: '65f155b2a7abc9c87e74c2d6',
    vendor: 'kinguin',
    name: 'Fallout 2: A Post Nuclear Role Playing Game GOG CD Key (valid till May, 2024)',
    externalId: '221963',
    imageUrl: 'https://static.kinguin.net/media/catalog/category/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/header_292x136_2052_1.jpg',
    hiImageUrl: 'https://static.kinguin.net/media/catalog/category/cache/1/hi_image/9df78eab33525d08d6e5fb8d27136e95/fallout28_1.jpg',
    attributes: {
      platform: 15,
      platforms: [Array],
      genres: [Array],
      region: [Object],
      metascore: 86,
      parentCategoryId: 37711,
      languages: [Array],
      systems: [Array],
      types: [Array],
      edition: 'Standard',
      bundle: false,
      keywords: 'Fallout 2: A Post Nuclear Role Playing Game GOG CD Key (valid till May, 2024) gog.com II  FO2 F2',
      urlKey: 'fallout-2-a-post-nuclear-role-playing-game-gog-cd-key-valid-till-may-2024',
      releaseDate: '1998-12-01',
      displayMode: 'products',
      isKinguinWebsite: true,
      marketingProductType: 'GAME',
      igdbTags: [Array],
      pegi: 16,
      seo: [Object]
    },
    price: { lowestOffer: 27, discount: 97, market: 1039, calculated: 27 },
    seller: { name: 'StarStore' },
    active: true,
    delivery: [ 2 ],
    categories: [ 1, 2, 349, 37711, 221963 ],
    visible: true,
    checkoutTypes: [ 'buyNow' ],
    offerId: '661091f324337c0001787472',
    wholesale: { enabled: true, lowestPrice: 43 },
    names: {},
    tags: [],
    isFinal: true,
    breadcrumbs: [ [Object], [Object], [Object], [Object], [Object] ],    
    isDeleted: false,
    createDate: '2024-03-13T07:28:50.319',
    _links: { self: [Object], product: [Object] }
  }
*/