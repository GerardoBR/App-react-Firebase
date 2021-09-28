import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { remuveError, setError } from '../../actions/ui'
import  validator from 'validator';
export const LoginScreen = () => {

    const dispatch = useDispatch();

    const {loading} = useSelector( state=> state.ui );
    // console.log(loading);
    const [ formValue, handleInputChange ]=useForm({
        email:'gera2@gmail.com',
        password : '12345678'

    })
    const { email , password } =formValue;

    const handleLogin=(e)=>{
        // console.log("hey");
        e.preventDefault();
        // console.log(email,password)
        if(isFormValid()){
            // console.log("entro");
            dispatch(startLoginEmailPassword( email,password ));
           
        }
    }
    const handleGoogleLogin=()=>{
     
        dispatch(startGoogleLogin());
    }
    const isFormValid = ()=>{
        if(!validator.isEmail(email) ){
            console.log("email is not valid");
            dispatch(setError( "email is not valid" ));
            return false;
        }
        dispatch(remuveError());
        return true;
    }
    // const handleLoginPassword=(e)=>{
    //     e.preventDefault();
    //     dispatch(startLoginEmailPassword( email,password ));
    // }

    return (
        <div  className = "animate__animated animate__fadeIn animate__faster">
            <h3 className ="auth__title">Login</h3>
            <form 
               
            onSubmit ={ handleLogin }>
                <input
                    type = "text"
                    placeholder = "email"
                    name = "email"
                    className="auth__input"
                    autoComplete = "off"
                    value = { email }
                    onChange ={ handleInputChange }
                />
                <input
                    type = "password"
                    placeholder = "password"
                    name = "password"
                    className="auth__input"
                    value= { password }
                    onChange ={ handleInputChange }
                />
                <button 
                    type ="submit" 
                    className= "btn btn-primary btn-block"
                    disabled = { loading }
                      
                >
                Login
                </button>

                <div className ="auth__social-networks">
                    <p>Login Social Networks</p>
                    <div 
                        className="google-btn"
                        onClick = { handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link  
                    to ="/auth/register"
                    className =" link "
                >
                    Create new account
                </Link>

             

            </form>
        </div>
    )
}
