import React from "react";

const HeaderComponent = () => {
  return (
    <div className='relative'>
      <header className='flex justify-between items-center px-28 py-6'>
        <div className='flex items-center space-x-2'>
          <div className='rounded flex items-center justify-center'>
            <img
              src='/img.png'
              alt='Fashion models in outdoor setting'
              className='h-6 object-cover'
            />
          </div>
        </div>
        <button className='flex items-center space-x-2 text-gray-600'>
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
          <span>Log in</span>
        </button>
      </header>
    </div>

  );
};

export default HeaderComponent;
