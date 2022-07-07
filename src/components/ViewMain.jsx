import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PencilAltIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/solid';

function ViewMain() {
  const [listShopping, setListShopping] = useState(
    JSON.parse(window.localStorage.getItem('data')) || []
  );

  useEffect(function () {
    window.localStorage.setItem('data', JSON.stringify(listShopping));
  }, []);

  function handleDelete(item) {
    let list = listShopping.filter((e) => e.publicId !== item.publicId);
    setListShopping([...list]);
    window.localStorage.setItem('data', JSON.stringify(list));
  }

  return (
    <>
      <div className="container mx-auto p-8 m-10 min-h-screen bg-gray-100">
        <h1 className="text-2xl normal-case text-center font-bold text-gray-500">Compras</h1>
        <p className="p-2">
          <Link
            to="/create"
            className="text-white bg-green-400 hover:bg-green-500 font-medium rounded-full text-sm px-6 py-1 text-center inline-flex items-center mr-1 mb-1"
          >
            <PlusCircleIcon className="h-6 w-6"></PlusCircleIcon>
          </Link>
        </p>
        <table className="table w-full border">
          <thead className="table-header-group bg-gray-200 text-gray-500 font-light border">
            <tr className="table-row border">
              <th className="border text-sm table-cell text-center font-medium">Title</th>
              <th className="border text-sm table-cell text-center font-medium"># items</th>
              <th className="border text-sm table-cell text-center font-medium">$</th>
              <th className="border text-sm table-cell text-center font-medium"></th>
            </tr>
          </thead>
          <tbody className="table-row-group bg-white divide-y divide-gray-200 border">
            {listShopping.sort().map((item, i) => (
              <tr className="table-row border" key={i}>
                <td className="table-cell border pl-2">{item.title}</td>
                <td className="table-cell border pl-2">
                  {item.listItems.length}
                </td>
                <td className="table-cell border pl-2">
                  {item.listItems.reduce((prev, curr) => prev + curr.price, 0)}
                </td>
                <td className="pl-2">
                  <Link
                    to={`/items/${item.publicId}`}
                    className="text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-full text-sm px-2 py-1.5 text-center inline-flex items-center mr-1 mb-1"
                  >
                    <PencilAltIcon className="h-6 w-6"></PencilAltIcon>
                  </Link>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-white bg-red-400 hover:bg-red-500 font-medium rounded-full text-sm px-2 py-1.5 text-center inline-flex items-center mr-1 mb-1"
                  >
                    <TrashIcon className="h-6 w-6"></TrashIcon>
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
