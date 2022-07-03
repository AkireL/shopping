import { useEffect, useState } from 'react';
import Item from './Item';
import { v4 as uuidv4 } from 'uuid';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/solid';

function ViewCreate() {
  let params = useParams();
  const [publicId, setPublicId] = useState(params.publicId || uuidv4());
  const [listItems, setListItems] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(function () {
    if (!params.publicId) {
      return;
    }

    let listShopping = JSON.parse(window.localStorage.getItem('data'));
    let index = listShopping.findIndex((e) => e.publicId == params.publicId);
    const item = listShopping[index];

    setPublicId(item.publicId);
    setListItems(item.listItems);
    setTitle(item.title);
  }, []);

  function updateList(item) {
    const index = listItems.findIndex((e) => e.id == item.id);

    if (index === -1) {
      return;
    }

    const arrayNew = [...listItems];

    arrayNew[index] = {
      ...item,
    };

    setListItems(arrayNew);
  }

  function deleteItem(item) {
    const tmp = listItems.filter((e) => e.id != item.id);

    setListItems([...tmp]);

    let data = JSON.parse(window.localStorage.getItem('data'));

    let index = data.findIndex((v) => v.publicId == publicId);

    console.log('index'.index);
    if (index === -1) {
      return;
    }

    data[index] = { publicId, title, listItems: tmp };
    window.localStorage.setItem('data', JSON.stringify(data));
  }

  function handleCreate() {
    setListItems([
      ...listItems,
      { id: uuidv4(), unit: 0, description: '', price: 0 },
    ]);
  }

  function handleSave() {
    let data = JSON.parse(window.localStorage.getItem('data'));

    let index = data.findIndex((v) => v.publicId === publicId);

    console.table({ index, publicId });

    if (index === -1) {
      window.localStorage.setItem(
        'data',
        JSON.stringify([...data, { publicId, title, listItems }])
      );
      return;
    }

    data[index] = { publicId, title, listItems: listItems };

    window.localStorage.setItem('data', JSON.stringify(data));
  }

  return (
    <div className="container mx-auto p-8 m-10 items-center min-h-screen">
      <p className="pb-5">
        <Link
          to="/"
          className="text-white bg-green-500 hover:bg-green-200 font-medium rounded-full text-sm px-5 py-2 text-center inline-flex items-center mr-1 mb-1"
        >
          <ArrowLeftIcon className="h-4 w-4"></ArrowLeftIcon>
        </Link>
      </p>
      <label className="relative block">
        <span className="sr-only">Titulo</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg className="h-5 w-5 fill-slate-300"></svg>
        </span>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Titulo"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <table className="table w-auto divide-gray-200 my-3">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Units
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {listItems.map((item, i) => (
            <Item
              key={i}
              {...item}
              updateList={updateList}
              deleteItem={() => deleteItem(item)}
            ></Item>
          ))}
        </tbody>
      </table>
      <button
        className="rounded-full bg-blue-500 text-white p-3 hover:bg-blue-200"
        onClick={handleCreate}
      >
        +
      </button>
      <button
        className="rounded-full bg-green-500 text-white p-3 hover:bg-green-200 full
        "
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}

export default ViewCreate;
