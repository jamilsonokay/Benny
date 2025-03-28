import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import { CheckCircle, Cancel, HourglassEmpty } from '@mui/icons-material';

const DocumentPanel = () => {
  // Dados de exemplo para documentos
  const documents = [
    { id: 1, name: 'Contrato Cliente A', type: 'Contrato', status: 'approved', date: '2023-10-15' },
    { id: 2, name: 'Extrato Bancário', type: 'Extrato', status: 'rejected', date: '2023-10-16' },
    { id: 3, name: 'Comprovante de Renda', type: 'Comprovante', status: 'pending', date: '2023-10-17' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle color="success" />;
      case 'rejected':
        return <Cancel color="error" />;
      default:
        return <HourglassEmpty color="warning" />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Painel de Documentos
      </Typography>
      
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Documentos em Processamento
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Documento</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>
                    <Chip label={doc.type} variant="outlined" />
                  </TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getStatusIcon(doc.status)}
                      <Typography>{doc.status === 'approved' ? 'Aprovado' : doc.status === 'rejected' ? 'Rejeitado' : 'Pendente'}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="contained" color="success" size="small">
                        Aprovar
                      </Button>
                      <Button variant="outlined" color="error" size="small">
                        Rejeitar
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DocumentPanel;