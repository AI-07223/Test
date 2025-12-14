import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container
} from '@mui/material';

// We just pick from the mock emails for this demo
const MOCK_EMAILS = [
  'super@admin.com',
  'admin@company.com',
  'manager@company.com',
  'employee@company.com'
];

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedEmail, setSelectedEmail] = useState(MOCK_EMAILS[0]);

  const handleLogin = async () => {
    await login(selectedEmail);
    navigate('/');
  };

  return (
    <Container maxWidth="sm" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ minWidth: 275, padding: 3 }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            ERP System Login
          </Typography>
          <Typography sx={{ mb: 3 }} color="text.secondary">
            Select a role to simulate login:
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">User Role Simulation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={selectedEmail}
                label="User Role Simulation"
                onChange={(e) => setSelectedEmail(e.target.value)}
              >
                {MOCK_EMAILS.map(email => (
                  <MenuItem key={email} value={email}>
                    {email} ({email.split('@')[0].toUpperCase()})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
