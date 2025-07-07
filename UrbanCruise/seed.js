/* eslint-disable no-undef */
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json"); // your private key
const data = require("./seed-data"); // the file above

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function seed() {
  console.log("⏳  Starting Firestore seed …");

  /* 1. brands */
  await db.doc("vehicle/brands").set({ brands: data.brands.car });
  await db.doc("vehicle/bike-brands").set({ brands: data.brands.bike });

  /* 2. models — app expects an *array* in field 'models' */
  const carModelsArr = Object.entries(data.models.car).map(
    ([brandId, models]) => ({ brandId: Number(brandId), models })
  );
  const bikeModelsArr = Object.entries(data.models.bike).map(
    ([brandId, models]) => ({ brandId: Number(brandId), models })
  );

  await db.doc("vehicle/models").set({ models: carModelsArr });
  await db.doc("vehicle/bike-models").set({ models: bikeModelsArr });

  /* 3. vehicles */
  await db.doc("vehicle/cars").set(data.cars);
  await db.doc("vehicle/bikes").set(data.bikes);

  /* 4. locations */
  await db.doc("vehicle/locations").set({ locations: data.locations });

  /* 5. customer reviews */
  await db
    .doc("vehicle/customer-reviews")
    .set({ reviews: data.customerReviews });

  console.log(
    "✅  Seed complete!  Cars loaded:",
    Object.keys(data.cars).length
  );
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
