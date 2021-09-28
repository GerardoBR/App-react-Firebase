import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux';
import  validator from 'validator';
import { remuveError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegistrerScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state=> state.ui );
    // console.log(msgError);
    const [formValues, handleInputChange]= useForm({
        name : 'Gerardo2',
        email : 'gera2@gmail.com',
        password1 : 12345678,
        password2 : 12345678
    });

    const { name,email, password1,password2} = formValues;
    const handleRegister=(e)=>{
        // console.log(name,email,password1,password2);
        e.preventDefault();
        if(isFormValid()){
            // console.log('formulario correcto');
          dispatch(startRegisterWithEmailPasswordName(name,email, password1));
        }

    }
    const isFormValid = ()=>{
        if( name.trim().length === 0 ){
            // console.log("Name is required");
            dispatch(setError( "Name is required" ));
            return false;

        }else if(!validator.isEmail(email) ){
            // console.log("email is not valid");
            dispatch(setError( "email is not valid" ));

            return false;
        }else if ( password1 !== password2 || password1.length<8){
            // console.log("Password should be at last 6 characters")
            dispatch(setError( "Password should be at last 6 characters" ));

            return false;
        }
        dispatch(remuveError());
        return true;
    }

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <h3 className ="auth__title">Register</h3>

            <form onSubmit = { handleRegister }>
                {
                    msgError &&
                    (
                        <div className = "auth__alert">
                            { msgError }
                        </div>
                    )
                }
            <input
                    type = "text"
                    placeholder = "Name"
                    name = "name"
                    className="auth__input"
                    autoComplete = "off"
                    value =  { name }
                    onChange ={ handleInputChange }
                />
                <input
                    type = "text"
                    placeholder = "email"
                    name = "email"
                    className="auth__input"
                    autoComplete = "off"
                    onChange ={ handleInputChange }
                    value =  { email }
                />
                <input
                    type = "password"
                    placeholder = "password"
                    name = "password1"
                    className="auth__input"
                    onChange ={ handleInputChange }
                    value =  { password1 }
                />
                 <input
                    type = "password"
                    placeholder = "Confirm password"
                    name = "password2"
                    className="auth__input"
                    onChange ={ handleInputChange }
                    value =  { password2 }
                />
                <button 
                    type ="submit" 
                    className= "btn btn-primary btn-block mb-5"
                    // disabled= { true }
                >
                Register
                </button>

                
                <Link  
                    to ="/auth/login"
                    className =" link "
                >
                    Already register?
                </Link>

             

            </form>
        </div>
    )
}
