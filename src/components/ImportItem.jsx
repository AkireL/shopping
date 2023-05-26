import { useState } from 'react';
import { KEY_DATA_OF_LOCAL_STORAGE } from '../constantes';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

function ImportItem({ onLoadList }) {

  const [showModal, setStateModel] = useState(false);

  function onClick() {
    setStateModel(!showModal);
  }

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = (e.target.result);
      if (! isJsonString(text))
      {
        return;
      }

      const newItem = JSON.parse(text);
      const lastItems = JSON.parse(window.localStorage.getItem(KEY_DATA_OF_LOCAL_STORAGE));

      newItem.publicId = uuidv4();

      const result = [...lastItems, newItem];

      window.localStorage.setItem(KEY_DATA_OF_LOCAL_STORAGE, JSON.stringify(result));

      onLoadList();

      setStateModel(false);

      toast.success('Lista importada', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    reader.readAsText(e.target.files[0]);

    onClick();
  };

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  }

  return (
    <>
      <div className="relative z-10" style={showModal ? {} : { display: 'none' }} aria-labelledby="modal-title" role="dialog" aria-modal="false">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-fit items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className='flex justify-end m-1 pt-1 px-1'>
                <button type="button" className="w-10 h-10" onClick={() => setStateModel(!showModal)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="nx rz">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="bg-white px-4 pb-4 pt-1 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Importar lista</h3>
                    <div className="mt-2">
                      <input type="file" onChange={(e) => showFile(e)}></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              </div>
            </div>
          </div>
        </div>
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

      <button type="button" onClick={() => onClick()} className='bg-blue-800 hover:bg-blue-200 custom-link px-2 py-2'>Importar</button>
    </>
  );
}
export default ImportItem;
