 /**
 * @jest-environment node
 */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; //ES6 modules
import { login, logout, startLoginEmailPassword, Startlogout } from "../../actions/auth"
import { types } from "../../types/types";
import '@testing-library/jest-dom'
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const intstate  =  {
    auth :{
        uid : 'PJR5wrrksadEtnFCwNjLlIojKIF2',
        name : 'Test'
    },
    notes :{
        active :{
            id : '8R3smenBgI8i8mnfMRe0',
            title : 'Hola',
            body : 'Hoy es viernes'
        }
    }
};
let  store = mockStore(intstate);

describe('Pruebas en la action Auht', () => {

    
    beforeEach(()=>{
        store = mockStore (intstate);
    });
    test('login y logout bebe de crear la accion respectiva', () => {
        const auth ={
            uid : 'TESTING',
            displayName : 'TEST'
        }
        const actionLogin = login( auth.uid , auth.displayName);
        const actionLogout = logout( );
        expect ( actionLogin ).toEqual({
            type: types.login,
            payload:auth
        });
        // console.log(actionLogout);
        expect( actionLogout ).toEqual({
            type: types.logout
        })

    });
    test('Debe de realizar el loggout',async () => {
        
        await store.dispatch(Startlogout());
        const actions = store.getActions();
       expect ( actions[0]).toEqual({
           type: types.logout
       });
       expect ( actions[1]).toEqual({
        type: types.notesLogoutCleaning
        });
    });
    test('debe de iniciar el startLoginEmailPassword', async () => {

        await store.dispatch(startLoginEmailPassword('testing@testing.com','123456789'));

        const action = store.getActions();
        // console.log(action);
        expect ( action[0]).toEqual({
            type: types.uiStartLoading
        });
        expect ( action[1]).toEqual({
            type: types.login,
            payload : {
                uid : expect.any(String),
                displayName : null
            }
        });
        expect( action[2] ).toEqual({
            type: types.uiFinishLoading
        })
    })
    
    

    
})
