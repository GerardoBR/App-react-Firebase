import { types } from "../../types/types"

describe('Pruebas en el objeto types', () => {
    test('debe de ser igual al objeto de types.js', () => {

        expect ( types ).toEqual ({
            
                login : '[auth] Login',
                logout : '[auth] Logout',
            
                uiSetError : '[UI] set Error',
                uiRemoveError : '[UI] Remove Error',
            
                uiStartLoading: '[UI] Start loading',
                uiFinishLoading: '[UI] Finish loading',
            
                notesAddNew : '[Notes] New notes',
                notesActive : '[Notes] Set active notes',
                notesLoad : '[Notes] Load notes',
                notesUpdated : '[Notes] Update notes saved',
                notesFileUrl : '[Notes] Update  image URL',
                notesDelete  : '[Notes] Delete  image URL',
                notesLogoutCleaning : '[Notes] Logout  Cleaning',
            
        });
    })
    
})
