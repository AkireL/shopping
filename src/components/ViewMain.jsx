import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilAltIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/solid';

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
      <div className="container mx-auto p-8 m-10">
        <h1 className="text-2xl normal-case text-center font-bold">
          Shopping List
        </h1>
        <p className="p-2">
          <Link
            to="/create"
            className="text-white bg-green-500 hover:bg-green-200 font-medium rounded-full text-sm px-6 py-1 text-center inline-flex items-center mr-1 mb-1"
          >
            <PlusCircleIcon className='h-6 w-6'></PlusCircleIcon>
          </Link>
        </p>
        <table className="table w-full divide-gray-200 mt-5">
          <thead className="table-header-group bg-gray-100">
            <tr className="table-row">
              <th className="table-cell text-left">Title</th>
              <th className="table-cell text-left"># items</th>
              <th className="table-cell text-left">$</th>
              <th className="table-cell text-left"></th>
            </tr>
          </thead>
          <tbody className="table-row-group bg-white divide-y divide-gray-200">
            {listShopping.sort().map((item, i) => (
              <tr className="table-row" key={i}>
                <td className="table-cell">{item.title}</td>
                <td className="table-cell">{item.listItems.length}</td>
                <td className="table-cell">
                  {item.listItems.reduce((prev, curr) => prev + curr.price, 0)}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-white bg-red-500 hover:bg-red-200 font-medium rounded-full text-sm px-2 py-1.5 text-center inline-flex items-center mr-1 mb-1"
                  >
                    <TrashIcon className='h-6 w-6'></TrashIcon>
                  </button>
                  <Link
                    to={`/items/${item.publicId}`}
                    className="text-white bg-blue-500 hover:bg-blue-200 font-medium rounded-full text-sm px-2 py-1.5 text-center inline-flex items-center mr-1 mb-1"
                  >
                    <PencilAltIcon className='h-6 w-6'></PencilAltIcon>
                  </Link>
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
