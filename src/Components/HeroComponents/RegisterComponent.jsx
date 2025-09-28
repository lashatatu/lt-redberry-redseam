import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import RegisterImageUploadComponent from "./RegisterImageUploadComponent.jsx";
import {
  handleAvatarChange,
  handleInputChange,
  handleRegisterSubmit,
  useRegisterMutation
} from '../../api/registerLogic';

const RegisterComponent = ({ onLoginClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    avatar: null,
  });

  const registerMutation = useRegisterMutation(setFormData);

  const avatarChangeHandler = handleAvatarChange(setFormData);
  const inputChangeHandler = handleInputChange(formData, setFormData, registerMutation.reset);
  const submitHandler = handleRegisterSubmit(formData, registerMutation);

  return (
    <div className='w-3/5 flex'>
      <div className='flex-1 flex items-center justify-center'>
        <div className='w-full h-1/2 max-w-3/5 mb-12'>
          <h1 className='text-5xl font-bold text-gray-900 mb-12'>Register</h1>
          <form onSubmit={submitHandler} className='space-y-6' encType='multipart/form-data'>
            <RegisterImageUploadComponent onImageChange={avatarChangeHandler}/>
            <div>
              <input
                type='text'
                id='username'
                name='username'
                value={formData.username}
                onChange={inputChangeHandler}
                className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                required
                placeholder='Username *'
              />
            </div>
            <div>
              <input
                type='text'
                id='email'
                name='email'
                value={formData.email}
                onChange={inputChangeHandler}
                className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                required
                placeholder='Email *'
              />
            </div>
            <div>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={inputChangeHandler}
                  className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12'
                  required
                  placeholder='Password *'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password_confirmation'
                  name='password_confirmation'
                  value={formData.password_confirmation}
                  onChange={inputChangeHandler}
                  className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12'
                  required
                  placeholder='Confirm Password *'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {registerMutation.isError && (
              <div className='text-red-500 text-center'>
                {registerMutation.error?.message || registerMutation.error?.error || 'Network error.'}
              </div>
            )}
            {registerMutation.isSuccess && !registerMutation.isError && (
              <div className='text-green-600 text-center'>Registration successful!</div>
            )}
            <button
              type='submit'
              className='w-full bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors mt-6'
            >
              Register
            </button>
          </form>
          <p className='text-center mt-6 text-gray-600'>
            Already member?{' '}
            <button
              className='text-orange-500 hover:text-orange-600 font-medium cursor-pointer'
              onClick={() => onLoginClick()}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
