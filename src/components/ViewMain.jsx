import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
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

  function sortDesc (a, b) {
    var dateA = new Date(a.createdAt).getTime();
    var dateB = new Date(b.createdAt).getTime();
    return dateA > dateB ? -1 : 1;
  }

  return (
    <>
      <div className="container mx-auto p-8 m-10 min-h-screen bg-gray-100">
        <h1 className="text-2xl normal-case text-center font-bold text-gray-500">Compras</h1>
        <p className="p-2">
          <Link
            to="/create"
            className="custom-link bg-green-400 hover:bg-green-500  px-6 py-1"
          >
            <PlusCircleIcon className="h-6 w-6"></PlusCircleIcon>
          </Link>
        </p>
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
                  ${item.listItems.reduce((prev, curr) => prev + curr.price, 0)}
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
