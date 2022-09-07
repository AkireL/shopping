import { useEffect, useState } from 'react';

function Item(props) {
  const [unit] = useState(props.unit | 0);
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
      <div className='table-cell w-80 border'>
        <input
          className="pl-2 w-full"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="table-cell border">
        <input
          className="w-20"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className='table-cell border px-3'>
        <button
          className='bg-red-400 hover:bg-red-500 text-white rounded-full px-2 text-sm'
          onClick={() => props.deleteItem({ id: props.id, description })}>X</button>
      </div>
    </div>
  );
}
export default Item;
