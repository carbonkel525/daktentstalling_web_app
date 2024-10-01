import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, getDocs, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANkUUctBeDduVMiqLdpiqNeduqWrFr0Qk",
  authDomain: "daktentstalling-web-app.firebaseapp.com",
  projectId: "daktentstalling-web-app",
  storageBucket: "daktentstalling-web-app.appspot.com",
  messagingSenderId: "5946807059",
  appId: "1:5946807059:web:e07f887bfaa2fd7041c0e6",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface BoekingProps {
  ref: string;
  demontage: string;
  fullName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  typeCover: string;
  luifel: string;
}

function generateRandomRef(length: number = 15): string {
  // Zorg ervoor dat de lengte van het cijfergedeelte minstens 3 is (voor 'DTS' en 12 cijfers)
  if (length < 15) {
    throw new Error(
      "Length must be at least 15 to include 'DTS' and 12 digits."
    );
  }

  const randomDigits = Array.from({ length: length - 3 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  // Voeg 'DTS' toe aan het begin van het nummer
  return `DTS${randomDigits}`;
}


const addBoeking = async (props: BoekingProps) => {
  try {
    
    // Voeg een nieuw document toe met een gegenereerde id
    await addDoc(collection(db, "boekingen"), {
      ref: props.ref,
      demontage: props.demontage,
      fullName: props.fullName,
      email: props.email,
      phone: props.phone,
      startDate: props.startDate,
      endDate: props.endDate,
      typeCover: props.typeCover,
      luifel: props.luifel,
    });
    console.log("Boeking succesvol toegevoegd!");
  } catch (error) {
    console.error("Error bij het toevoegen van boeking: ", error);
  }
};

const getBoekingOnRef = async (ref: string) => {
  const querySnapshot = await getDocs(collection(db, "boekingen"));
  
  for (const doc of querySnapshot.docs) {  // Gebruik for...of om de loop te controleren
    if (doc.data().ref === ref) {
      return doc.data();  // Zodra de ref matcht, return de data
    }
  }

  return null;  // Als er geen match is, return null of een passende waarde
};

const removeBoekingOnRef = async (ref: string) => {
  // Zoek het document met de gegeven ref
  const querySnapshot = await getDocs(collection(db, "boekingen"));
  
  for (const doc of querySnapshot.docs) {
    if (doc.data().ref === ref) {
      // Verwijder het document met de gegeven ref
      await deleteDoc(doc.ref);
      console.log("Boeking succesvol verwijderd!");
      return;
    }
  }

  console.error("Boeking niet gevonden");
}

// Initialize Firebase
export { addBoeking, getBoekingOnRef, removeBoekingOnRef };
export default app;
