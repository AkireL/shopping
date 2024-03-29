import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  ClipboardCopyIcon,
  PencilAltIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { KEY_DATA_OF_LOCAL_STORAGE } from '../constantes';

function ViewMain() {
  const [listShopping, setListShopping] = useState(
    JSON.parse(window.localStorage.getItem(KEY_DATA_OF_LOCAL_STORAGE)) || []
  );

  useEffect(function () {
    window.localStorage.setItem(KEY_DATA_OF_LOCAL_STORAGE, JSON.stringify(listShopping));
  }, []);

  function handleDelete(item) {
    let list = listShopping.filter((e) => e.publicId !== item.publicId);
    setListShopping([...list]);
    window.localStorage.setItem(KEY_DATA_OF_LOCAL_STORAGE, JSON.stringify(list));
  }

  function handleDuplicate(item) {
    let newItem = {...JSON.parse(JSON.stringify(item)), publicId:uuidv4(), createdAt: new Date(), title: (item.title + '(copy)') };
    newItem.listItems = newItem.listItems.map(function (row) {
      return { ...row, id:uuidv4(), checked:false, price:''};
    });

    setListShopping([...listShopping, newItem]);
    window.localStorage.setItem(KEY_DATA_OF_LOCAL_STORAGE, JSON.stringify([...listShopping, newItem]));
  }

  function sortDesc (a, b) {
    var dateA = new Date(a.createdAt).getTime();
    var dateB = new Date(b.createdAt).getTime();
    return dateA > dateB ? -1 : 1;
  }

  return (
    <>
      <div className="container mx-auto p-8 m-10 min-h-screen bg-gray-100">
        <h1 className="text-2xl normal-case text-center font-bold text-gray-500">Compras</h1>
        <div id="img"></div>
        <div className='flex justify-between'>
          <p className="p-2">
            <Link
              to="/create"
              className="custom-link bg-green-400 hover:bg-green-500  px-6 py-1">
              <PlusCircleIcon className="h-6 w-6"></PlusCircleIcon>
            </Link>
          </p>
        </div>
        <table className="table w-full border">
          <thead className="table-header-group bg-gray-200 text-gray-500 font-light border">
            <tr className="table-row border">
              <th className="th-custom-table">Titulo</th>
              <th className="th-custom-table"># art.</th>
              <th className="th-custom-table">$</th>
              <th className="th-custom-table"></th>
            </tr>
          </thead>
          <tbody className="table-row-group bg-white divide-y divide-gray-200 border">
            {listShopping.sort(sortDesc).map((item, i) => (
              <tr className="table-row border" key={i}>
                <td className="table-cell border pl-2">{item.title}</td>
                <td className="table-cell text-right border w-15">
                  {item.listItems.length}
                </td>
                <td className="table-cell border w-15 text-right">
                  ${item.listItems.filter((item) => Boolean(item.price || 0)).reduce((prev, curr) => prev + curr.price || 0, 0)}
                </td>
                <td className="pl-2">
                  <Link
                    to={`/items/${item.publicId}`}
                    className="custom-link bg-blue-400 hover:bg-blue-500"
                  >
                    <PencilAltIcon className="h-4 w-4"></PencilAltIcon>
                  </Link>
                  <button
                    onClick={() => handleDelete(item)}
                    className="custom-link bg-red-400 hover:bg-red-500"
                  >
                    <TrashIcon className="h-4 w-4"></TrashIcon>
                  </button>
                  <button
                    onClick={() => handleDuplicate(item)}
                    className="custom-link bg-green-400 hover:bg-green-500"
                  >
                    <ClipboardCopyIcon className="h-4 w-4"></ClipboardCopyIcon>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ViewMain;
