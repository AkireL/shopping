import { useEffect, useState } from "react";

function Item(props) {
    const [unit, setUnit] = useState(props.unit);
    const [description, setDescription] = useState(props.description);
    const [price, setPrice] = useState(props.price);

    useEffect(() => {
        props.updateList(
            {id: props.id, unit, description, price}
        ); 
    }, [unit, description, price]); 

    return(
        <tr>
            <td><input type="number" value={unit} onChange={(e) => setUnit(e.target.value)}/></td>
            <td><input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/></td>
            <td><input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/></td>
        </tr>
    );
}
export default Item;
