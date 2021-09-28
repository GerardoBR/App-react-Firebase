import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; //ES6 modules
import { mount } from "enzyme";
import { Provider } from "react-redux";

import { MemoryRouter } from 'react-router';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';


jest.mock('../../../actions/notes',()=>({
    activeNote : jest.fn(),
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
        active : {
            id : 1234,
            title : 'HOLA',
            body : 'mundo',
            date : 0
        }
    }

};
let  store = mockStore(intstate);

store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store = { store }>
        <MemoryRouter>
            <NoteScreen/>
        </MemoryRouter>

    </Provider>
    );
describe('pruebas en el componente <NoteScreen/>', () => {
    test('debe mostrarse correctamente', () => {
        

        expect(wrapper).toMatchSnapshot();
    })
    
    test('debe de disparar el activeNote', () => {

        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name : 'title',
                value : 'Hola de nuevo'
            }
        })  ;

        expect(activeNote).toHaveBeenLastCalledWith(
            1234,{
                body :'mundo',
                title :'Hola de nuevo',
                id : 1234,
                date : 0
            }
        );
    })
    
})
