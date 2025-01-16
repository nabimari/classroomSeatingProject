import {  doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


// Cache the API key in memory
let cachedApiKey = null;

export const fetchApiKey = async () => {
    // Return the cached key if it's already fetched
    if (cachedApiKey) {
        console.log("Returning cached API key");
        return cachedApiKey;
    }

    try {
        console.log("Fetching API key from Firestore");
        // Reference to the 'config/aapiKey' document
        const docRef = doc(db, "config", "apiKey");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Store the API key in memory
            cachedApiKey = docSnap.data().apiKey; // Make sure this matches your field name
            return cachedApiKey;
        } else {
            throw new Error("API Key not found in Firestore");
        }
    } catch (error) {
        console.error("Error fetching API Key:", error);
        throw error;
    }
};
