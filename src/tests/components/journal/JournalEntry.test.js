import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; //ES6 modules
import { mount } from "enzyme";
import { Provider } from "react-redux";

import { MemoryRouter } from 'react-router';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';



const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const intstate  =  {};

let  store = mockStore(intstate);

store.dispatch = jest.fn();

const notes = {
    id : 10 , 
    date :0 ,
    title: 'title',
    body : 'body', 
    url : 'https:google.com'
}
const wrapper = mount(
    <Provider store = { store }>
        <MemoryRouter>
            <JournalEntry   { ...notes } />
        </MemoryRouter>

    </Provider>
    );




describe('Pruebas en <JournalEntry/>', () => {
    

    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper).toMatchSnapshot();
    });

    test('debe de llamarse activeNote', () => {
        
        wrapper.find('.journal__entry').prop('onClick')();

        expect( store.dispatch).toHaveBeenCalled();
        expect( store.dispatch).toHaveBeenCalledWith(
           activeNote( notes.id ,{...notes} )
        );


    })
    

    
})
