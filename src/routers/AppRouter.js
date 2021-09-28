import { getAuth, onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,

  } from "react-router-dom";
import { login } from '../actions/auth';
import {  startLoadingNotes } from '../actions/notes';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRouter';
import { PublicRoute } from './PublicRouter';

export const AppRouter = () => {


    const [checking, setChecking] = useState(true);
    const [isLoggedInt, setIsLoggedInt] = useState(false);



    const dispatch =useDispatch();
    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) =>{
            // console.log(user);
            if(user?.uid){
                dispatch(login(user.uid,user.displayName));
                setIsLoggedInt(true);
               
               dispatch(startLoadingNotes(user.uid));
            }else{
                setIsLoggedInt(false);
            }
            setChecking(false);
        })
    },[dispatch,setChecking,setIsLoggedInt]);

    if(checking ){
        return (
            <h1>Espere...</h1>
        );
    }
    return (

            <Router>
                <div>
                    <Switch>
                        <PublicRoute
                            path="/auth" 
                            component = { AuthRouter }    
                            isLoggedInt = { isLoggedInt }            


                        />
                        <PrivateRoute
                            exact path="/" 
                            component = { JournalScreen }
                            isLoggedInt = { isLoggedInt }
                        />
                    </Switch>

                </div>
            </Router>

    )
}
