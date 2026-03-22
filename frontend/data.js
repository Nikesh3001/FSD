// Data version — bump this number whenever you change the seed data
// so that localStorage gets refreshed automatically for all visitors.
var DATA_VERSION = 2;

var initialData = [
  {
    id: "prop_1",
    title: "Skyview Penthouse",
    price: 12500000,
    location: "Mumbai",
    type: "Apartment",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Experience luxury living in this stunning penthouse with panoramic city views, modern amenities, and a wrap-around terrace perfect for evening gatherings."
  },
  {
    id: "prop_2",
    title: "Oceanfront Villa",
    price: 45000000,
    location: "Goa",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 6,
    area: 5500,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "A spectacular modern waterfront villa offering direct beach access, an infinity pool, and state-of-the-art smart home features."
  },
  {
    id: "prop_3",
    title: "Eco Green Plot",
    price: 2500000,
    location: "Pune",
    type: "Plot",
    bedrooms: 0,
    bathrooms: 0,
    area: 10000,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Prime residential plot in a fast-developing eco-friendly township. Perfect investment opportunity for your dream custom home."
  },
  {
    id: "prop_4",
    title: "Urban Loft",
    price: 8500000,
    location: "Bangalore",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Sleek industrial-style loft in the heart of the IT corridor. High ceilings, exposed brickwork, and premium fixtures make this a designer's dream."
  },
  {
    id: "prop_5",
    title: "Heritage Mansion",
    price: 35000000,
    location: "Jaipur",
    type: "Villa",
    bedrooms: 6,
    bathrooms: 5,
    area: 8000,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Exquisite heritage property with traditional Rajasthani architecture fused with modern luxury — sprawling courtyards and manicured gardens."
  },
  {
    id: "prop_6",
    title: "Lakeside Apartment",
    price: 6500000,
    location: "Hyderabad",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Peaceful 3BHK overlooking a serene lake. Enjoy tranquility while staying connected to the major tech hubs of the city."
  },
  {
    id: "prop_7",
    title: "Hilltop Estate",
    price: 28000000,
    location: "Shimla",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 4,
    area: 4200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "A breathtaking hilltop estate surrounded by pine forests and snow-capped mountain views. Comes with a private garden, fireplace lounge, and wooden interiors."
  },
  {
    id: "prop_8",
    title: "Smart Studio Flat",
    price: 3200000,
    location: "Chennai",
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "A compact yet ultra-modern studio flat with smart lighting, automated curtains, and a stylish open kitchen — ideal for young professionals."
  },
  {
    id: "prop_9",
    title: "Golden Acres Plot",
    price: 5800000,
    location: "Ahmedabad",
    type: "Plot",
    bedrooms: 0,
    bathrooms: 0,
    area: 18000,
    image: "https://images.unsplash.com/photo-1464082354059-27db6ce50048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Expansive commercial-grade plot in a rapidly growing suburb. Excellent connectivity, clear title, and ready for immediate construction."
  },
  {
    id: "prop_10",
    title: "Riverside Duplex",
    price: 15000000,
    location: "Kolkata",
    type: "Apartment",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "A luxurious duplex apartment perched above the Hooghly river. Two levels of open living with colonial-style balconies and a private rooftop terrace."
  },
  {
    id: "prop_11",
    title: "Desert Dune Villa",
    price: 19500000,
    location: "Jodhpur",
    type: "Villa",
    bedrooms: 3,
    bathrooms: 3,
    area: 3100,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "An architectural masterpiece blending blue-city aesthetics with contemporary design. Private courtyard, rooftop pool, and panoramic desert views."
  },
  {
    id: "prop_12",
    title: "Garden View Studio",
    price: 4100000,
    location: "Pune",
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 720,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "A cozy, light-filled studio apartment with a lovely garden view. Gated community with gym, co-working space, and 24/7 security."
  },
  {
    id: "prop_13",
    title: "Tech Park Residency",
    price: 9800000,
    location: "Bangalore",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 1950,
    image: "https://images.unsplash.com/photo-1515263487990-61b07816fe34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Premium 3BHK just 5 minutes from Whitefield tech park. Modern finishes, covered parking, swimming pool, and a vibrant residents club."
  },
  {
    id: "prop_14",
    title: "Countryside Farmhouse",
    price: 22000000,
    location: "Nashik",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 7500,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "A sprawling farmhouse retreat nestled in Nashik's vineyards. Enjoy outdoor living with a stone patio, fruit orchard, and a natural spring."
  },
  {
    id: "prop_15",
    title: "Marina Bay Plot",
    price: 7500000,
    location: "Chennai",
    type: "Plot",
    bedrooms: 0,
    bathrooms: 0,
    area: 12000,
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Strategic sea-facing plot minutes from Marina Beach. Excellent for high-rise residential or boutique hotel development with full DTCP approval."
  }
];

// Data Service
const DataService = {
  init() {
    // If the stored version is outdated (or missing), reseed properties with fresh data
    var storedVersion = parseInt(localStorage.getItem('realEstateDataVersion'), 10);
    if (storedVersion !== DATA_VERSION) {
      localStorage.setItem('realEstateProperties',    JSON.stringify(initialData));
      localStorage.setItem('realEstateFavorites',     JSON.stringify([]));
      localStorage.setItem('realEstateDataVersion',   String(DATA_VERSION));
    }
  },

  getProperties() {
    return JSON.parse(localStorage.getItem('realEstateProperties')) || [];
  },

  getProperty(id) {
    const props = this.getProperties();
    return props.find(p => p.id === id);
  },

  addProperty(property) {
    const props = this.getProperties();
    props.push(property);
    localStorage.setItem('realEstateProperties', JSON.stringify(props));
  },

  getFavorites() {
    return JSON.parse(localStorage.getItem('realEstateFavorites')) || [];
  },

  toggleFavorite(id) {
    let favs = this.getFavorites();
    if (favs.includes(id)) {
      favs = favs.filter(f => f !== id);
    } else {
      favs.push(id);
    }
    localStorage.setItem('realEstateFavorites', JSON.stringify(favs));
    return favs.includes(id);
  },

  isFavorite(id) {
    const favs = this.getFavorites();
    return favs.includes(id);
  }
};

// Initialize on load
DataService.init();
