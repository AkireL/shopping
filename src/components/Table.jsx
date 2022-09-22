import Item from './Item';

function Table(props) {
  return (
    <div>
      <div className="flex flex-col">
        <div className="sm:overflow-x-auto sm:mx-6 lg:mx-8">
          <div className="inline-block w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="table w-full mt-3 border">
                <div className="table-header-group bg-gray-200 text-gray-500">
                  <div className="table-row">
                    <div className="w-2/3 border text-center"></div>
                    <div className="text-sm table-cell w-2/3 border text-center">
                      Descripción
                    </div>
                    <div className="text-sm table-cell w-1/3 border text-center">
                      Precio
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className="table-row-group bg-white divide-y divide-gray-200">
                  {props.listItems.map((item) => (
                    <Item
                      key={item.id}
                      {...item}
                      updateList={props.updateList}
                      deleteItem={props.deleteItem}
                    ></Item>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`text-right xs:text-left mx-16 ${props.head ? props.head : 'bg-blue-400'}`}>
        ${' '}
        {props.listItems
          .filter((item) => !!item.price)
          .reduce(
            (prev, curr) => parseFloat(prev) + parseFloat(curr.price),
            0
          ) || 0}
      </div>
    </div>
  );
}
export default Table;
