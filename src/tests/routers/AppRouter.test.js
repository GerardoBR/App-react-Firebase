import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; //ES6 modules
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom'

import '@testing-library/jest-dom'

import { AppRouter } from '../../routers/AppRouter';
import {  getAuth, signInWithEmailAndPassword} from "@firebase/auth";
import { act } from '@testing-library/react'
import { login } from '../../actions/auth';



jest.mock('../../actions/auth',()=>({
    login : jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const intstate  =  {
    auth :{},
    ui : {
        loading:false,
        msgError:null
    },
    notes :{
        notes :[],
        active : null
    }

};
let  store = mockStore(intstate);

store.dispatch = jest.fn();



describe('Pruebas en el componentes <AppRouter/> ', () => {
    
    test('debe de llamar el login si estoy autenticado ', async() => {
        let user ;
         await act(async ()=>{


            const auth = getAuth();
            const userCredential =await signInWithEmailAndPassword(auth, 'testing@testing.com', '123456789');
            user = userCredential.user;
            // console.log(userCredential);

            const wrapper = mount(
                <Provider store = {store}>
                    <MemoryRouter>
                        <AppRouter/>
            
                    </MemoryRouter>
                </Provider>
                );
        });
        expect( login ).toHaveBeenCalled();
        expect( login ).toHaveBeenCalledWith('CwKANwk9NATm6WKR6dqn8zJzuIh2',null);

    });


    

})
