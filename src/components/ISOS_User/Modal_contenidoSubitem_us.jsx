import React from 'react';

const ModalContenidoSubitem = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
        <button
            className="absolute top-2 right-2 text-black text-xl font-bold"
            onClick={onClose}
            >
            X
        </button>
        <h2 className="text-2xl font-bold mb-4 text-black text-left">Interpretacion del subitem</h2>
        <div className='border border-black rounded-lg p-4 mb-6 text-black'>
            Esta es la interpretacion del subitem
        </div>
      </div>
    </div>
  );
};

export default ModalContenidoSubitem;