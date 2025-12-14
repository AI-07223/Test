import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Container,
  Alert
} from '@mui/material';
import { AuthService } from '../services/authService';

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login and Register
  const [name, setName] = useState(''); // Only for registration
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegistering) {
        // Register Mode
        await AuthService.register(email, password, name);
        // After register, we can automatically login or ask them to login
        // For simplicity, let's just log them in
        await login(email, password);
      } else {
        // Login Mode
        await login(email, password);
      }
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <Container maxWidth="sm" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ minWidth: 300, padding: 3, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom align="center">
            {isRegistering ? 'Create Account' : 'ERP Login'}
          </Typography>

          <Typography sx={{ mb: 3 }} color="text.secondary" align="center">
            {isRegistering ? 'Sign up to get started' : 'Enter your credentials'}
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

            {isRegistering && (
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? 'Processing...' : (isRegistering ? 'Sign Up' : 'Login')}
            </Button>

            <Button
              color="secondary"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Already have an account? Login' : 'Need an account? Sign Up'}
            </Button>

          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
