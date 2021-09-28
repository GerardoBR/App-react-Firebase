import Swal from 'sweetalert2'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "@firebase/auth";
import { googleAuthProvider } from "../firebase/firebaseConfig";
import { types } from "../types/types"
import { finishLoading, startLoading }  from '../actions/ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword=(email,password)=>{
    return(dispatch)=>{
        dispatch(startLoading());
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // console.log(user)
            dispatch(login(user.uid, user.displayName));    
            dispatch(finishLoading());
            // ...
          })
          .catch((error) => {
            //   console.log( error);
              dispatch(finishLoading());
              Swal.fire('Error',error.message,'error');
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // ..
          });
    }
}

export const startRegisterWithEmailPasswordName=(name, email,password)=>{
    return(dispatch)=>{

        const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then( async({ user }) => {
 
                await updateProfile( user, { displayName: name });
                dispatch(login(user, user.displayName))    
            // console.log(user.uid, name);
        }).catch(e=>{
            let mns  = "";
            // console.log(e.message === 'Firebase: Error (auth/email-already-in-use).');
            if(e.message === 'Firebase: Error (auth/email-already-in-use).'){
                
                mns = "email-already-in-use";
            }
            Swal.fire('Error',mns,'error');
        });
    
    }
}
export const startGoogleLogin=()=>{

    return (dispatch)=>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                // console.log(user);
                dispatch(login(user.uid, user.displayName))
            });
    }
}


export const login=(uid,displayName)=>({

        type :types.login,
        payload :{
            uid,
            displayName
        }
});

export const  Startlogout=()=>{
    return async ( dispatch )=>{
        const auth = getAuth();
           signOut(auth)
           dispatch(logout());
           dispatch(noteLogout());
        //    .then(() => {
        //         dispatch(logout());
        //         dispatch(noteLogout());
        //     }).catch((error) => {

        //         console.log(error);
        //     });
    }
}
export const logout =()=>({
    type : types.logout
})