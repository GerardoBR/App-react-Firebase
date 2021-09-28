import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; //ES6 modules
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom'
import { LoginScreen } from "../../../components/auth/LoginScreen"
import '@testing-library/jest-dom'
import { startGoogleLogin ,startLoginEmailPassword} from '../../../actions/auth';


jest.mock('../../../actions/auth',()=>({
    startGoogleLogin : jest.fn(),
    startLoginEmailPassword : jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const intstate  =  {
    auth :{},
    ui : {
        loading:false,
        msgError:null
    },

};
let  store = mockStore(intstate);

store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store = {store}>
        <MemoryRouter>
            <LoginScreen/>

        </MemoryRouter>
    </Provider>
    );
describe('Pruebas en el componente <LoginScreen/>', () => {

    beforeEach(()=>{
        store = mockStore (intstate);
        jest.clearAllMocks();
    });

    test('debe de hacer el Match ', () => {
        
        expect(wrapper).toMatchSnapshot();

    });

    test('debe de disparar la accion de googlg button startGoogleLogin', () => {
        
        wrapper.find('.google-btn').prop('onClick')();

        expect ( startGoogleLogin).toHaveBeenCalled();

    });

    test('debe de disparar el button de startLogin con los respectivos argumentos ', () => {
        
        const formSubmit = wrapper.find('form').prop('onSubmit');
        
        formSubmit({preventDefault(){}});
        expect( startLoginEmailPassword ).toHaveBeenCalledWith( expect.any(String),expect.any(String))
    });
    
    
    
    
})
