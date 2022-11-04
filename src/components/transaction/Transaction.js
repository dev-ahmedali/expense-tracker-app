import React from 'react';
import editImage from '../../assets/images/edit.svg';
import deleteImage from '../../assets/images/delete.svg';

export default function Transaction() {
  return (
    <div>
      <li className="transaction income">
        <p>Earned this month</p>
        <div className="right">
          <p>৳ 100</p>
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
