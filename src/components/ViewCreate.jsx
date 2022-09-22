import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KEY_DATA_OF_LOCAL_STORAGE } from '../constantes';
import Table from './Table';

function ViewCreate() {
  let params = useParams();
  const [publicId, setPublicId] = useState(params.publicId || uuidv4());
  const [listItems, setListItems] = useState([]);
  const [title, setTitle] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date());

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
    setCreatedAt(item.createdAt ? new Date(item.createdAt) : createdAt);
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

  function deleteItem(obj) {
    const tmp = listItems.filter((e) => e.id !== obj.id);
    setListItems([...tmp]);
  }

  function handleAdd() {
    setListItems([
      ...listItems,
      { id: uuidv4(), unit: 0, description: '', price: 0},
    ]);
  }

  function handleSave() {
    let data = JSON.parse(window.localStorage.getItem(KEY_DATA_OF_LOCAL_STORAGE));

    let index = data.findIndex((v) => v.publicId === publicId);

    if (index === -1) {
      window.localStorage.setItem(
        'data',
        JSON.stringify([...data, { publicId, title, listItems, createdAt }])
      );
      return;
    }

    data[index] = { publicId, title, listItems: listItems, createdAt };

    window.localStorage.setItem(KEY_DATA_OF_LOCAL_STORAGE, JSON.stringify(data));

    toast.success('Cambios guardados', {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className="container mx-auto p-8 m-10 items-center min-h-screen bg-gray-100">
      <h2 className="text-center font-bold text-gray-500 text-2xl">
        Lista
      </h2>
      <p className="pb-5">
        <Link
          to="/"
          className="bg-green-400 hover:bg-green-500  custom-link px-5 py-2"
        >
          <ArrowLeftIcon className="h-4 w-4"></ArrowLeftIcon>
        </Link>
      </p>
      <label className="relative sm:block flex flex-col items-center">
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
      <Table listItems={listItems.filter(item => ! item.checked)} updateList={updateList} deleteItem={deleteItem}></Table>

      <div className='pt-20'>
        <Table head='bg-green-500' listItems={listItems.filter(item => item.checked)} updateList={updateList} deleteItem={deleteItem}></Table>
      </div>

      <div className="flex flex-row pl-2">
        <button
          className="rounded-full bg-blue-400 text-white h-10 w-10 hover:bg-blue-500"
          onClick={handleAdd}
        >
          +
        </button>
      </div>

      <div className="flex flex-col items-center justify-center">
        <button
          className="rounded-full bg-green-400 text-white h-10 w-60 hover:bg-green-500 full"
          onClick={handleSave}
        >
          Guardar
        </button>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default ViewCreate;
