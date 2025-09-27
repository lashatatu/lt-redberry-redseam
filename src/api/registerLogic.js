// Handles registration API call, form logic, and related hooks for RegisterComponent
import { useMutation } from '@tanstack/react-query';

export const registerUser = async (formData) => {
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

export const handleAvatarChange = (setFormData) => (file) => {
  setFormData((prev) => ({ ...prev, avatar: file }));
};

export const handleInputChange = (formData, setFormData, resetMutation) => (e) => {
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
  if (resetMutation) resetMutation();
};

export const handleRegisterSubmit = (formData, registerMutation) => (e) => {
  e.preventDefault();
  if (formData.password !== formData.password_confirmation) {
    registerMutation.reset();
    registerMutation.mutate({ ...formData, error: 'Passwords do not match.' });
    return;
  }
  registerMutation.mutate(formData);
};

export const useRegisterMutation = (setFormData) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setFormData({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        avatar: null,
      });
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', data.token);
      localStorage.setItem('userAvatar', data.user.avatar || '');
    },
  });
};

