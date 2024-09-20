import React from 'react';  

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {  
  if (!isOpen) return null;  

  return (  
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">  
      <div className="bg-white p-4 rounded shadow-lg">  
        <h2 className="text-lg font-bold mb-4">Вы уверены, что хотите удалить тренировку?</h2>  
        <div className="flex justify-end">  
          <button  
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"  
            onClick={onConfirm}  
          >  
            Да  
          </button>  
          <button  
            className="bg-gray-300 px-4 py-2 rounded"  
            onClick={onClose}  
          >  
            Отмена  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default ConfirmationModal;