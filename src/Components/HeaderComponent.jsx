import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const HeaderComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState("");

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

          <span>{isLoggedIn ? <div>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M2.25 2.25C1.83579 2.25 1.5 2.58579 1.5 3C1.5 3.41421 1.83579 3.75 2.25 3.75H3.63568C3.80558 3.75 3.95425 3.86422 3.99803 4.02838L6.55576 13.6199C4.94178 14.0385 3.75 15.5051 3.75 17.25C3.75 17.6642 4.08579 18 4.5 18H20.25C20.6642 18 21 17.6642 21 17.25C21 16.8358 20.6642 16.5 20.25 16.5H5.37803C5.68691 15.6261 6.52034 15 7.5 15H18.7183C19.0051 15 19.2668 14.8364 19.3925 14.5785C20.5277 12.249 21.5183 9.83603 22.3527 7.35126C22.4191 7.15357 22.4002 6.93716 22.3005 6.75399C22.2008 6.57082 22.0294 6.43743 21.8273 6.38583C17.0055 5.15442 11.9536 4.5 6.75 4.5C6.39217 4.5 6.03505 4.5031 5.67868 4.50926L5.44738 3.64188C5.2285 2.82109 4.48515 2.25 3.63568 2.25H2.25Z'
                fill='#10151F' />
              <path
                d='M3.75 20.25C3.75 19.4216 4.42157 18.75 5.25 18.75C6.07843 18.75 6.75 19.4216 6.75 20.25C6.75 21.0784 6.07843 21.75 5.25 21.75C4.42157 21.75 3.75 21.0784 3.75 20.25Z'
                fill='#10151F' />
              <path
                d='M16.5 20.25C16.5 19.4216 17.1716 18.75 18 18.75C18.8284 18.75 19.5 19.4216 19.5 20.25C19.5 21.0784 18.8284 21.75 18 21.75C17.1716 21.75 16.5 21.0784 16.5 20.25Z'
                fill='#10151F' />
            </svg>

            <img src='' alt='' />
          </div> : <div>
            <svg
              width='24'
              height='24'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.001 8C11.6578 8 13.001 6.65685 13.001 5C13.001 3.34315 11.6578 2 10.001 2C8.34412 2 7.00098 3.34315 7.00098 5C7.00098 6.65685 8.34412 8 10.001 8Z'
                fill='#10151F'
              />
              <path
                d='M3.46615 14.4935C3.27126 15.0016 3.44533 15.571 3.87518 15.9046C5.56753 17.218 7.69299 18 10.0011 18C12.3115 18 14.439 17.2164 16.1322 15.9006C16.5618 15.5667 16.7355 14.9971 16.5403 14.4892C15.531 11.8635 12.9852 10 10.004 10C7.02129 10 4.47427 11.8656 3.46615 14.4935Z'
                fill='#10151F'
              />
            </svg>
            <span>'Log in'</span>
          </div>}</span>
        </button>
      </header>
    </div>

  );
};

export default HeaderComponent;
