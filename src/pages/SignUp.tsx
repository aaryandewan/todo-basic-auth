import React, { useState } from 'react';
import { TextField, Button,Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link,useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      setOpen(true);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to sign up');
        setOpen(true);
      } else {
        // successful signup 
        navigate('/login');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setOpen(true);
    }    
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh'
    }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        InputProps={{
          startAdornment: <EmailIcon />,
        }}
        value={email}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        InputProps={{
          startAdornment: <LockIcon />,
        }}
        value={password}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSignUp}
        style={{ marginTop: '20px' }}
      >
        Sign Up
      </Button>
      <Typography variant="body2" style={{ marginTop: '20px' }}>
        Already a member? 
        <Link to="/login" style={{ textDecoration: 'none', marginLeft: '5px' }}>
          Log in here
        </Link>
      </Typography>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>{error}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Signup;
