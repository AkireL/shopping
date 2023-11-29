import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/solid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KEY_DATA_OF_LOCAL_STORAGE } from '../constantes';
import Table from './Table';
import QRCode from 'qrcode';

function ViewCreate() {
  let params = useParams();
  const [publicId, setPublicId] = useState(params.publicId || uuidv4());
  const [listItems, setListItems] = useState([]);
  const [title, setTitle] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date());
  const [showModal, setStateModel] = useState(false);

  useEffect(function () {
    if (!params.publicId) {
      setTitle(new Date().toLocaleDateString());
      return;
    }

    let listShopping = JSON.parse(window.localStorage.getItem('data'));
    let index = listShopping.findIndex((e) => e.publicId == params.publicId);
    const item = listShopping[index];

    setPublicId(item.publicId);
    setListItems(item.listItems);
    setTitle(item.title ?? new Date(item.createdAt).toLocaleDateString());
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

  function handleAddNew() {
    setListItems([
      ...listItems,
      { id: uuidv4(), unit: 0, description: '', price: '' },
    ]);
  }

  function handleSave() {
    let data = JSON.parse(
      window.localStorage.getItem(KEY_DATA_OF_LOCAL_STORAGE)
    );

    let index = data.findIndex((v) => v.publicId === publicId);

    if (index === -1) {
      let dataTmp = [...data, { publicId, title, listItems, createdAt }];
      window.localStorage.setItem(
        KEY_DATA_OF_LOCAL_STORAGE,
        JSON.stringify(dataTmp)
      );

      return;
    }

    data[index] = { publicId, title, listItems: listItems, createdAt };

    window.localStorage.setItem(
      KEY_DATA_OF_LOCAL_STORAGE,
      JSON.stringify(data)
    );

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

  const generateQR = () => {
    const content = JSON.stringify({ publicId, title, listItems, createdAt });

    if (listItems.length <= 0) {
      toast.info('There are articles', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    setStateModel(true);
    QRCode.toCanvas(
      content,
      { errorCorrectionLevel: 'Q' },
      function (err, canvas) {
        if (err) throw err;

        var container = document.getElementById('img');
        container.replaceChildren(canvas);
      }
    );
  };

  return (
    <div className="container mx-auto p-8 m-10 items-center min-h-screen bg-gray-100">
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
        <button
          onClick={() => generateQR()}
          className="custom-link bg-red-400 hover:bg-red-500"
        >
          Generate QR
        </button>
        <input
          className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Titulo"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <div className="pb-1 pt-1">
        <a
          onClick={handleAddNew}
          className="bg-blue-400 hover:bg-blue-500  custom-link px-5 py-2"
        >
          <PlusIcon className="h-4 w-4"></PlusIcon>
        </a>
      </div>
      <Table
        listItems={listItems.filter((item) => !item.checked)}
        updateList={updateList}
        deleteItem={deleteItem}
      ></Table>

      <div className="flex flex-row pl-2 pt-1">
        <a
          onClick={handleAddNew}
          className="bg-blue-400 hover:bg-blue-500  custom-link px-5 py-2"
        >
          <PlusIcon className="h-4 w-4"></PlusIcon>
        </a>
      </div>

      <div className="mt-10">
        <Table
          head="bg-green-500"
          listItems={listItems.filter((item) => item.checked)}
          updateList={updateList}
          deleteItem={deleteItem}
        ></Table>
      </div>

      <div className="flex flex-col items-center justify-center mt-5">
        <button
          className="rounded-full bg-green-400 text-white h-10 w-60 hover:bg-green-500 full"
          onClick={handleSave}
        >
          Guardar
        </button>
      </div>

      <ToastContainer
        position="top-left"
        autoClose={10}
        hideProgressBar={true}
        newestOnTop={false}
      />

      <div
        className="relative z-10"
        style={showModal ? {} : { display: 'none' }}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="false"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-fit items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full">
              <div className="flex justify-end m-1 pt-1 px-1">
                <button type="button" className="w-10 h-10" onClick={() => setStateModel(!showModal)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="nx rz">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="bg-white px-4 pb-4 pt-1 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Escanea</h3>
                    <div id="img" className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCreate;
