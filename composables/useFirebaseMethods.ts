import { useFirebase } from "./useFirebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

export const useFirebaseMethods = () => {
    const { firestore } = useFirebase();

    const setQuizData = async (collectionName: string, data: { [key: string]: string | object }) => {
        const newQuizRef = doc(collection(firestore, collectionName));
        await setDoc(newQuizRef, data);
    }
    const getQuizs = async (collectionName: string) => {
        const querySnapshot = await getDocs(collection(firestore, collectionName));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    }
    return {
        setQuizData,
        getQuizs
    }
}