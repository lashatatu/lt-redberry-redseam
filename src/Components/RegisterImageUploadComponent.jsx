import { FaCamera } from "react-icons/fa6";
import { useRef, useState } from "react";

const RegisterImageUploadComponent = ({ onImageChange }) => {
  const [uploadImage, setUploadImage] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImage(reader.result);
      };
      reader.readAsDataURL(file);
      if (onImageChange) onImageChange(file);
    } else {
      if (onImageChange) onImageChange(null);
    }
  };

  const handleRemove = () => {
    setUploadImage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onImageChange) onImageChange(null);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="flex items-center gap-6">
      <div
        className="w-26 h-26 rounded-full  flex items-center justify-center border border-gray-200 cursor-pointer relative"
        onClick={openFileDialog}
        tabIndex={0}
        role="button"
        aria-label="Upload profile image"
        onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') openFileDialog(); }}
      >
        {uploadImage ? (
          <img
            src={uploadImage}
            alt="Avatar Preview"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <FaCamera size={36} className="text-[#3E424A]" />
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span
            className="text-gray-500 cursor-pointer select-none "
            onClick={openFileDialog}
          >
            {uploadImage ? 'Upload new' : 'Upload image'}
          </span>
          {uploadImage && (
            <span
              className="text-gray-500 cursor-pointer select-none ml-2"
              onClick={handleRemove}
            >
              Remove
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterImageUploadComponent;
