import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; //ES6 modules
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { RegistrerScreen } from "../../../components/auth/RegistrerScreen";
import { MemoryRouter } from 'react-router';
import { types } from '../../../types/types';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const intstate  =  {
    auth :{},
    ui : {
        loading:false,
        msgError:null
    },
    notes : {
        notes :[],
        active : null
    }

};
let  store = mockStore(intstate);

// store.dispatch = jest.fn();
const wrapper = mount(
<Provider store = { store }>
    <MemoryRouter>
        <RegistrerScreen/>
    </MemoryRouter>
</Provider> 
);

describe('Pruebas en el componente <RegisterScreen/> ', () => {


    // beforeEach(()=>{
    //     store = mockStore (intstate);
    //     // jest.clearAllMocks();
    // });

    test('debe mostrarse correctamente con el Snapshoot', () => {

        expect(wrapper).toMatchSnapshot();
    });
    test('debe de hacer el dispatch de la accion respectiva', () => {

        const emailFile = wrapper.find('input[name="email"]');
        
        emailFile.simulate('change',{
            target : {
                value : '',
                name : 'email'
            }
        })
        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });
        const action  = store.getActions();
        // console.log(action);
        expect( action[0]).toEqual({
            type: types.uiSetError,
            payload :'email is not valid'
        })

    });
    test('Debe de mostrar la alerta del error ', () => {
        
        const intstate  =  {
            auth :{},
            ui : {
                loading:false,
                msgError:'email is not valid'
            },
            notes : {
                notes :[],
                active : null
            }
        
        };
        const  store = mockStore(intstate);

        // store.dispatch = jest.fn();
        const wrapper = mount(
        <Provider store = { store }>
            <MemoryRouter>
                <RegistrerScreen/>
            </MemoryRouter>
        </Provider> 
        );
        

        expect(wrapper.find('.auth__alert').exists()).toBe(true);
        expect(wrapper.find('.auth__alert').text().trim()).toBe(intstate.ui.msgError);

    })
    
    

    
    
})
