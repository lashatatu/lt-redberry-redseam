import { HiOutlineMail } from "react-icons/hi";

const CheckoutAddressDetailsComponent = () => {
  return (
    <div className='grid grid-cols-10 grid-rows-3 gap-8 text-black'>
      <div className='col-span-3'>
        <input
          type='text'
          placeholder='Name'
          className='w-full bg-white border border-gray-300 rounded-lg pl-2 py-2 placeholder-gray-600' />
      </div>
      <div className='col-span-3 col-start-4'>
        <input
          type='text'
          placeholder='Surname'
          className='w-full bg-white border border-gray-300 rounded-lg pl-2 py-2 placeholder-gray-600' />
      </div>
      <div className='col-span-6 row-start-2 relative'>
        <input
          type='email'
          placeholder='Email'
          className='w-full bg-white border border-gray-300 rounded-lg pl-8 py-2 placeholder-gray-600' />
        <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 pointer-events-none placeholder-gray-600'>
          <HiOutlineMail />
        </span>
      </div>
      <div className='col-span-3 row-start-3'>
        <input
          type='text'
          placeholder='Address'
          className='w-full bg-white border border-gray-300 rounded-lg pl-2 py-2 placeholder-gray-600' />
      </div>
      <div className='col-span-3 col-start-4 row-start-3'>
        <input
          type='text'
          placeholder='Zip code'
          className='w-full bg-white border border-gray-300 rounded-lg pl-2 py-2 placeholder-gray-600' />
      </div>
    </div>
  );
};

export default CheckoutAddressDetailsComponent;
