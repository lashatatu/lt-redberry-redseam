import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useLoginMutation } from "../../api/loginLogic";

const LogInComponent = ({ onRegisterClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSuccess = (data) => {
    setSuccess(true);
    setError(null);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token', data.token);
    localStorage.setItem('userAvatar', data.user.avatar || '');
  };

  const onError = (err) => {
    setError(err.message || "Failed to log in");
    setSuccess(false);
  };

  const { mutate } = useLoginMutation({ onSuccess, onError });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    mutate(formData);
  };

  return (
    <div className='w-3/5 flex'>
      <div className='flex-1 flex items-center justify-center'>
        <div className='w-full h-1/2 max-w-3/5 mb-12'>
          <h1 className='text-5xl font-bold text-gray-900 mb-12'>Log in</h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <input
                type='text'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                required
                placeholder='Email or username *'
              />
            </div>
            <div>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
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
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && <div className='text-red-500 text-center'>{error}</div>}
            {success && <div className='text-green-600 text-center'>Login successful!</div>}
            <button
              type='submit'
              className='w-full bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors mt-6'
            >
              Log in
            </button>
          </form>
          <p className='text-center mt-6 text-gray-600'>
            Not a member?{" "}
            <button
              className='text-orange-500 hover:text-orange-600 font-medium cursor-pointer'
              onClick={() => onRegisterClick()}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>

  );
};

export default LogInComponent;
