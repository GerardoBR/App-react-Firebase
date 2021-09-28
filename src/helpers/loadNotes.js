import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase/firebaseConfig"


export const loadsNotes = async ( uid )=>{

    // try {
        const notesSnap = await  getDocs(collection(db, `${uid}/journal/notes`));
    // } catch (error) {
    //     console.log(error);
    // }
   
    const notes = [];
    // console.log( notesSnap);
    notesSnap.forEach(snapHijo => {
        notes.push({
            id:snapHijo.id,
            ...snapHijo.data()
            })
    })
    return notes;
}



// const querySnapshot = await getDocs(collection(db, `${uid}/journal/notes`));
// querySnapshot.forEach((doc) => {
// console.log(`${doc.id} => ${doc.data()}`);
// });

