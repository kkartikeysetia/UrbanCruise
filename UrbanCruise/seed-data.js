/* eslint-disable no-undef */
// seed-data.js
// ──────────────────────────────────────────────────────────
// Numbers → *strings* for Firestore map keys.
// Feel free to adjust year, pricePerDay and carCount to taste.

module.exports = {
  /* ──────────  CARS (no bikes in your JSON) ────────── */
  cars: {
    /* Hyundai */
    0: {
      brandId: 0,
      modelId: 0,
      image:
        "https://raw.githubusercontent.com/fbatuhanr/RentaCar-ReactJS/master/src/assets/images/vehicles/hyundai/bayon.png",
      bodyType: "SUV",
      power: "100 HP",
      engineSize: "1398 cc",
      gearbox: "Automatic",
      fuelType: "Gas",
      year: 2023,
      pricePerDay: 4500,
      carCount: 7,
    },
    1: {
      brandId: 0,
      modelId: 1,
      image:
        "https://raw.githubusercontent.com/fbatuhanr/RentaCar-ReactJS/master/src/assets/images/vehicles/hyundai/i20.png",
      bodyType: "Hatchback",
      power: "100 HP",
      engineSize: "1368 cc",
      gearbox: "Automatic",
      fuelType: "Gas",
      year: 2023,
      pricePerDay: 4000,
      carCount: 5,
    },

    /* BMW */
    2: {
      brandId: 1,
      modelId: 0,
      image:
        "https://raw.githubusercontent.com/fbatuhanr/RentaCar-ReactJS/master/src/assets/images/vehicles/bmw/320d.png",
      bodyType: "Sedan",
      power: "187 HP",
      engineSize: "1995 cc",
      gearbox: "Automatic",
      fuelType: "Diesel",
      year: 2024,
      pricePerDay: 8500,
      carCount: 6,
    },
    3: {
      brandId: 1,
      modelId: 1,
      image:
        "https://raw.githubusercontent.com/fbatuhanr/RentaCar-ReactJS/master/src/assets/images/vehicles/bmw/520i.png",
      bodyType: "Sedan",
      power: "170 HP",
      engineSize: "1597 cc",
      gearbox: "Automatic",
      fuelType: "Gas",
      year: 2024,
      pricePerDay: 9000,
      carCount: 4,
    },

    /* Opel */
    4: {
      brandId: 2,
      modelId: 0,
      image:
        "https://raw.githubusercontent.com/fbatuhanr/RentaCar-ReactJS/master/src/assets/images/vehicles/opel/astra.png",
      bodyType: "Hatchback",
      power: "130 HP",
      engineSize: "1199 cc",
      gearbox: "Automatic",
      fuelType: "Gas",
      year: 2023,
      pricePerDay: 5500,
      carCount: 8,
    },

    /* Toyota */
    5: {
      brandId: 3,
      modelId: 0,
      image:
        "https://raw.githubusercontent.com/fbatuhanr/RentaCar-ReactJS/master/src/assets/images/vehicles/toyota/corolla.png",
      bodyType: "Sedan",
      power: "123 HP",
      engineSize: "1490 cc",
      gearbox: "Automatic",
      fuelType: "Gas",
      year: 2023,
      pricePerDay: 6000,
      carCount: 9,
    },

    /* Nissan */
    6: {
      brandId: 4,
      modelId: 0,
      image:
        "https://raw.githubusercontent.com/fbatuhanr/RentaCar-ReactJS/master/src/assets/images/vehicles/nissan/qashqai.png",
      bodyType: "SUV",
      power: "190 HP",
      engineSize: "1497 cc",
      gearbox: "Automatic",
      fuelType: "Hybrid",
      year: 2024,
      pricePerDay: 7500,
      carCount: 6,
    },
  },

  /* No bikes yet – leave empty placeholders */
  bikes: {
    /* Example bike data */
    0: {
      brandId: 0,
      modelId: 0,
      image:
        "https://raw.githubusercontent.com/fbatuhanr/RentaCar-ReactJS/master/src/assets/images/vehicles/hyundai/bayon.png", // Replace with the correct bike image URL

      bodyType: "Sport",
      power: "150 HP",
      engineSize: "900 cc",
      gearbox: "Manual",
      fuelType: "Gas",
      year: 2023,
      pricePerDay: 5000,
      carCount: 7, // Change to bike count if it's a bike
    },
  },

  /* ──────────  LOOK-UP TABLES  ────────── */
  brands: {
    car: { 0: "Hyundai", 1: "BMW", 2: "Opel", 3: "Toyota", 4: "Nissan" },
    bike: {
      0: { 0: "Model A", 1: "Model B" }, // Add your bike models here
    },
  },

  models: {
    car: {
      0: { 0: "Bayon", 1: "i20" }, // Hyundai
      1: { 0: "320d", 1: "520i" }, // BMW
      2: { 0: "Astra" }, // Opel
      3: { 0: "Corolla" }, // Toyota
      4: { 0: "Qashqai" }, // Nissan
    },
    bike: {}, // none for now
  },
  locations: [
    "Mumbai",
    "Goa",
    "Delhi",
    "Lucknow",
    "Hyderabad",
    "Kerela",
    "Noida",
    "Chandigarh",
    "Pune",
    "Gujrat",
    "Jaisalmer",
    "Rajasthan",
    "Guwahati",
    "Jammu",
    "Dehradun",
    "Srinagar",
    "Kashmir",
    "Manali",
    "Shimla",
    "Leh & Ladakh",
  ],

  /* ──────────  CUSTOMER REVIEWS ────────── */
  customerReviews: [
    {
      customerImageUrl:
        "https://img.freepik.com/free-vector/travelers-concept-illustration_114360-2602.jpg",
      customerName: "Shivam Bhardwaj",
      customerReview: "Renting was much easier than I expected!",
      customerStar: 5,
    },
    {
      customerImageUrl:
        "https://img.freepik.com/premium-vector/tourist-with-suitcase-backpack-hurry-trying-get-his-flight-train-vector-illustration_449384-600.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705622400&semt=sph",
      customerName: "Naman Makkar",
      customerReview: "I am very satisfied, I will use 'UrbanCruise' again.",
      customerStar: 4,
    },
    {
      customerImageUrl:
        "https://img.freepik.com/free-vector/trip-concept-illustration_114360-1247.jpg",
      customerName: "Om Sarraf",
      customerReview: "Great service and friendly staff! Highly recommend.",
      customerStar: 5,
    },
    {
      customerImageUrl:
        "https://static.vecteezy.com/system/resources/previews/007/892/485/original/backpacker-male-and-female-traveler-carrying-a-travel-backpack-thumbs-up-for-hitchhiking-illustration-vector.jpg",
      customerName: "Pragati ",
      customerReview: "Wide range of vehicles to choose from, very convenient.",
      customerStar: 4,
    },
  ],
};
