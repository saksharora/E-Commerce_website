import { createContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(parseFloat(total).toFixed(2));
   
  }, [cart]);

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }

    // Show notification
    toast.success("Item added to the cart successfully!");
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    setDiscountCode(""); // Clear discount code when cart is cleared
    setDiscountedTotal(0); // Reset the discounted total
  };

  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  };

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount <= 1) {
      removeFromCart(id);
    }
  };
  const discountMap = {
    "SAVE10": { type: "percentage", value: 0.1 },
    "SAVE20": { type: "percentage", value: 0.2 },
    "SAVE30": { type: "percentage", value: 0.3 },
    "FIXED50": { type: "fixed", value: 50 },
    "FIXED70": { type: "fixed", value: 70 },
  };
  
  const applyDiscount = () => {
    const discount = discountMap[discountCode.toUpperCase()];
    if (discount) {
      let newTotal;
      let discountAmount = 0;
      
      if (discount.type === "percentage") {
        discountAmount = total * discount.value;
        newTotal = total - discountAmount;
      } else if (discount.type === "fixed") {
        discountAmount = discount.value;
        newTotal = total - discountAmount;
      }
  
      // Ensure the total doesn't go below zero
      if (newTotal < 0) {
        newTotal = 0;
      }
  
      setDiscountedTotal(parseFloat(newTotal).toFixed(2));
      toast.success(`Discount applied successfully! You saved INR ${discountAmount.toFixed(2)}.`);
    } else {
      setDiscountedTotal(total); // Reset to the original total if the discount is invalid
      if (discountCode) toast.error("Invalid discount code.");
    }
  };
  
  
  

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
        discountCode,
        setDiscountCode,
        discountedTotal,
        applyDiscount,
      }}
    >
      {children}
      <ToastContainer />
    </CartContext.Provider>
  );
};

export default CartProvider;
