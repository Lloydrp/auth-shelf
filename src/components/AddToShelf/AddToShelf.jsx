import { useState } from "react";
import { useDispatch } from "react-redux";

function AddToShelf() {
    const [description, setDescription] = useState('');
    const [urlPath, setUrlPath] = useState('');
    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch({
            type: 'ADD_TO_SHELF',
            payload: {
                description,
                image_url: urlPath
            }
        });
        setDescription('');
        setUrlPath('');
    }

    return (
        
        <div>
        <h2>Add Item</h2>
        <label>Description
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>Image Url
        <input value={urlPath} onChange={(e) => setUrlPath(e.target.value)} />
        </label>
        <button onClick={handleAdd}>Add</button>
        <p></p>
        </div>

        
    )
}

export default AddToShelf;