import { useState } from "react";

import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  function handleClearList(){
    const confirmed = window.confirm(
      "Delete all items ?"
    );

    if(confirmed) setItems([]);
  }

  return(
    <div className="app">
      <Logo/>
      <Form onAddItems = {handleAddItem}/>
      <PackingList 
        onDeleteItem = {handleDeleteItem} 
        onToggleItem={handleToggleItem} 
        onClearList={handleClearList} 
        items={items}
      />
      <Stats items={items}/>
    </div>
  );
}