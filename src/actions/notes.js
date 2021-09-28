import { addDoc, collection, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpalod } from "../helpers/fileUpload";
import { loadsNotes } from "../helpers/loadNotes";
import { types } from '../types/types';

export const startNotes=()=>{
    // react-journal
    return async (dispatch , getState)=>{

        const uid = getState().auth.uid;
        
        const newNote ={
            title : '',
            body :'',
            date : new Date().getTime()
        }
        try {
            
            const doc = await addDoc(collection(db, `${ uid }`, "journal/notes"),newNote);
            dispatch(activeNote(doc.id, newNote ));
            dispatch(addNewNote(doc.id ,newNote));

        } catch (error) {
            console.log(error);
        }
        // console.log("Document written with ID: ", doc);
    }
}

export const addNewNote =(id,note )=>({
    type: types.notesAddNew,
    payload : {
        id,
        ...note
    }
});
export const activeNote = (id, notes )=>(
    // console.log(id, notes)
    {
        type : types.notesActive,
        payload : {
            id,
            ...notes
        }
    }
)
export const startLoadingNotes=(uid)=>{
    return async (dispatch)=>{
        const notes = await   loadsNotes(uid);
        dispatch( setNotes( notes));
    }
}
export const setNotes =(notes)=>({
    type : types.notesLoad,
    payload : notes
})

export const startSaveNotes=( note )=>{

    return  async (dispatch , getState)=>{
        const { uid }  = getState().auth;
        if(!note.url){
            delete note.url;
        }
        const noteFirestone = {...note};
        delete noteFirestone.id;

        await updateDoc(doc(db,`${uid}/journal/notes/${note.id}`),note);
        dispatch(refreshNote(note.id,note));
        Swal.fire('Updated',"Se actualizo correctamente",'success');
    }
}

export const refreshNote = (id, note)=>({

    type : types.notesUpdated,
    payload :{
        id,
        note
    }
});

export const startUploading=(file)=>{
    return async (dispatch ,getState)=>{

        const { active:activeNote } = getState().notes;
        Swal.fire(
            {
                title : 'Uploading....',
                text  : 'Please wait..',
                allowOutsideClick : false,
                didOpen :()=>{
                    Swal.showLoading();
                }
            }
            );
        const fileUrl = await fileUpalod( file );
        activeNote.url = fileUrl;
        dispatch(startSaveNotes(activeNote))
        Swal.close();
    }
}
export const startDeleting = ( id) =>{
    return async (dispatch,getState )=>{

        const uid = getState().auth.uid;
        // console.log(uid, id);
        Swal.fire(
            {
                icon :'info',
                title : 'Deleting....',
                text  : 'Please wait..',
                allowOutsideClick : false,
                didOpen :()=>{
                    Swal.showLoading();
                }
            }
            );
        await deleteDoc(doc(db,`${uid}/journal/notes/${id}`)); 
        dispatch(deleteNote(id));
        Swal.close()
    }
}
export const deleteNote =( id ) =>({
    type:types.notesDelete,
    payload : id
});

export const noteLogout =()=>({
    type: types.notesLogoutCleaning
})