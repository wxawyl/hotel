const imageSources = {
  hotels: {
    oceanView: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=450&fit=crop',
    ],
    sunsetVilla: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=450&fit=crop',
    ],
    ancientHouse: [
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1559599746-c0f31b8e2b6a?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&h=450&fit=crop',
    ],
  },
  rooms: {
    deluxeOcean: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    premiumSuite: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    standardRoom: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    oceanFront: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    familyRoom: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    traditionalSuite: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop',
    gardenRoom: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop',
  },
  facilities: {
    pool: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    spa: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop',
    restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    gym: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop',
    beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
  },
  culture: {
    ancientTown: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop',
    mySon: 'https://images.unsplash.com/photo-1546436029-e357479f4697?w=400&h=300&fit=crop',
    anBangBeach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    marbleMountains: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=300&fit=crop',
    wontonSoup: 'https://images.unsplash.com/photo-1547592166-eac499469717?w=400&h=300&fit=crop',
    lanternMaking: 'https://images.unsplash.com/photo-1517400508447-f8dd518b68af?w=400&h=300&fit=crop',
  },
  food: {
    breakfast: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop',
    vietnamese: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
    seafood: 'https://images.unsplash.com/photo-1547592166-23ac5539339d?w=300&h=200&fit=crop',
    wonton: 'https://images.unsplash.com/photo-1547592166-eac499469717?w=300&h=200&fit=crop',
    caoLau: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop',
    whiteRose: 'https://images.unsplash.com/photo-1547592166-23ac5539339d?w=300&h=200&fit=crop',
  },
  activities: {
    cookingClass: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300&h=200&fit=crop',
    boatTour: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop',
    cycling: 'https://images.unsplash.com/photo-1464349095431-e9a1084c8a4e?w=300&h=200&fit=crop',
    yoga: 'https://images.unsplash.com/photo-1509866671745-924196527cfd?w=300&h=200&fit=crop',
    lanternMaking: 'https://images.unsplash.com/photo-1517400508447-f8dd518b68af?w=300&h=200&fit=crop',
  },
  products: {
    coffee: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=300&fit=crop',
    vietnameseCoffee: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=300&fit=crop',
    silkScarf: 'https://images.unsplash.com/photo-1515405068779-1dc098a28f4a?w=300&h=300&fit=crop',
    silk: 'https://images.unsplash.com/photo-1515405068779-1dc098a28f4a?w=300&h=300&fit=crop',
    scarf: 'https://images.unsplash.com/photo-1515405068779-1dc098a28f4a?w=300&h=300&fit=crop',
    incense: 'https://images.unsplash.com/photo-1514428003490-969c509318bf?w=300&h=300&fit=crop',
    incenseStick: 'https://images.unsplash.com/photo-1514428003490-969c509318bf?w=300&h=300&fit=crop',
    incenseSticks: 'https://images.unsplash.com/photo-1514428003490-969c509318bf?w=300&h=300&fit=crop',
    ceramics: 'https://images.unsplash.com/photo-1442406964439-e4ab42642fac?w=300&h=300&fit=crop',
    ceramic: 'https://images.unsplash.com/photo-1442406964439-e4ab42642fac?w=300&h=300&fit=crop',
    pottery: 'https://images.unsplash.com/photo-1442406964439-e4ab42642fac?w=300&h=300&fit=crop',
    handmadeCeramics: 'https://images.unsplash.com/photo-1442406964439-e4ab42642fac?w=300&h=300&fit=crop',
    bambooToothbrush: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&h=300&fit=crop',
    toothbrush: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&h=300&fit=crop',
    towelSet: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=300&fit=crop',
    towel: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=300&fit=crop',
    cottonTowel: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=300&fit=crop',
    cottonTowelSet: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=300&fit=crop',
    slippers: 'https://images.unsplash.com/photo-1523419408621-40d215379c85?w=300&h=300&fit=crop',
    slipper: 'https://images.unsplash.com/photo-1523419408621-40d215379c85?w=300&h=300&fit=crop',
    tea: 'https://images.unsplash.com/photo-1544144463-c725d6877240?w=300&h=300&fit=crop',
    vietnameseTea: 'https://images.unsplash.com/photo-1544144463-c725d6877240?w=300&h=300&fit=crop',
    fishSauce: 'https://images.unsplash.com/photo-1547592166-23ac5539339d?w=300&h=300&fit=crop',
    fishsauce: 'https://images.unsplash.com/photo-1547592166-23ac5539339d?w=300&h=300&fit=crop',
    nuocMam: 'https://images.unsplash.com/photo-1547592166-23ac5539339d?w=300&h=300&fit=crop',
    basket: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop',
    weaving: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop',
    handwovenBasket: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop',
    raincoat: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=300&fit=crop',
    rainCoat: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=300&fit=crop',
    herbal: 'https://images.unsplash.com/photo-1515673148653-3e1e07ac867c?w=300&h=300&fit=crop',
    herbalMedicine: 'https://images.unsplash.com/photo-1515673148653-3e1e07ac867c?w=300&h=300&fit=crop',
    wetWipes: 'https://images.unsplash.com/photo-1591991731831-5391f4f0a847?w=300&h=300&fit=crop',
    wipes: 'https://images.unsplash.com/photo-1591991731831-5391f4f0a847?w=300&h=300&fit=crop',
    tissue: 'https://images.unsplash.com/photo-1591991731831-5391f4f0a847?w=300&h=300&fit=crop',
  },
  services: {
    breakfast: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop',
    pickup: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=300&h=200&fit=crop',
    spa: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=200&fit=crop',
    housekeeping: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&h=200&fit=crop',
    airportPickup: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=300&h=200&fit=crop',
    airportTransfer: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=300&h=200&fit=crop',
  },
};

