export default function Item({itemObj, onDeleteItem, onToggleItem}){
return(
    <li>
    <input type="checkbox" value = {itemObj.packed} onChange={() => onToggleItem(itemObj.id) } ></input>
    <span style={itemObj.packed ? {textDecoration:"line-through"} : {}}> {itemObj.quantity} {itemObj.description}</span>
    <button onClick={() => onDeleteItem(itemObj.id)}>❌</button>
    </li>
);
}