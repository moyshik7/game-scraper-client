import fetch from "node-fetch";

export const HumbleBundle = (query) => {
    return new Promise((resolve, reject) => {
        if (!query) {
            reject("Query is required");
        }
        fetch(`https://www.humblebundle.com/store/api/search?request=1&page_size=20&sort=bestselling&search=${query}`)
            .then((res) => res.json())
            .then((data) => {
                return resolve(data.results.map((item) => {
                    return ({
                        name: item?.human_name || "N/A",
                        price: item?.current_price?.amount || 0,
                        original: item?.full_price?.amount || 0,
                        image: item?.standard_carousel_image || item?.large_capsule || item?.featured_image_recommendation || item?.icon || item?.xray_traits_thumbnail,
                        offer: (item.full_price.amount > item.current_price.amount),
                        platforms: item.platforms,
                        link: `https://www.humblebundle.com/store/${item.human_url}`,
                        store: "Humble Bundle",
                    });
                }));
            });
    });
}


/*
RAW API DATA

{
    standard_carousel_image: 'https://hb.imgix.net/d2f8ab653dfa987c4923c4baf400867104117cda.jpg?auto=compress,format&fit=crop&h=206&w=360&s=6401d13f4dab96615fb7cbae1d6d0e96',
    delivery_methods: [
        'other-key'
    ],
    machine_name: 'gta5_premium_edition_storefront',
    xray_traits_thumbnail: 'https://hb.imgix.net/d2f8ab653dfa987c4923c4baf400867104117cda.jpg?auto=compress,format&fit=crop&h=84&w=135&s=c030b3fb4c3659eae0b05ee4e03c84d5',
    content_types: [
        'game'
    ],
    human_url: 'grand-theft-auto-v-premium-edition',
    platforms: [
        'windows'
    ],
    icon_dict: {
        'other-key': {
            available: [Array],
            unavailable: [Array]
        }
    },
    featured_image_recommendation: 'https://hb.imgix.net/d2f8ab653dfa987c4923c4baf400867104117cda.jpg?auto=compress,format&fit=crop&h=154&w=270&s=ed254339dab6fab3ab2249b9b25381ac',
    large_capsule: 'https://hb.imgix.net/d2f8ab653dfa987c4923c4baf400867104117cda.jpg?auto=compress,format&fit=crop&h=353&w=616&s=4fb103fd72badb2b8a2b554a032452b3',
    human_name: 'Grand Theft Auto V: Premium Edition',
    required_account_links: [
        'steam'
    ],
    type: 'product',
    icon: 'https://hb.imgix.net/d2f8ab653dfa987c4923c4baf400867104117cda.jpg?auto=compress,format&fit=crop&h=64&w=103&s=89b463c678c28f21d44869fb3838bcb1',
    non_rewards_charity_split: 0,
    rewards_split: 0.05,
    empty_tpkds: {},
    full_price: {
        currency: 'USD',
        amount: 29.98
    },
    nonrefundable: false,
    current_price: {
        currency: 'USD',
        amount: 29.98
    },
    cta_badge: null,
    rating_for_current_region: 'esrb'
}
*/