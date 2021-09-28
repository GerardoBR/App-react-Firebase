 /**
 * @jest-environment node
 */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; //ES6 modules
import { collection, deleteDoc, doc, getDoc, getDocs } from '@firebase/firestore';
import { startLoadingNotes, startNotes, startSaveNotes, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
jest.mock("../../helpers/fileUpload", () => {
    return {
        fileUpalod: () => {
        return Promise.resolve("https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png");
      },
    };
});

const intstate  =  {
    auth :{
        uid : 'TESTING',
    },
    notes :{
        active :{
            id : '8R3smenBgI8i8mnfMRe0',
            title : 'Hola',
            body : 'Hoy es viernes'
        }
    }

}
 
let  store = mockStore(intstate);

describe('Pruebas al action Notes', () => {
    beforeEach(()=>{
        store = mockStore (intstate);
    })
    test('debe de crear una nueva nota StartNewNote ',async () => {
        
        await store.dispatch(startNotes());
        const action = store.getActions();
        const id = action[1].payload.id;
        expect ( action[0]).toEqual({
            type : types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
              }
        });

        expect ( action[1]).toEqual({
            type : types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
              }
        });

        // docId
        // console.log(`TESTING/journal/notes/${id}`);
        await deleteDoc(doc(db,`TESTING/journal/notes/${id}`)); 
    });
    test('debe cargar las notas', async() => {
        
        await store.dispatch(startLoadingNotes('TESTING'));

        const action = store.getActions();
        // console.log(action);

        expect( action[0] ).toEqual({
            type:types.notesLoad,
            payload:expect.any(Array)
        });
        const expected = {
            id : expect.any(String),
            title : expect.any(String),
            body : expect.any(String),
            date : expect.any(Number),
        }
        expect( action[0].payload[0]).toMatchObject(expected);

    });

    test('startSaveNote debe de actualizar la nota',async () => {
        const notes ={
            id : '8R3smenBgI8i8mnfMRe0',
            title : 'Saludos desde Test',
            body : 'Solo debo probar StartSaveNotes',
        }
        await store.dispatch(startSaveNotes(notes));

        const actions = store.getActions();
        // console.log(actions);

        expect( actions[0].type).toBe(types.notesUpdated);

        const docRef = await  getDoc(doc(db, `TESTING/journal/notes/${notes.id}`));
        expect(docRef.data().title).toBe(notes.title);
    });

    test('startUploading debe de regresar un URL', async () => {
        
        const file = [];

        await store.dispatch(startUploading( file ));
        
        const docRef = await  getDoc(doc(db, `TESTING/journal/notes/8R3smenBgI8i8mnfMRe0`));
        expect( docRef.data().url).toBe('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
    })
    
    
    
    
})
