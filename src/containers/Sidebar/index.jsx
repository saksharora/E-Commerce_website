import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import CartItem from "~components/CartItem";
import { SidebarContext } from "~contexts/SidebarContext";
import { CartContext } from "~contexts/CartContext";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const {
    cart,
    clearCart,
    total,
    itemAmount,
    discountCode,
    setDiscountCode,
    discountedTotal,
    applyDiscount,
  } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState("");

  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      setShowPopup("Your Cart is empty.");
    } else {
      setShowPopup("Items are added successfully in the cart!");
    }
    setTimeout(() => setShowPopup(""), 3000); 
  };

  const handlePopupClose = () => {
    setShowPopup("");
  };

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] 
    transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
          onClick={handleClose}
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="
        flex flex-col gap-y-2 
        h-[320px] lg:h-[380px]
        overflow-y-auto overflow-x-hidden border-b
                  "
      >
        {cart.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-lg font-semibold">Your Cart is empty.</p>
          </div>
        ) : (
          cart.map((item) => (
            <CartItem item={item} key={item.id} />
          ))
        )}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="uppercase text-semibold">
            <span className="mr-2">Total:</span>INR {discountedTotal || total}
          </div>
          <div
            className="
                      cursor-pointer py-4 bg-red-500 text-white w-12 h-12 
                      flex justify-center items-center text-xl
                      "
            onClick={clearCart}
          >
            <FiTrash2 />
          </div>
        </div>
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
          placeholder="Enter discount code"
          className="w-full p-2 border rounded"
        />
        <button
  className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium mt-2"
  onClick={applyDiscount} // No arguments here
>
  Apply Discount
</button>
        <Link
          to="/"
          className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium"
        >
          View Cart
        </Link>
        <button
          className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium"
          onClick={handleCheckoutClick}
        >
          Checkout
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg relative text-center">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={handlePopupClose}
            >
              <AiOutlineClose className="text-xl" />
            </button>
            <p className="text-lg font-semibold">{showPopup}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