export const getHotelImage = (hotelId, index = 0) => {
  const hotelImages = [
    imageSources.hotels.oceanView,
    imageSources.hotels.sunsetVilla,
    imageSources.hotels.ancientHouse,
  ];
  const hotelImageArray = hotelImages[(hotelId - 1) % hotelImages.length];
  if (Array.isArray(hotelImageArray)) {
    return hotelImageArray[index % hotelImageArray.length];
  }
  return hotelImageArray;
};

export const getHotelImages = (hotelId) => {
  const hotelImages = [
    imageSources.hotels.oceanView,
    imageSources.hotels.sunsetVilla,
    imageSources.hotels.ancientHouse,
  ];
  const images = hotelImages[(hotelId - 1) % hotelImages.length];
  return Array.isArray(images) ? images : [images];
};

export const getRoomImage = (roomTypeId) => {
  const images = [
    imageSources.rooms.deluxeOcean,
    imageSources.rooms.premiumSuite,
    imageSources.rooms.standardRoom,
    imageSources.rooms.oceanFront,
    imageSources.rooms.familyRoom,
    imageSources.rooms.traditionalSuite,
    imageSources.rooms.gardenRoom,
  ];
  return images[(roomTypeId - 1) % images.length];
};

export const getCultureImage = (index) => {
  const images = [
    imageSources.culture.ancientTown,
    imageSources.culture.mySon,
    imageSources.culture.anBangBeach,
    imageSources.culture.marbleMountains,
  ];
  return images[index % images.length];
};

export const getFacilityImage = (facilityName) => {
  const facilityMap = {
    'pool': imageSources.facilities.pool,
    'spa': imageSources.facilities.spa,
    'restaurant': imageSources.facilities.restaurant,
    'gym': imageSources.facilities.gym,
    'beach': imageSources.facilities.beach,
  };
  return facilityMap[facilityName.toLowerCase()] || imageSources.facilities.pool;
};

export const getFoodImage = (type) => {
  const foodMap = {
    'breakfast': imageSources.food.breakfast,
    'vietnamese': imageSources.food.vietnamese,
    'seafood': imageSources.food.seafood,
  };
  return foodMap[type.toLowerCase()] || imageSources.food.breakfast;
};

export const getActivityImage = (type) => {
  const activityMap = {
    'cooking': imageSources.activities.cookingClass,
    'boat': imageSources.activities.boatTour,
    'cycling': imageSources.activities.cycling,
    'yoga': imageSources.activities.yoga,
  };
  return activityMap[type.toLowerCase()] || imageSources.activities.cookingClass;
};

export const getProductImage = (productName) => {
  const productMap = {
    'vietnamese coffee': imageSources.products.vietnameseCoffee,
    'coffee': imageSources.products.coffee,
    'silk': imageSources.products.silkScarf,
    'silk scarf': imageSources.products.silkScarf,
    'scarf': imageSources.products.silkScarf,
    'incense': imageSources.products.incense,
    'incense stick': imageSources.products.incenseStick,
    'incense sticks': imageSources.products.incenseSticks,
    'ceramic': imageSources.products.ceramics,
    'ceramics': imageSources.products.ceramics,
    'pottery': imageSources.products.ceramics,
    'handmade ceramics': imageSources.products.handmadeCeramics,
    'toothbrush': imageSources.products.bambooToothbrush,
    'bamboo toothbrush': imageSources.products.bambooToothbrush,
    'towel': imageSources.products.towelSet,
    'towel set': imageSources.products.towelSet,
    'cotton towel': imageSources.products.cottonTowel,
    'cotton towel set': imageSources.products.cottonTowelSet,
    'slipper': imageSources.products.slippers,
    'slippers': imageSources.products.slippers,
    'tea': imageSources.products.tea,
    'vietnamese tea': imageSources.products.vietnameseTea,
    'fish sauce': imageSources.products.fishSauce,
    'fishsauce': imageSources.products.fishSauce,
    'nuoc mam': imageSources.products.fishSauce,
    'basket': imageSources.products.basket,
    'weaving': imageSources.products.basket,
    'handwoven basket': imageSources.products.handwovenBasket,
    'raincoat': imageSources.products.raincoat,
    'rain coat': imageSources.products.raincoat,
    'herbal': imageSources.products.herbal,
    'herbal medicine': imageSources.products.herbalMedicine,
    'wet wipes': imageSources.products.wetWipes,
    'wipes': imageSources.products.wetWipes,
    'tissue': imageSources.products.wetWipes,
  };
  
  const nameStr = typeof productName === 'object' ? (productName.en || productName.zh || JSON.stringify(productName)) : String(productName);
  const lowerName = nameStr.toLowerCase();
  
  for (const key of Object.keys(productMap)) {
    if (lowerName.includes(key)) {
      return productMap[key];
    }
  }
  return imageSources.products.coffee;
};

export const getServiceImage = (serviceName) => {
  const serviceMap = {
    'breakfast': imageSources.services.breakfast,
    'pickup': imageSources.services.pickup,
    'airport pickup': imageSources.services.airportPickup,
    'airport transfer': imageSources.services.airportTransfer,
    'spa': imageSources.services.spa,
    'housekeeping': imageSources.services.housekeeping,
  };
  
  if (!serviceName) {
    return imageSources.services.spa;
  }
  
  const nameStr = typeof serviceName === 'object' ? (serviceName.en || serviceName.name || JSON.stringify(serviceName)) : String(serviceName);
  const lowerName = nameStr.toLowerCase();
  
  for (const key of Object.keys(serviceMap)) {
    if (lowerName.includes(key)) {
      return serviceMap[key];
    }
  }
  return imageSources.services.spa;
};

export const getHeroImage = () => {
  return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop';
};

export const getMapImage = () => {
  return 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=400&fit=crop';
};