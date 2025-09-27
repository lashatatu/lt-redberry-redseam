import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { HiShoppingCart, HiMiniUser } from "react-icons/hi2";
import CartModal from "../CartComponents/CartModal.jsx";

const HeaderComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    setAvatar(localStorage.getItem("userAvatar") || "");
    const handleStorage = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setAvatar(localStorage.getItem("userAvatar") || "");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className='relative'>
      <header className='flex justify-between items-center px-28 py-6'>
        <div className='flex items-center space-x-2'>
          <div className='rounded flex items-center justify-center'>
            <Link to={"/products"}>
              <img
                src='/img.png'
                alt='Fashion models in outdoor setting'
                className='h-6 object-cover'
              />
            </Link>
          </div>
        </div>
        <button className='flex items-center space-x-2 text-gray-600'>
          <span>
            {isLoggedIn ? (
              <div className='flex items-center space-x-3'>
                <div onClick={() => setOpen(true)}>
                  <HiShoppingCart size={24} fill='black' />
                </div>
                {open && <CartModal openModal={open} onClose={setOpen} />}
                {avatar ? (
                  <img
                    src={avatar}
                    alt='User avatar'
                    className='w-8 h-8 rounded-full object-cover border border-gray-300'
                  />
                ) : (
                  <div className='w-8 h-8 rounded-full flex items-center justify-center border border-gray-300'>
                    <HiMiniUser size={20} fill='black' />
                  </div>
                )}
              </div>
            ) : (
              <Link to={'/'} className='flex items-center space-x-2'>
                  <HiMiniUser size={20} fill='black' />
                  <span>Log in</span>
              </Link>
            )}
          </span>
        </button>
      </header>
    </div>

  );
};

export default HeaderComponent;
