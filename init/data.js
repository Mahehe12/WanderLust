const sampleListings = [
    {
        title: "Cozy Beachfront Cottage",
        description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
        images: [
            {
                filename: "beachfront-cottage-1",
                url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"
            },
            {
                filename: "beachfront-cottage-2",
                url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
            },
            {
                filename: "beachfront-cottage-3",
                url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f"
            }
        ],
        price: 1500,
        location: "Malibu, California",
        country: "United States",
        category: "Beachfront"
    },
    {
        title: "Modern Loft in Downtown",
        description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
        images: [
            {
                filename: "modern-loft-1",
                url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            },
            {
                filename: "modern-loft-2",
                url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd"
            }
        ],
        price: 1200,
        location: "New York City, New York",
        country: "United States",
        category: "Iconic Cities"
    },
    {
        title: "Mountain Retreat",
        description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
        images: [
            {
                filename: "mountain-retreat-1",
                url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d"
            },
            {
                filename: "mountain-retreat-2",
                url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
            },
            {
                filename: "mountain-retreat-3",
                url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e"
            }
        ],
        price: 1000,
        location: "Aspen, Colorado",
        country: "United States",
        category: "Mountains"
    },
    {
        title: "Historic Villa in Tuscany",
        description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
        images: [
            {
                filename: "tuscany-villa-1",
                url: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
            },
            {
                filename: "tuscany-villa-2",
                url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb"
            }
        ],
        price: 2500,
        location: "Florence, Tuscany",
        country: "Italy",
        category: "Castles"
    },
    {
        title: "Secluded Treehouse Getaway",
        description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
        images: [
            {
                filename: "treehouse-1",
                url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972"
            },
            {
                filename: "treehouse-2",
                url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4"
            }
        ],
        price: 800,
        location: "Portland, Oregon",
        country: "United States",
        category: "Camping"
    },
    {
        title: "Arctic Ice Hotel",
        description: "Experience the magic of the northern lights from your ice suite. A once-in-a-lifetime arctic adventure.",
        images: [
            {
                filename: "ice-hotel-1",
                url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
            },
            {
                filename: "ice-hotel-2",
                url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb"
            },
            {
                filename: "ice-hotel-3",
                url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
            }
        ],
        price: 2000,
        location: "Kiruna, Norbotten",
        country: "Sweden", 
        category: "Arctic"
    },
    {
        title: "Luxury Pool Villa",
        description: "Indulge in this stunning villa with an infinity pool overlooking the ocean. Perfect for luxury seekers.",
        images: [
            {
                filename: "pool-villa-1",
                url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d"
            },
            {
                filename: "pool-villa-2",
                url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd"
            },
            {
                filename: "pool-villa-3",
                url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e"
            }
        ],
        price: 3500,
        location: "Bali, Bali Province",
        country: "Indonesia",
        category: "Amazing Pools"
    },
    {
        title: "Historic Countryside Manor",
        description: "Step back in time in this beautifully preserved manor house with extensive gardens.",
        images: [
            {
                filename: "manor-1",
                url: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
            },
            {
                filename: "manor-2",
                url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb"
            },
            {
                filename: "manor-3",
                url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
            }
        ],
        price: 4000,
        location: "Cotswolds, England",
        country: "United Kingdom",
        category: "Castles"
    }
];

module.exports = { data: sampleListings };