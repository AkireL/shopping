import { useState } from "react";
import Item from "./Item";
import { v4 as uuidv4 } from 'uuid';


function ViewCreate() {
    const [listItems, setListItems] = useState([]);

    function updateList(item) {
        const index = listItems.findIndex((e) => e.id == item.id);

        if (index === -1) {
            return;
        }

        const arrayNew = [...listItems];

        arrayNew[index] = {
            ...item
        };

        setListItems(arrayNew);
    }

    function handleNew() {
        setListItems([...listItems, {id:uuidv4(),  unit:0, description:'', price:0}]);
    }


    return (
        <>
            <label>Title</label>
            <input type="text"/>
            <hr/>
            <button onClick={handleNew}>+</button>
            <table>
                <thead>
                    <tr>
                        <th>Units</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listItems.map((item, i) => (
                            <Item key={i} {...item} updateList={updateList}></Item>
                        ))
                    }
                </tbody>
            </table>
            <button>Save</button>
        </>
    )
}

export default ViewCreate;