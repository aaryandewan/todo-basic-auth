import React, { useState } from 'react';
import { TextField, Button,Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import {Link} from 'react-router-dom'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleSignUp = () => {
    // Mockup error handling
    if (!email || !password) {
      setError('Email and password are required');
      setOpen(true);
      return;
    }
    // Here you would typically make an API call.
    console.log('Signing up with:', email, password);
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
        height: '100vh' // This makes the div take the full viewport height
    }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Log In
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
        Log In
      </Button>
      <Typography variant="body2" style={{ marginTop: '20px' }}>
        Not a member? 
        <Link to="/signup" style={{ textDecoration: 'none', marginLeft: '5px' }}>
          Sign up here
        </Link>
      </Typography>

      {/* Error Dialog */}
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

export default SignUp;