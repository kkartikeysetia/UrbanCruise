# UrbanCruise: Car & Bike Rental System 🚘🏍️

UrbanCruise transforms the way you explore cities—offering secure user registration, lightning-fast vehicle browsing, and a crystal-clear booking flow right at your fingertips. Enjoy responsive, device-friendly design, hassle-free checkouts with multiple payment options, and a handy history of all your past rentals. Ready to hit the road? 🌟

🚀 **Live Demo:** https://your-live-demo-link.com

---

## 🌟 Features

**Core Functionality:**

- ✅ **User Login & Registration:** Secure sign-up and sign-in with Firebase Authentication
- ✅ **Responsive UI/UX:** Seamless browsing and booking on mobile, tablet & desktop
- ✅ **Booking Workflow:** Choose your vehicle → pick dates/duration → proceed to checkout
- ✅ **Intuitive Checkout:** Review rental details, select payment method, and complete transactions securely
- ✅ **Payment Gateway Integration:** Razorpay for smooth, reliable online payments
- ✅ **Booking History:** View and track all past and upcoming rentals

**Additional Highlights:**

- 🚗 **Detailed Vehicle Information:** Cars & bikes with high-res images, power (HP), engine size, gearbox, body/bike type, fuel type, year, price/day
- 📍 **Location Selection:** Easy pickup & drop-off location choices
- 🗓️ **Flexible Reservations:** Specify exact start and end dates
- 💳 **Secure Payments:** Multiple payment options via Razorpay
- 🔄 **Reservation Management:** Users can cancel active bookings; Admins can cancel individual or bulk reservations
- 📊 **Admin Panel:** Centralized overview, grouped by user email, with detailed expand-and-manage views
- 🌙 **Dark/Light Theme Toggle:** Let users switch between themes with a single click .

### Admin Features (Rentals Management Panel):

- **Centralized Overview:** Access a dedicated admin panel to view all reservations made across the platform.
- **Grouped Reservations:** Reservations are intuitively grouped by the owner's email, making it easy to manage multiple rentals from a single user.
- **Detailed Reservation View:** Expand each reservation to see full vehicle details and rental specifics.
- **Individual Reservation Cancellation:** Admins can cancel any specific reservation from any user.
- **Bulk User Reservation Cancellation:** For efficient management, admins have the power to cancel **all** reservations belonging to a particular user.
- **Secure Admin Access:** Admin permissions are enforced through Firebase Security Rules, ensuring that only authorized accounts can perform administrative actions.

## 🚀 Technologies Used

