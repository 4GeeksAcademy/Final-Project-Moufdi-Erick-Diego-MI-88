import React from 'react';

const DiscountPage = () => {
  const { quantity, setQuantity, total } = useDiscountCalculator();
  
  const discounts = [
    { id: 1, title: "Bulk Purchase", desc: "Get 10% off on 10+ items", code: "BULK10" },
    { id: 2, title: "New Partner", desc: "First-time business discount", code: "WELCOMEBIZ" }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Business Discount Portal</h1>
      
      {/* Discount Cards */}
      <div className="grid gap-4 md:grid-cols-2 mb-10">
        {discounts.map(deal => (
          <div key={deal.id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg">{deal.title}</h3>
            <p className="text-gray-600">{deal.desc}</p>
            <code className="bg-gray-100 px-2 py-1 rounded mt-2 inline-block">{deal.code}</code>
          </div>
        ))}
      </div>

      {/* Dynamic Pricing Section */}
      <div className="bg-blue-50 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Calculate Your Order</h2>
        <div className="flex items-center gap-4">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-white border px-4 py-2 rounded">-</button>
          <span className="text-xl font-bold">{quantity} units</span>
          <button onClick={() => setQuantity(q => q + 1)} className="bg-white border px-4 py-2 rounded">+</button>
        </div>
        <p className="mt-4 text-2xl">Total Price: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default DiscountPage;
