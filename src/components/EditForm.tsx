import React, { useEffect, useState } from 'react';
import * as Services from '../api/api';
import { User } from '../types/User';

type Props = {
  user: User;
  onClose?: () => void;
  onSave: (user:User)=>void;
};

const EditForm: React.FC<Props> = ({ user, onClose, onSave }) => {
  const [userData, setUserData] = useState<User | null>(null);

useEffect(() => {
  Services.getUserById(user.id)
  .then((data)=>setUserData(data))
  return () => {
  }
}, [])

  console.log(userData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
      if (prevData) {
        return { ...prevData, [name]: value };
      }
      return null;
    });
  };

  const handleSave = async(user:User) => {
    await onSave(user);
    onClose
  };

  return (
    <div className="modal is-active">
  <div className="modal-background" onClick={onClose}></div>
  <div className="modal-content">
    <div className="box">
      <form>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              value={userData?.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Birthday Date</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="birthday_date"
              value={userData?.birthday_date}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="email"
              value={userData?.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Phone Number</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="phone_number"
              value={userData?.phone_number}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Address</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="address"
              value={userData?.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={()=>handleSave(userData)}>
              Save
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
</div>

  );
};

export default EditForm;
