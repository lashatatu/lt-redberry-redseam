import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import HeaderComponent from "./HeaderComponent.jsx";

const LogInComponent = ({}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };
  return (
    <div className='min-h-screen flex'>
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="/62bc5492a876268b6b9fc395f006a9259cafde47.png"
          alt="Fashion models in outdoor setting"
          className="w-full h-full object-cover"
        />

      </div>
      <div className="w-full lg:w-1/2 flex flex-col">
        {/*login*/}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Log in</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Email or username *
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Log in
              </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
              Not a member?{" "}
              <a
                href="#"
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default LogInComponent;
