

export default function Stats({items}){
const quantityItems = items.length;
const quantityPackeds = items.filter((item) => item.packed).length;

const perc = Math.round((quantityPackeds/quantityItems)*100);

return(
<footer className="stats">
    <em>You have {quantityItems} items on your list, and you already packed {quantityPackeds} ({perc >0 ? perc:0}%)</em>
</footer>
);
}