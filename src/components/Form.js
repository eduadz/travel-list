import { useState } from "react";

export default function Form({onAddItems}){
const [description, setDescription] = useState("");
const [quantity, setQuantity] = useState(1);

function HandleSubmit(e){
    e.preventDefault() // Evitar que o forms atualize a pagina ao dar submit
    
    if (!description) return;
    const newItem = { description, quantity, packed: false , id: Date.now()};
    onAddItems(newItem);
} 

return (
    <form className="add-form" onSubmit={HandleSubmit}>
    <h3>What you need for your trip ?</h3>
    <select value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
        {Array.from({length:20}, (_,i) => i + 1).map(num=>
        <option value={num} key={num}>
            {num}
        </option>)}
    </select>
    <input type="text" placeholder="Item..." value={description} onChange={(e)=>setDescription(e.target.value)}></input>
    <button className="buttons">ADD</button>
    </form>
);
}