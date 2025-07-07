/*
 * import-from-json.js
 * --------------------------------------------------------
 * Reads data.json and uploads:
 *   • vehicle/brands        (cars + bikes)
 *   • vehicle/models        (cars)        {models:[{brandId,models}]}
 *   • vehicle/bike-models   (bikes)       {models:[{brandId,models}]}
 *   • vehicle/cars          (cars doc)
 *   • vehicle/bikes         (bikes doc)
 *
 * Adds default fields: *_Count = 10, pricePerDay = 7000, year = 2024
 */

const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const sa = require("./serviceAccount.json");
const db = admin
  .initializeApp({ credential: admin.credential.cert(sa) })
  .firestore();

// ---------- CONFIGURE DEFAULTS ----------
const DEFAULT_COUNT = 10;
const DEFAULT_PRICE_PER_D = 7000;
const DEFAULT_YEAR = 2024;

// ---------- READ JSON ----------
const raw = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data.json"), "utf8")
);

// ---------- Build structures ----------
const cars = {}; // vehicle/cars
const bikes = {}; // vehicle/bikes

const brands = {
  // vehicle/brands + vehicle/bike-brands
  car: {},
  bike: {},
};
const models = {
  // vehicle/models  + vehicle/bike-models
  car: {},
  bike: {},
};

let carDocId = 0; // "0", "1", … for cars
let bikeDocId = 0; // "0", "1", … for bikes

/* ---------- 1. Build CAR maps ---------- */
raw.vehicles.forEach((brandBlock, brandId) => {
  const brandName = brandBlock.brand;
  brands.car[brandId] = brandName;

  Object.entries(brandBlock.model).forEach(([modelName, specs], modelId) => {
    // cars/<docId>
    cars[String(carDocId)] = {
      brandId,
      modelId,
      image: specs.imageUrl,
      bodyType: specs.bodyType,
      power: specs.power,
      engineSize: specs.engineSize,
      gearbox: specs.gearbox,
      fuelType: specs.fuelType,
      year: specs.year || DEFAULT_YEAR,
      pricePerDay: DEFAULT_PRICE_PER_D,
      carCount: DEFAULT_COUNT,
    };

    // models table
    if (!models.car[brandId]) models.car[brandId] = {};
    models.car[brandId][modelId] = modelName;

    carDocId++;
  });
});

/* ---------- 2. Build BIKE maps (if any) ---------- */
if (Array.isArray(raw.bikes)) {
  raw.bikes.forEach((brandBlock, brandId) => {
    const brandName = brandBlock.brand;
    brands.bike[brandId] = brandName;

    Object.entries(brandBlock.model).forEach(([modelName, specs], modelId) => {
      // bikes/<docId>
      bikes[String(bikeDocId)] = {
        brandId,
        modelId,
        image: specs.imageUrl,
        bodyType: specs.bodyType,
        power: specs.power,
        engineSize: specs.engineSize,
        gearbox: specs.gearbox,
        fuelType: specs.fuelType,
        year: specs.year || DEFAULT_YEAR,
        pricePerDay: DEFAULT_PRICE_PER_D,
        bikeCount: DEFAULT_COUNT,
      };

      // bike models table
      if (!models.bike[brandId]) models.bike[brandId] = {};
      models.bike[brandId][modelId] = modelName;

      bikeDocId++;
    });
  });
}

/* ---------- Firestore upload ---------- */
(async () => {
  console.log("⏳  Uploading…");

  /* 1. brands */
  await db.doc("vehicle/brands").set({ brands: brands.car });
  await db.doc("vehicle/bike-brands").set({ brands: brands.bike });
  console.log("✅  vehicle/*brands done");

  /* 2. models (cars) */
  const carModelsArr = Object.entries(models.car).map(
    ([brandId, modelsMap]) => ({ brandId: Number(brandId), models: modelsMap })
  );
  await db.doc("vehicle/models").set({ models: carModelsArr });
  console.log("✅  vehicle/models (cars) done");

  /* 3. bike-models */
  const bikeModelsArr = Object.entries(models.bike).map(
    ([brandId, modelsMap]) => ({ brandId: Number(brandId), models: modelsMap })
  );
  await db.doc("vehicle/bike-models").set({ models: bikeModelsArr });
  console.log("✅  vehicle/bike-models done");

  /* 4. vehicle docs */
  await db.doc("vehicle/cars").set(cars);
  console.log(`✅  vehicle/cars done (${Object.keys(cars).length} cars)`);

  await db.doc("vehicle/bikes").set(bikes);
  console.log(`✅  vehicle/bikes done (${Object.keys(bikes).length} bikes)`);

  console.log("🎉  All finished");
  process.exit(0);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
