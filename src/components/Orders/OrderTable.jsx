import OrderItems from "./OrderItems";

const OrderTable = ({ items = [] }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="table-auto w-full border-collapse">
        <thead className="bg-gray-700">
          <tr className="border-b border-gray-600">
            <th className="px-4 py-3 text-left text-gray-50">Product</th>
            <th className="px-4 py-3 text-right text-gray-50">Price</th>
            <th className="px-4 py-3 text-right text-gray-50">Quantity</th>
            <th className="px-4 py-3 text-right text-gray-50">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <OrderItems key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default OrderTable;