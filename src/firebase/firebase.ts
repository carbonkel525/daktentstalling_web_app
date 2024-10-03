import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  typeCover: string;
  luifel: string;
}

const addBoeking = async (props: BoekingProps) => {
  try {
    // Voeg een nieuw document toe met een gegenereerde id
    await addDoc(collection(db, "boekingen"), {
      ref: props.ref,
      demontage: props.demontage,
      firstName: props.firstName,
      lastName: props.lastName,
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

  for (const doc of querySnapshot.docs) {
    // Gebruik for...of om de loop te controleren
    if (doc.data().ref === ref) {
      return doc.data(); // Zodra de ref matcht, return de data
    }
  }

  return null; // Als er geen match is, return null of een passende waarde
};

const removeBoekingOnRef = async (ref: string) => {
  const querySnapshot = await getDocs(collection(db, "boekingen"));

  for (const doc of querySnapshot.docs) {
    if (doc.data().ref === ref) {
      // Verwijder het document met de gegeven ref
      await deleteDoc(doc.ref);
      console.log("Boeking succesvol verwijderd!");
      return;
    }
  }
};

interface StallingProps {
  tenantFirstName: string;
  tenantLastName: string;
  startDate: string;
  endDate: string;
  status: string;
  tenantEmail: string;
}

const addStalling = async (props: StallingProps) => {
  try {
    await addDoc(collection(db, "stalling"), {
      tenantFirstName: props.tenantFirstName,
      tenantLastName: props.tenantLastName,
      startDate: props.startDate,
      endDate: props.endDate,
      status: props.status,
      tenantEmail: props.tenantEmail,
    });
    console.log("Stalling succesvol toegevoegd!");
  } catch (error) {
    console.error("Error bij het toevoegen van stalling: ", error);
  }
};

// Initialize Firebase
export { addBoeking, getBoekingOnRef, removeBoekingOnRef, addStalling };
export default app;
