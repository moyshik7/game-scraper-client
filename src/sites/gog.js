import fetch from "node-fetch";

export const GoG = (query) => {
  return new Promise((resolve, reject) => {
    try{
    if (!query) {
      reject("Query is required");
    }
    fetch(
      `https://catalog.gog.com/v1/catalog?limit=10&query=like%3A${query}&order=desc%3Ascore&productType=in%3Agame%2Cpack%2Cdlc%2Cextras&page=1&countryCode=US&locale=en-US&currencyCode=USD`,
      {
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;",
        },
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log(data?.products[0])

        const result = [];
        data?.products.map((item) => {
          result.push({
            name: item?.title || "N/A",
            price: item?.price?.finalMoney?.amount || 0,
            original: item?.price?.baseMoney?.amount || 0,
            image: item?.coverHorizontal || item?.coverVertical,
            offer: item?.price?.final > item?.price?.base,
            platforms: item?.operatingSystems,
            link: item?.storeLink,
            store: "GoG",
          });
        });

        return resolve(result);
      });
    } catch (error) {
      console.error(error);
      return resolve([]);
    }
  });
};

//GoG("far cry").then(console.log).catch(console.error);

/*
RAW API DATA

{
  id: '1556019399',
  slug: 'as_far_as_the_eye',
  features: [
    { name: 'Achievements', slug: 'achievements' },
    { name: 'Cloud saves', slug: 'cloud_saves' },
    { name: 'Overlay', slug: 'overlay' },
    { name: 'Single-player', slug: 'single' }
  ],
  screenshots: [
    'https://images.gog-statics.com/3fb3d36464f0a62505d900a15392599b78b0f0814f23dced86d96b9eff785784_{formatter}.jpg',
    'https://images.gog-statics.com/f7f917cdc65e1f391cc7ed8b0eafb733082f8390f3505a703127246885dfba36_{formatter}.jpg',
    'https://images.gog-statics.com/db20ecf8d40115c0b4005afd783ea1e62df5da44aec4283725cd53f219e64eff_{formatter}.jpg',
    'https://images.gog-statics.com/b585083eca9e7575868d795c14b099667cb1336994d100e9a07f1bc56f445e1e_{formatter}.jpg',
    'https://images.gog-statics.com/045166cae50eb6a2ba838a69dcd164ea579b45edd578e627c17eeb24b27aed42_{formatter}.jpg',
    'https://images.gog-statics.com/62a3f0e400fdecebd664b270480e279a947750a257415bb5685f7d9f523060f8_{formatter}.jpg',
    'https://images.gog-statics.com/8709a6925db430d1f7595ed90973ed29bf242a6c8019d93fbaa373973db19d8d_{formatter}.jpg',
    'https://images.gog-statics.com/bd6174d8cbc669f58eb511c24998fb4e40fe1e969d25109f0cf137e0a626c12d_{formatter}.jpg',
    'https://images.gog-statics.com/1cbe7f877e4662da335104fe235b7bb165106fbe811ac312a40515ee819615a4_{formatter}.jpg',
    'https://images.gog-statics.com/7c34e20113a45f868d63dad4d47f9120485b0d488e0ee7ddfd2e3fcbc2677cc6_{formatter}.jpg'
  ],
  userPreferredLanguage: { code: 'en', inAudio: false, inText: true },
  releaseDate: '2020.09.10',
  storeReleaseDate: '2020.09.10',
  productType: 'game',
  title: 'As Far As The Eye',
  coverHorizontal: 'https://images.gog-statics.com/88b27ed76a46bf32dda8bb16685a43cb24f759cb2ff1ebdf52b579331316aaaf.png',
  coverVertical: 'https://images.gog-statics.com/c436a8c835cbc7007acc74ed29f09801eafd022882b780bb728c03395040c614.jpg',
  developers: [ 'Unexpected' ],
  publishers: [ 'Goblinz Publishing' ],
  operatingSystems: [ 'windows', 'linux', 'osx' ],
  price: {
    final: '$24.99',
    base: '$24.99',
    discount: null,
    finalMoney: { amount: '24.99', currency: 'USD', discount: '0.00' },
    baseMoney: { amount: '24.99', currency: 'USD' }
  },
  productState: 'default',
  genres: [
    { name: 'Strategy', slug: 'strategy' },
    { name: 'Building', slug: 'building' },
    { name: 'Managerial', slug: 'managerial' }
  ],
  tags: [
    { name: 'Indie', slug: 'indie' },
    { name: 'Fantasy', slug: 'fantasy' },
    { name: 'Strategy', slug: 'strategy' },
    { name: 'Management', slug: 'management' },
    { name: 'Sandbox', slug: 'sandbox' },
    { name: 'Difficult', slug: 'difficult' },
    { name: 'Resource Management', slug: 'resource-management' },
    { name: 'Survival', slug: 'survival' },
    { name: 'Roguelike', slug: 'roguelike' },
    { name: 'Family Friendly', slug: 'family-friendly' },
    { name: 'Managerial', slug: 'managerial' },
    { name: 'Building', slug: 'building' },
    { name: 'City builder', slug: 'city-builder' },
    { name: '4X', slug: 'four-x' },
    { name: 'Board Game', slug: 'board-game' },
    { name: 'Tabletop', slug: 'tabletop' }
  ],
  reviewsRating: 37,
  editions: [
    { id: 1556019399, name: 'Standard Edition', isRootEdition: true },
    { id: 1221482018, name: 'Soundtrack Bundle', isRootEdition: false },
    { id: 1455775438, name: 'Supporter Bundle', isRootEdition: false }
  ],
  ratings: [],
  storeLink: 'https://www.gog.com/en/game/as_far_as_the_eye'
}
*/
