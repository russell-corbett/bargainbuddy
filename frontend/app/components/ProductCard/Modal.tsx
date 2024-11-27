import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="w-[90%] max-w-4xl h-[90%] bg-white rounded-xl p-6 flex flex-col items-center justify-center p-6 relative">
        {/* Content */}
        {children}

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-secondary text-white p-2 w-10 h-10 rounded-full hover:scale-105 transition-all duration-300"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
