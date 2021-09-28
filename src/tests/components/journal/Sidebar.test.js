import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; //ES6 modules
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { Sidebar } from "../../../components/journal/Sidebar";
import { MemoryRouter } from 'react-router';
import { startNotes } from '../../../actions/notes';
import { Startlogout } from '../../../actions/auth';

jest.mock('../../../actions/auth',()=>({
    Startlogout : jest.fn(),
}));
jest.mock('../../../actions/notes',()=>({
    startNotes : jest.fn(),
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const intstate  =  {
    auth :{
        uid : 'CwKANwk9NATm6WKR6dqn8zJzuIh2',
        name : 'TEST'
    },
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


describe('Pruebas en <Sidebar/>', () => {
    // beforeEach(()=>{
    //     store = mockStore (intstate);
    //     jest.clearAllMocks();
    // });
    const wrapper = mount(
    <Provider store = { store }>
        <MemoryRouter>
            <Sidebar/>
        </MemoryRouter>

    </Provider>
    );

    test('debe e mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('debe de llamar el Logout', async () => {
        
        const btn = wrapper.find('button').simulate('click');
         expect( Startlogout ) .toHaveBeenCalled();


        
    });
    test('debe de llamar el startNewLoud', () => {
        const btn = wrapper.find('.journal__new-entry').simulate('click');
         expect( startNotes ) .toHaveBeenCalled();
    })
    
    
    
    
    
})
