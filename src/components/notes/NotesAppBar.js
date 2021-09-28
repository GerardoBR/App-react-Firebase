import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { startSaveNotes, startUploading } from '../../actions/notes';
export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const { active}  = useSelector( state=> state.notes );

    const handleSaveNote =()=>{
        // console.log(active)
        dispatch(startSaveNotes(active));
        
    }
    const handlePicrureSave =()=>{
        document.querySelector('#fileSelector').click();

    }
    const handleFileChange=(e)=>{
        const file =e.target.files[0];
        if (file){
            dispatch(startUploading(file));
        }
    }
    return (
        <div className="notes__appbar">
            <span> today </span>
            <input
                id ="fileSelector"
                type = "file"
                name ="file"
                style = {{display : 'none' }}
                onChange = { handleFileChange }
            ></input>
            <div>
                <button 
                    className="btn"
                   onClick  ={ handlePicrureSave }
                >Picture</button>
                <button className="btn"
                    onClick = { handleSaveNote }
                 >Save</button>
            </div>
        </div>
    )
}
