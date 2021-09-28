import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const dispatch = useDispatch();
    const { active:notes} = useSelector(state => state.notes);


    const [ formValues, handleInputChange,reset ]= useForm( notes );

    const {  title,body } = formValues;

    const activeId = useRef(notes.id);
    const activeUrl = useRef(notes.url);

    useEffect(() => {
        if(notes.id !== activeId.current){
            reset( notes );
            activeId.current = notes.id
        }
        if(notes.url !== activeUrl.current){
            reset( notes );
            activeUrl.current = notes.url
        }
        
    }, [notes,reset])

    useEffect(() => {
        dispatch(activeNote(formValues.id ,{...formValues }));
    }, [formValues,dispatch]);

    const handleDelete=()=>{
        // console.log(notes.id);
        dispatch(startDeleting(notes.id));
    }
    return (
        <div className="notes__main-content">
            <NotesAppBar/>

            <div className="notes__content">
                {/* <form> */}
                    <input 
                        type= "text"
                        placeholder = "Some awesome title"
                        autoComplete = "off"
                        className="notes__title-input"
                        value = { title }
                        onChange = { handleInputChange }
                        name = "title"
                    />
                    <textarea 
                        placeholder=" What happen today" 
                        className="notes__text-area"
                        value = { body  }
                        onChange = { handleInputChange }
                        name = "body"
                    >
                    </textarea>
                    {
                        (notes.url)&&
                        (
                            <div className="notes__image">
                                <img 
                                    src ={ notes.url }
                                    alt="imagen"
                                />
                            </div>
                        )
                    }
                {/* </form> */}
            </div>
            <button
                className = "btn btn-danger"
                onClick = { handleDelete }
            >Delete </button>
        </div>
    )
}
