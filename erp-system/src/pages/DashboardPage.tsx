import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/auth.types';
import { RoleBasedGuard } from '../components/common/RoleBasedGuard';

export const DashboardPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuth();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Assuming MUI v7 Grid is Grid2, we use container and size */}
      <Grid container spacing={3}>
        {/* KPI Card: Everyone sees this */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" color="primary">My Pending Tasks</Typography>
            <Typography variant="h3">12</Typography>
          </Paper>
        </Grid>

        {/* KPI Card: Only Managers see Department Stats */}
        <RoleBasedGuard requiredRole={UserRole.MANAGER}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#f0f4f8' }}>
              <Typography variant="h6" color="secondary">Department Performance</Typography>
              <Typography variant="h3">94%</Typography>
              <Typography variant="caption">Only visible to Managers+</Typography>
            </Paper>
          </Grid>
        </RoleBasedGuard>

        {/* KPI Card: Only Admins see System Health */}
        <RoleBasedGuard requiredRole={UserRole.ADMIN}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#ffebee' }}>
              <Typography variant="h6" color="error">System Health</Typography>
              <Typography variant="h3">Good</Typography>
              <Typography variant="caption">Only visible to Admins+</Typography>
            </Paper>
          </Grid>
        </RoleBasedGuard>
      </Grid>
    </div>
  );
};
