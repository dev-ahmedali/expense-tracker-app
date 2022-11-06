import React from 'react';
import editImage from '../../assets/images/edit.svg';
import deleteImage from '../../assets/images/delete.svg';

export default function Transaction({transaction}) {
  const {name, type, amount} = transaction || {}
  return (
    <div>
      <li className={`transaction ${type}`}>
        <p>{name}</p>
        <div className="right">
          <p>৳ {amount}</p>
          <button className="link">
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
