import React, { useState } from 'react';

const AddForm = ({add}) => {
    const initialState = {
        name: "",
        description: "",
        recipeSteps: "",
        serve: "",
        
    }
    const [formData, setFormData] = useState(initialState)
    const [type, setType] = useState("drink");
    const [isInvalid, setIsInvalid] = useState(true)
    const [isTouched, setIsTouched] = useState(false)

   /* make fields editable**/ 
    const handleChange = e => {
        setIsTouched(true);
        const { name, value } = e.target;
        if (value === ''){
            setIsInvalid(true);
        } else{
            setIsInvalid (false); 
        }
        if (e.target.name === "type") setType(e.target.value);
        setFormData(data => ({
            ...data,
            [name]: value
    }))
    }
/* alert that displays new menu item added**/
    const handleSubmit = (e) => {
        e.preventDefault(); 
        add({...formData})    
        const {name, type} = formData;
        if (!isInvalid){
        alert(`You have sucessfully added ${name} to the ${type} menu!`)
        setFormData(initialState)
    }
}
/* Menu Item Form **/    
    return (
        
        
        <div class =  'form-box'>
            <h1 class = "title"> Add a New Menu Item</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="type">Item Type &nbsp; &nbsp; &nbsp; </label>
            <select value={type} onChange={handleChange} name="type">
                <option value="drink">Drink</option>
                <option value="snack">Snack</option>
            </select>
            <br></br>
            <label htmlFor="name">Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </label>
            <input
                required
                id="name"
                type="text"
                name="name"
                placeholder="Name your creation"
                value={formData.name}
                onChange={handleChange}
            /> 
            <br></br>
            <label htmlFor='description'>Description &nbsp; </label>
            <input 
            type="text" 
            placeholder="Describe Your Creation" 
            name="description"
            id = "description" 
            value={formData.description} 
            onChange={handleChange}/>
            <br></br>

            <label htmlFor='recipe'>Recipe &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </label>
            <input 
            type="text" 
            placeholder="Add Recipe Steps" 
            name="recipeSteps"
            id = "recipeSteps"
            value={formData.recipeSteps} 
            onChange={handleChange}/>

            <br></br>
            <label htmlFor='serve'>Serve &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </label>
            <input 
            type="text" 
            placeholder="How to serve" 
            name="serve"
            id = "serve" value={formData.serve} 
            onChange={handleChange}/>
        </form>
        {isInvalid && isTouched && <text style= {{ color: 'red'}}>{"\n"}
        All fields are required!</text>}
        <br></br>
        <button onClick={handleSubmit}>Submit!</button>
        </div>
    )
}
	
	

	
	

export default AddForm;