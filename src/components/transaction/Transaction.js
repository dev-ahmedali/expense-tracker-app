import React from 'react';
import editImage from '../../assets/images/edit.svg';
import deleteImage from '../../assets/images/delete.svg';
import { useDispatch } from 'react-redux';
import { editActive } from '../../features/transaction/transactionSlice';

export default function Transaction({transaction}) {
  const disaptch = useDispatch()
  const {name, type, amount} = transaction || {}


  const handleEdit = () => {
    disaptch(editActive(transaction))
  }
  return (
    <div>
      <li className={`transaction ${type}`}>
        <p>{name}</p>
        <div className="right">
          <p>৳ {amount}</p>
          <button className="link" onClick={handleEdit}>
            <img alt="edit" className="icon" src={editImage} />
          </button>
          <button className="link">
            <img alt="delete" className="icon" src={deleteImage} />
          </button>
        </div>
      </li>
    </div>
  );
}