- **Frontend:**
  - [React.js](https://react.dev/) - A JavaScript library for building user interfaces.
  - [React-Bootstrap](https://react-bootstrap.netlify.app/) - For responsive and pre-built UI components.
  - [React-Icons](https://react-icons.github.io/react-icons/) - For a wide variety of customizable SVG icons.
- **Backend & Database:**
  - [Firebase Firestore](https://firebase.google.com/docs/firestore) - A flexible, scalable NoSQL cloud database to store all application data (vehicles, locations, reservations, etc.).
  - [Firebase Authentication](https://firebase.google.com/docs/auth) - For secure user registration, login, and session management.
  - **Firebase Cloud Functions** (Implicitly required for secure Razorpay integration) - For handling server-side logic like payment capture.
- **Payment Gateway:**
  - [Razorpay](https://razorpay.com/) - A leading payment gateway for online transactions.
- **Utility & Alerts:**
  - [SweetAlert2](https://sweetalert2.github.io/) - For beautiful, responsive, customizable, accessible replacement for JavaScript's popup boxes.
- **Version Control:**
  - [Git](https://git-scm.com/) - For source code management.

## ⚙️ Setup and Installation

To get UrbanCruise up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/.git](https://github.com/kkartikeysetia)
    cd UrbanCruise
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Firebase Project Setup:**

    - Create a new project in the [Firebase Console](https://console.firebase.google.com/).
    - Enable **Firestore Database** and **Firebase Authentication** (Email/Password provider).
    - Register a new web app within your Firebase project.
    - Copy your Firebase configuration object.

4.  **Configure Firebase in your project:**

    - Create a file named `firebase.js` (or similar) in your `src/config/` directory.
    - Paste your Firebase configuration into this file, replacing the placeholder values:

      ```javascript
      // src/config/firebase.js
      import { initializeApp } from "firebase/app";
      import { getFirestore } from "firebase/firestore";
      import { getStorage } from "firebase/storage";
      import { getAuth } from "firebase/auth";

      const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
      };

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const storage = getStorage(app);
      const auth = getAuth(app);

      export { app, db, storage, auth };
      ```

**🌱 Seed Your Firestore Database**

- **`vehicle/cars/{vehicleId}`**
  - Documents named `0`, `1`, `2`, etc., containing keys like `brandId`, `modelId`, `dailyRate`, and image URLs.
- **`vehicle/bikes/{vehicleId}`**
  - Similar structure for two-wheelers with fields such as `brandId`, `type`, `hourlyRate`, and specs.
- **`locations/{locationId}`**
  - ID-based records for each spot (e.g., `0: "New Delhi"`, `1: "Bengaluru"`).
- **`brands/cars/{brandId}`**
  - Lookup for car brands (e.g., `0: "Audi"`, `1: "Toyota"`).
- **`brands/bikes/{brandId}`**
  - Lookup for bike manufacturers (e.g., `0: "Kawasaki"`, `1: "Hero"`).
- **`models/cars/{brandKey}`**
  - Under each brand key (like `0` for Audi), list model IDs and names (e.g., `0: "A4"`, `1: "Q7"`).
- **`models/bikes/{brandKey}`**

  - Mirrors the cars’ setup, mapping brand IDs to bike model lists.

  **Populate your Firestore Database by either**:

- **Seeding Data:** You can run the seed script to automatically populate your database with required data for vehicles, locations, and other necessary details.
- **Importing from JSON:** If you already have the data in JSON format, simply import it to populate your Firestore database.


    To do this, you can either use the **Seed Data** or **Import Data from JSON** methods.

5.  **Set up Firebase Security Rules (Crucial for Admin Access):**

        - Go to your Firebase Console -> Firestore Database -> Rules tab.
        - Implement the following rules to secure your data and enable admin functionality. **Remember to replace `YOUR_ADMIN_USER_UID` with your actual Firebase User ID for admin access.**

          ```firestore
          rules_version = '2';

    service cloud.firestore {
    match /databases/{database}/documents {

        /* ───────────── 1.  admin check ───────────── */
        function isAdmin() {
          return request.auth != null && request.auth.uid in [
              //  ← your UID
            // , "ANOTHER_ADMIN_UID"          //  add more if needed
          ];
        }

        /* ───────────── 2.  PUBLIC catalogue reads  ───────────── */
        // vehicle/*  (brands, cars, bikes, models kept here)
        match /vehicle/{document=**} {
          allow read: if true;           // anyone can browse
          allow update, delete: if isAdmin();
          // no create via client; seed via admin script or console
        }

        // supporting lists
        match /locations/{id}            { allow read: if true; }
        match /brands/{doc=**}           { allow read: if true; }
        match /models/{doc=**}           { allow read: if true; }

        /* ───────────── 3.  Authenticated users  ───────────── */
        // fallback: all other reads require login
        match /{document=**}             { allow read: if request.auth != null; }

        /* ───────────── 4.  Rentals  ───────────── */
        match /rentals/{rentalId} {
          // create: any logged-in user, but only for their own email
          allow create: if request.auth != null
                        && request.resource.data.reservationOwner == request.auth.token.email;

          // read / update / delete:
          //   • admin can manage anyone
          //   • owner can manage their own rental
          allow read, update, delete: if isAdmin()
            || (request.auth != null
                && resource.data.reservationOwner == request.auth.token.email);
        }

        /* ───────────── 5.  Users collection (profile info) ───────────── */
        match /users/{userId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }

    }
    }

          ```

6.  **Razorpay Setup:**

    - **Create a Razorpay Account:** Sign up at [Razorpay](https://razorpay.com/).
    - **Get API Keys:** Navigate to `Settings > API Keys` in your Razorpay dashboard. Generate a new set of `Key ID` and `Key Secret`.
    - **Environment Variables:** **NEVER expose your `Key Secret` in client-side code.** For client-side (React), you only need the `Key ID`. Store both in environment variables:
      - For your **React app**: Create a `.env` file in your project root:
        ```
        REACT_APP_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID # Use rzp_test_ for sandbox
        # REACT_APP_RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET # DO NOT expose this in client-side code!
        ```
        Remember to restart your React development server (`npm start`) after adding/modifying `.env` variables.
      - **For Server-Side (Firebase Cloud Functions):** Your `Key Secret` must be used on a secure backend to capture payments.
        - Initialize Firebase Cloud Functions in your project if you haven't already: `firebase init functions`.
        - Install Razorpay SDK in your functions directory: `npm install razorpay`.
        - Set environment variables for your functions (e.g., using `firebase functions:config:set razorpay.key_id="YOUR_KEY_ID" razorpay.key_secret="YOUR_KEY_SECRET"`).
        - Your payment flow should involve:
          1.  Client (React) sends a request to a Cloud Function to "create an order."
          2.  Cloud Function uses `razorpay.orders.create()` with `Key ID` and `Key Secret`.
          3.  Cloud Function returns `order_id` to the client.
          4.  Client initializes Razorpay checkout with `order_id` and `Key ID`.
          5.  After successful payment on Razorpay pop-up, Razorpay returns a `payment_id` and `signature` to your client.
          6.  Client sends `payment_id`, `order_id`, and `signature` to another Cloud Function to "verify payment."
          7.  Cloud Function uses `razorpay.validateWebhookSignature()` or `razorpay.payments.fetch()` and `razorpay.payments.capture()` to verify and capture the payment securely using `Key ID` and `Key Secret`.

7.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```

The application should now be running in your browser, typically at `http://localhost:3000`.

## 🖥️ Usage

- **For Users:** Register an account, log in, browse cars/bikes, select dates and locations, and make reservations. During the reservation process, you will be directed through the Razorpay payment gateway. View your rentals in the "My Rentals" section.
- **For Admins:** Log in with a Firebase account whose UID is listed in the `isAdmin()` function within your Firebase Security Rules. Navigate to the admin panel (path to be defined in your routing) to manage all user reservations. \*\*For specific demo access credentials, please contact the project owner directly.

  \*\*

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
