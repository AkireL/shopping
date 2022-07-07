import { useEffect, useState } from 'react';

function Item(props) {
  const [unit, setUnit] = useState(props.unit | 0);
  const [description, setDescription] = useState(props.description);
  const [price, setPrice] = useState(props.price | 0);

  useEffect(() => {
    props.updateList({
      id: props.id,
      unit,
      description,
      price: parseFloat(price),
    });
  }, [unit, description, price]);

  return (
    <div className="table-row">
      <div className="table-cell border">
        <input
          className="pl-2"
          type="number"
          value={unit}
          onChange={(e) => setUnit(parseInt(e.target.value))}
        />
      </div>
      <div className='table-cell w-auto border'>
        <input
          className="pl-2"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="table-cell w-auto border">
        <input
          className="pl-2"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className='table-cell border'>
        <button
          className='bg-red-400 hover:bg-red-500 text-white rounded-full px-2'
          onClick={() => props.deleteItem({ id: props.id })}>X</button>
      </div>
    </div>
  );
}
export default Item;
