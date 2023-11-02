import React, { useEffect, useState } from 'react';
import * as Services from '../api/api';
import { User } from '../types/User';
import { TextField, Button, Modal, Box } from '@mui/material';
type Props = {
  user: User;
  onClose?: () => void;
  onSave: (user:User)=>void;
};

const EditForm: React.FC<Props> = ({ user, onClose, onSave }) => {
  const [userData, setUserData] = useState<User>({
    id: 0,
    name: "",
    birthday_date: "",
    email: "",
    phone_number: "",
    address: ""
  });

  useEffect(() => {
    Services.getUserById(user.id)
      .then((data) => setUserData(data));
  }, [user.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
      if (prevData) {
        return { ...prevData, [name]: value };
      }
      return prevData;
    });
  };

  const handleSave = async (user: User) => {
    await onSave(user);
    onClose && onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
     <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 400,
          bgcolor: 'background.paper',
          p: 2,
          margin: 'auto', 
          marginTop: '15vh',
          outline: 'none'
        }}
      >
        <form>
          <TextField
            label="Name"
            name="name"
            value={userData?.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Birthday Date"
            name="birthday_date"
            value={userData?.birthday_date}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={userData?.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phone_number"
            value={userData?.phone_number}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={userData?.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="contained" onClick={() => handleSave(userData)}>
              Save
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditForm;