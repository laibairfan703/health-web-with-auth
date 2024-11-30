// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv7OI1wxjSGVKcziJONKz-1cbIrGRtLAE",
  authDomain: "health-af0ee.firebaseapp.com",
  projectId: "health-af0ee",
  storageBucket: "health-af0ee.appspot.com",
  messagingSenderId: "821579966898",
  appId: "1:821579966898:web:ff76d62dc8a3e50d929cab",
  measurementId: "G-DPFCHP8R7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");

  if (!form) {
    console.error("Form with ID 'bookingForm' not found.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form refresh

    // Get form values
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;
    const address = document.getElementById("address")?.value;
    const phone = document.getElementById("phone")?.value;

    console.log("Form submitted with values:", { email, password, address, phone });

    if (!email || !password || !address || !phone) {
      alert("All fields are required.");
      return;
    }

    try {
      // Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User created:", user);

      // Save additional data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        address,
        phone
      });

      alert("Account created successfully!");
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      alert(`Error: ${error.message}`);
    }
  });
});
console.log("Firebase initialized successfully.");
console.log("Form submitted.");
