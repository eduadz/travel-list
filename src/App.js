import { useState } from "react";

export default function App(){ 
  const [items, setItems] = useState([]);

  function handleAddItem(item){
    setItems(items => [...items, item]) //Utilizando spread operator
  }
  function handleDeleteItem(id){
    setItems(items => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id){
    setItems((items) => 
      items.map((item) => 
        item.id === id ? {...item, packed: !item.packed} : item));
  }

  return(
    <div className="app">
      <Logo/>
      <Form onAddItems = {handleAddItem}/>
      <PackingList onDeleteItem = {handleDeleteItem} onToggleItem={handleToggleItem} items={items}/>
      <Stats items={items}/>
    </div>
  );
}

function Logo(){
  return <h1> Far Away</h1>
}

function Form({onAddItems}){
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

function PackingList({items, onDeleteItem, onToggleItem}){
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") sortedItems = items
    .slice()
    .sort((a,b) => a.description.localeCompare(b.description));

  if(sortBy === "packed") sortedItems = items
    .slice()
    .sort((a,b) => Number(a.packed) - Number(b.packed) );

  return( 
    <div className="list">
      <ul> 
        {sortedItems.map((item) =>
        <Item
          itemObj = {item}
          onDeleteItem = {onDeleteItem}
          onToggleItem = {onToggleItem}
          key = {item.id}
        />
        )}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input Order</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed Status</option>
        </select>
      </div>
    </div>
  );
}

function Item({itemObj, onDeleteItem, onToggleItem}){
  return(
    <li>
      <input type="checkbox" value = {itemObj.packed} onChange={() => onToggleItem(itemObj.id) } ></input>
      <span style={itemObj.packed ? {textDecoration:"line-through"} : {}}> {itemObj.quantity} {itemObj.description}</span>
      <button onClick={() => onDeleteItem(itemObj.id)}>❌</button>
    </li>
  );
}

function Stats({items}){
  const quantityItems = items.length;
  const quantityPackeds = items.filter((item) => item.packed).length;

  const perc = Math.round((quantityPackeds/quantityItems)*100);

  return(
  <footer className="stats">
    <em>You have {quantityItems} items on your list, and you already packed {quantityPackeds} ({perc}%)</em>
  </footer>
  );
}