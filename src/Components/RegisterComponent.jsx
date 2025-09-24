import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import RegisterImageUploadComponent from "./RegisterImageUploadComponent.jsx";

const registerUser = async (formData) => {
  const data = new FormData();
  data.append('username', formData.username);
  data.append('email', formData.email);
  data.append('password', formData.password);
  data.append('password_confirmation', formData.password_confirmation);
  if (formData.avatar) {
    data.append('avatar', formData.avatar);
  }
  const response = await fetch(import.meta.env.VITE_REGISTER_ENDPOINT, {
    method: 'POST',
    body: data,
    headers: {
      'Accept': 'application/json',
    },
  });
  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.message || 'Registration failed.');
  }
  return response.json();
};

const RegisterComponent = ({ onLoginClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    avatar: null,
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setFormData({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        avatar: null,
      });
    },
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    if (mutation.isError || mutation.isSuccess) mutation.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      mutation.reset();
      mutation.mutate({ ...formData, error: 'Passwords do not match.' });
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <div className='w-3/5 flex'>
      <div className='flex-1 flex items-center justify-center'>
        <div className='w-full h-1/2 max-w-3/5 mb-12'>
          <h1 className='text-5xl font-bold text-gray-900 mb-12'>Register</h1>
          <form onSubmit={handleSubmit} className='space-y-6' encType='multipart/form-data'>
            <RegisterImageUploadComponent/>
            <div>
              <input
                type='text'
                id='username'
                name='username'
                value={formData.username}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12'
                  required
                  placeholder='Password *'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword( !showPassword)}
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
                  onChange={handleInputChange}
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
            {mutation.isError && (
              <div className='text-red-500 text-center'>
                {mutation.error?.message || mutation.error?.error || 'Network error.'}
              </div>
            )}
            {mutation.isSuccess && !mutation.isError && (
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
