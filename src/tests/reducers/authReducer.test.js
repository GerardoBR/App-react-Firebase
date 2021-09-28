import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas al authReducer', () => {
    const auth = {
        id : 1,
        desc :' Aprender react',
        done : false
    }
    
    test('debe de retornar el estado por defecto', () => {
        const initialState = {
            uid : 'abac',
            name : 'Gerardo'
        }
        const action = {
            type : 'nuevo'
        }
        const state = authReducer(initialState,action );  

        expect ( state ).toEqual(initialState);
     });
     test('debe de retornar un nuevo estado Login', () => {
        const action  = {
            type : types.login,
            payload : {
                uid: ' asjdaskdasdsad',
                displayName :'Gerardo'
            }
        }
        const state = authReducer({},action );  
        expect ( state ).toEqual({
            uid: ' asjdaskdasdsad',
            name :'Gerardo'
        });
     });
     test('debe de retornar un objeto vacio Logout', () => {
         const initialState= {
             uid : 'abc',
             name : 'Gerardo'
         }
        const action  = {
            type : types.logout,
        }
        const state = authReducer(initialState,action );  
        expect ( state ).toEqual({});
     });
    
})
