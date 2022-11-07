import React from 'react';
import editImage from '../../assets/images/edit.svg';
import deleteImage from '../../assets/images/delete.svg';
import { useDispatch } from 'react-redux';
import { editActive, removeTransaction } from '../../features/transaction/transactionSlice';
import numberWithCommas from "../../utils/thousandSeparetor"

export default function Transaction({transaction}) {
  const disaptch = useDispatch()
  const {name, type, amount, id} = transaction || {}


  const handleEdit = () => {
    disaptch(editActive(transaction))
  }
  const handleDelete = () => {
    disaptch(removeTransaction(id))
  }
  return (
    <div>
      <li className={`transaction ${type}`}>
        <p>{name}</p>
        <div className="right">
          <p>৳ {(numberWithCommas)(amount)}</p>
          <button className="link" onClick={handleEdit}>
            <img alt="edit" className="icon" src={editImage} />
          </button>
          <button className="link" onClick={handleDelete}>
            <img alt="delete" className="icon" src={deleteImage} />
          </button>
        </div>
      </li>
    </div>
  );
}
