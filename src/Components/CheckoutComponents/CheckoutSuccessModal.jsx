import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";

const CheckoutSuccessModal = ({ open, onClose, onContinue }) => (
  <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
    <DialogBackdrop className="fixed inset-0 bg-black/10" />
    <DialogPanel className="relative bg-white rounded-2xl shadow-xl mx-auto p-36 flex flex-col items-center">
      <button
        className="absolute top-6 right-6 text-3xl text-gray-500"
        onClick={onClose}
        aria-label="Close"
      >
        <IoMdClose />
      </button>
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-8">
        <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="24" fill="#F7F6F7"/>
          <path d="M16 24l6 6 10-12" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className="text-5xl font-bold text-gray-900 mb-4 text-center">Congrats!</h2>
      <p className="text-lg text-gray-500 mb-10 text-center">Your order is placed successfully!</p>
      <button
        className="bg-orange-600 hover:bg-orange-700 text-white text-lg font-medium rounded-lg px-10 py-4 cursor-pointer"
        onClick={onContinue}
      >
        Continue shopping
      </button>
    </DialogPanel>
  </Dialog>
);

export default CheckoutSuccessModal;
