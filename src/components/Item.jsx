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
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          className="p-2 m-0 rounded-full"
          type="number"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
      </td>
      <td>
        <input
          className="p-1 m-0 rounded-full"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </td>
      <td>
        <input
          className="p-1 m-0 rounded-full "
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </td>
      <td>
        <button
          className='bg-red-400 hover:bg-red-50 text-white rounded-full px-2'
          onClick={() => props.deleteItem({ id: props.id })}>X</button>
      </td>
    </tr>
  );
}
export default Item;
