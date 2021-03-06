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
  const [createdAt, setCreatedAt] = useState((new Date()));

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
    setCreatedAt(item.createdAt ? new Date(item.createdAt): createdAt);
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

    data[index] = { publicId, title, listItems: tmp, createdAt };
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

    if (index === -1) {
      window.localStorage.setItem(
        'data',
        JSON.stringify([...data, { publicId, title, listItems, createdAt }])
      );
      return;
    }

    data[index] = { publicId, title, listItems: listItems, createdAt };

    window.localStorage.setItem('data', JSON.stringify(data));
  }

  return (
    <div className="container mx-auto p-8 m-10 items-center min-h-screen bg-gray-100">
      <h2 className='text-center font-medium font-bold text-gray-500 text-2xl'>Lista</h2>
      <p className="pb-5">
        <Link
          to="/"
          className="text-white bg-green-400 hover:bg-green-500 font-medium rounded-full text-sm px-5 py-2 text-center inline-flex items-center mr-1 mb-1"
        >
          <ArrowLeftIcon className="h-4 w-4"></ArrowLeftIcon>
        </Link>
      </p>
      <p className='text-right text-gray-500 mb-1'>{createdAt.toLocaleDateString('us-EN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <label className="relative block">
        <span className="sr-only">Titulo</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg className="h-5 w-5 fill-slate-300"></svg>
        </span>
        <input
          className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Titulo"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="table w-full my-3 border">
                <div className="table-header-group bg-gray-200 text-gray-500">
                  <div className="table-row">
                    <div className="text-sm table-cell w-auto border text-center">
                      Unidades
                    </div>
                    <div className="text-sm table-cell w-auto border text-center">
                      Descripci??n
                    </div>
                    <div className="text-sm table-cell w-auto border text-center">
                      Precio
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className="table-row-group bg-white divide-y divide-gray-200">
                  {listItems.map((item, i) => (
                    <Item
                      key={i}
                      {...item}
                      updateList={updateList}
                      deleteItem={() => deleteItem(item)}
                    ></Item>
                  ))}

                  <div className="table-row" key="fin">
                    <div className="table-cell"></div>
                    <div className="table-cell"></div>
                    <div className="table-cell text-right">
                      $ {listItems.reduce((prev, curr) => parseFloat(prev) + parseFloat(curr.price), 0)|| 0}
                    </div>
                    <div className="table-cell"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row pl-2">
        <button
          className="rounded-full bg-blue-400 text-white h-10 w-10 hover:bg-blue-500"
          onClick={handleCreate}
        >
          +
        </button>
      </div>

      <div className="flex flex-col items-center justify-center">
        <button
          className="rounded-full bg-green-400 text-white h-10 w-60 hover:bg-green-500 full"
          onClick={handleSave}
        >
          {' '}
          Guardar
        </button>
      </div>
    </div>
  );
}

export default ViewCreate;
