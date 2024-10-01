import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDoc, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANkUUctBeDduVMiqLdpiqNeduqWrFr0Qk",
  authDomain: "daktentstalling-web-app.firebaseapp.com",
  projectId: "daktentstalling-web-app",
  storageBucket: "daktentstalling-web-app.appspot.com",
  messagingSenderId: "5946807059",
  appId: "1:5946807059:web:e07f887bfaa2fd7041c0e6"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface BoekingProps {
  demontage: boolean;
  fullName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  typeCover: string;
  luifel: boolean;
}


const addBoeking = async (props: BoekingProps) => {
  try {
    // Voeg een nieuw document toe met een gegenereerde id
    await addDoc(collection(db, "boekingen"), {
      demontage: props.demontage,
      fullName: props.fullName,
      email: props.email,
      phone: props.phone,
      startDate: props.startDate,
      endDate: props.endDate,
      typeCover: props.typeCover,
      luifel: props.luifel
    });
    console.log("Boeking succesvol toegevoegd!");
  } catch (error) {
    console.error("Error bij het toevoegen van boeking: ", error);
  }
};


// Initialize Firebase

export { addBoeking };
export default app;