import React, { useState, useEffect, useMemo } from 'react';
import * as Services from '../api/api';
import { User } from '../types/User';
import { Data } from '../types/Data';
import PaginationComponent from './Pagination';
import EditForm from './EditForm';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { peopleFilter } from '../utils/filterFunc';
import { Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

type Props = {
  login: (value: boolean) => void;
};

const convertDateFormat = (dateString: string): string | null => {
  const parts: string[] = dateString.split('-');
  if (parts.length === 3) {
    const year: string = parts[2].length === 2 ? `20${parts[2]}` : parts[2];
    return `${year}-${parts[1]}-${parts[0]}`;
  } else {
    return null;
  }
};

const TablePage: React.FC<Props> = ({ login }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [paginationData, setPaginationData] = useState<Data | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [query, setQuery] = useState("");

  const editUser = (user: User) => {

    const updatedUsers = users.map((item) =>
      item.id === user.id ? user : item
    );

    const date = convertDateFormat(user.birthday_date)
    const updatedUser = { ...user, birthday_date: date !== null ? date : '' }

    Services.updateUser(user.id, updatedUser).then(() => {
      setUsers(updatedUsers);
      toast.success('User updated successfully');
    })
      .catch(() => {
        toast.error('Failed to update user');

      });

    setEditedUser(null);
  }

  useEffect(() => {
    Services.getUsers()
      .then((data: Data) => {
        setUsers(data.results);
        setPaginationData(data);
      })
      .catch(() => { });
  }, []);

  const handlePageChange = (url: string) => {
    Services.getUsersByUrl(url)
      .then((data: Data) => {
        setUsers(data.results);
        setPaginationData(data);
      })
      .catch(() => { });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    if (value.trim() === '') {
      searchParams.delete('search');
    } else {
      searchParams.set('search', value);
    }
    window.history.replaceState(null, '', `${url.pathname}?${searchParams.toString()}`);
    localStorage.setItem('searchParams', JSON.stringify({ search: value }));
  };

  useEffect(() => {
    const searchParams = JSON.parse(localStorage.getItem('searchParams') || '{}');
    setQuery(searchParams.search || '');
  }, []);

  useEffect(() => {
    const searchParams = JSON.parse(localStorage.getItem('searchParams') || '{}');
    const savedQuery = searchParams.search || '';
    setQuery(savedQuery);

    const url = new URL(window.location.href);
    const searchParamsFromUrl = new URLSearchParams(url.search);
    const savedSearchParams = JSON.parse(localStorage.getItem('searchParams') || '{}');

    Object.keys(savedSearchParams).forEach((key) => {
      searchParamsFromUrl.set(key, savedSearchParams[key]);
    });

    window.history.replaceState(null, '', `${url.pathname}?${searchParamsFromUrl.toString()}`);
  }, []);

  const visiblePeople = useMemo(() => (
    peopleFilter(users,
      {
        query,
      })
  ), [query, users]);

  return (
    <div className='container'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <Typography variant="h5">Table Page</Typography>
        <Button variant="contained" color="warning" onClick={() => login(false)}>Logout</Button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <TextField
          fullWidth
          margin="dense"
          className='input mb-2'
          label="Search by name or email"
          variant="outlined"
          value={query}
          onChange={handleSearchChange}
        />
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell >ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Birthday Date</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visiblePeople.map((user) => (
              <TableRow key={user.id} onClick={() => setEditedUser(user)}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.birthday_date}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>{user.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {paginationData && <PaginationComponent
        count={paginationData.count}
        next={paginationData.next}
        previous={paginationData.previous}
        fetchData={handlePageChange}
      />}

      {editedUser && <EditForm user={editedUser} onClose={() => setEditedUser(null)} onSave={editUser} />}
    </div>
  );
};

export default TablePage;