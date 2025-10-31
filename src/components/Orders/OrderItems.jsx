const OrderItems = ({ item }) => {
  const foodName = item?.food?.name || 'N/A';
  const price = item?.price?.toFixed(2) || '0.00';
  const quantity = item?.quantity || '0';
  
  const totalPrice = (item?.price * item?.quantity)?.toFixed(2) || '0.00';

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
      <td className="px-4 py-3 font-medium text-gray-200">{foodName}</td>
      <td className="px-4 py-3 text-right text-gray-300">৳{price}</td>
      <td className="px-4 py-3 text-right text-gray-300">{quantity}</td>
      <td className="px-4 py-3 text-right text-gray-300">৳{totalPrice}</td>
    </tr>
  );
};

export default OrderItems;