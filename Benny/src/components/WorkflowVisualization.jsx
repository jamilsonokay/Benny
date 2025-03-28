import React from 'react';
import { Box, Typography, Paper, Stepper, Step, StepLabel, StepConnector, styled } from '@mui/material';
import { CheckCircle, HourglassEmpty, Error } from '@mui/icons-material';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderColor: theme.palette.divider,
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

const WorkflowVisualization = () => {
  const steps = [
    { label: 'Upload', status: 'completed', date: '2023-10-15' },
    { label: 'Validação', status: 'completed', date: '2023-10-16' },
    { label: 'Aprovação', status: 'active', date: '2023-10-17' },
    { label: 'Finalizado', status: 'pending', date: '' },
  ];

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle color="success" />;
      case 'active':
        return <HourglassEmpty color="warning" />;
      case 'pending':
        return <HourglassEmpty color="disabled" />;
      default:
        return <Error color="error" />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Visualização do Fluxo de Trabalho
      </Typography>
      
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Jornada do Documento
        </Typography>
        
        <Stepper 
          orientation="vertical" 
          connector={<QontoConnector />}
          activeStep={2}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel 
                StepIconComponent={() => getStepIcon(step.status)}
                optional={step.date && (
                  <Typography variant="caption">{step.date}</Typography>
                )}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </Box>
  );
};

export default WorkflowVisualization;