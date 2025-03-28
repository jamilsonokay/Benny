import React from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Divider } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

const ErrorCorrection = () => {
  // Dados de exemplo para correção
  const documentData = {
    original: {
      name: 'Extrato Bancário',
      type: 'Extrato',
      date: '2023-10-16',
      errors: [
        { field: 'CPF', value: '123.456.789-00', error: 'CPF inválido' },
        { field: 'Nome', value: 'João da Silva', error: 'Nome não confere com documento' }
      ]
    },
    corrected: {
      name: 'Extrato Bancário',
      type: 'Extrato',
      date: '2023-10-16',
      corrections: [
        { field: 'CPF', value: '123.456.789-09' },
        { field: 'Nome', value: 'João Silva' }
      ]
    }
  };

  const [corrections, setCorrections] = React.useState(
    documentData.original.errors.reduce((acc, error) => {
      acc[error.field] = error.value;
      return acc;
    }, {})
  );

  const handleCorrectionChange = (field, value) => {
    setCorrections(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitCorrections = () => {
    console.log('Correções submetidas:', corrections);
    // Lógica para enviar correções para o backend
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Correção de Erros
      </Typography>
      
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {documentData.original.name}
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>
              Original (com erros)
            </Typography>
            
            {documentData.original.errors.map((error, index) => (
              <React.Fragment key={error.field}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="error">
                    {error.field}: {error.value}
                  </Typography>
                  <Typography variant="caption" color="error">
                    {error.error}
                  </Typography>
                </Box>
                {index < documentData.original.errors.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>
              Correção
            </Typography>
            
            {documentData.original.errors.map((error, index) => (
              <React.Fragment key={error.field}>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label={error.field}
                    value={corrections[error.field] || ''}
                    onChange={(e) => handleCorrectionChange(error.field, e.target.value)}
                    fullWidth
                    size="small"
                    error={!!error.error}
                  />
                </Box>
                {index < documentData.original.errors.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="success"
            startIcon={<CheckCircle />}
            onClick={handleSubmitCorrections}
          >
            Confirmar Correções
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ErrorCorrection;