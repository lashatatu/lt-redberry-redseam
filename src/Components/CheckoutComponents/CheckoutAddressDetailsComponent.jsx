import { HiOutlineMail } from "react-icons/hi";
import { useUser } from "../../api/loginLogic.js";
import React, { useEffect } from "react";

const CheckoutAddressDetailsComponent = ({
  addressData,
  setAddressData,
  errors = {}
}) => {
  const user = useUser();

  useEffect(() => {
    if ( user?.email ) {
      setAddressData(prev => ({
        ...prev,
        email: user.email
      }));
    }
  }, [user, setAddressData]);

  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setAddressData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className='grid grid-cols-10 grid-rows-3 gap-8 text-black'>
      <div className='col-span-3'>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={addressData.name}
          onChange={handleChange}
          className='w-full bg-white border border-gray-300 rounded-lg pl-2 py-2 placeholder-gray-600'
        />
        {errors.name && <div className='text-red-600 text-sm'>{errors.name[0]}</div>}
      </div>
      <div className='col-span-3 col-start-4'>
        <input
          type='text'
          name='surname'
          placeholder='Surname'
          value={addressData.surname}
          onChange={handleChange}
          className='w-full bg-white border border-gray-300 rounded-lg pl-2 py-2 placeholder-gray-600'
        />
        {errors.surname && <div className='text-red-600 text-sm'>{errors.surname[0]}</div>}
      </div>
      <div className='col-span-6 row-start-2 relative'>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={addressData.email}
          onChange={handleChange}
          className='w-full bg-white border border-gray-300 rounded-lg pl-8 py-2 placeholder-gray-600'
        />
        <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 pointer-events-none placeholder-gray-600'>
          <HiOutlineMail />
        </span>
        {errors.email && <div className="text-red-600 text-sm">{errors.email[0]}</div>}
      </div>
      <div className='col-span-3 row-start-3'>
        <input
          type='text'
          name='address'
          placeholder='Address'
          value={addressData.address}
          onChange={handleChange}
          className='w-full bg-white border border-gray-300 rounded-lg pl-2 py-2 placeholder-gray-600'
        />
        {errors.address && <div className="text-red-600 text-sm">{errors.address[0]}</div>}
      </div>
      <div className='col-span-3 col-start-4 row-start-3'>
        <input
          type='text'
          name='zip_code'
          placeholder='Zip code'
          value={addressData.zip_code}
          onChange={handleChange}
          className='w-full bg-white border border-gray-300 rounded-lg pl-2 py-2 placeholder-gray-600'
        />
        {errors.zip_code && <div className="text-red-600 text-sm">{errors.zip_code[0]}</div>}
      </div>
    </div>
  );
};

export default CheckoutAddressDetailsComponent;
