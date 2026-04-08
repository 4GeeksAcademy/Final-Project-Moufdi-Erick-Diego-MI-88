import { useState, useEffect } from 'react';

// Custom hook for discount logic
export function useDiscountCalculator() {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const basePrice = 50; // Example base price

  const calculateTotal = (count) => {
    let price = count * basePrice;
    if (count >= 10) price *= 0.90; // 10% off for 10+ items
    if (count >= 20) price *= 0.85; // 15% off for 20+ items
    return price;
  };

  useEffect(() => {
    setTotal(calculateTotal(quantity));
  }, [quantity]);

  return { quantity, setQuantity, total };
}


