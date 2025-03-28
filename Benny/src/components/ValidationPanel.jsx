import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, Collapse } from '@mui/material';
import { CheckCircle, Cancel, HourglassEmpty, ExpandMore, ExpandLess } from '@mui/icons-material';

const ValidationPanel = () => {
  // Dados de exemplo para validação
  const validationData = [
    {
      id: 1,
      document: 'Contrato Cliente A',
      extractedData: {
        nome: 'João Silva',
        cpf: '123.456.789-00',
        valor: 'R$ 10.000,00',
        data: '15/10/2023'
      },
      errors: [
        { field: 'cpf', message: 'CPF inválido' },
        { field: 'valor', message: 'Valor não corresponde ao extrato bancário' }
      ],
      suggestions: [
        { field: 'cpf', suggestion: '123.456.789-09' },
        { field: 'valor', suggestion: 'R$ 9.500,00' }
      ],
      status: 'pending'
    },
    {
      id: 2,
      document: 'Extrato Bancário',
      extractedData: {
        nome: 'Maria Souza',
        cpf: '987.654.321-00',
        saldo: 'R$ 5.000,00',
        data: '16/10/2023'
      },
      errors: [],
      suggestions: [],
      status: 'approved'
    }
  ];

  const [expandedRows, setExpandedRows] = React.useState([]);

  const toggleRow = (id) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

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

  const handleApprove = (id) => {
    // Lógica para aprovar documento
    console.log(`Documento ${id} aprovado`);
  };

  const handleReject = (id) => {
    // Lógica para rejeitar documento
    console.log(`Documento ${id} rejeitado`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Painel de Validação com IA
      </Typography>
      
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Documentos para Validação
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Documento</TableCell>
                <TableCell>Dados Extraídos</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {validationData.map((item) => (
                <React.Fragment key={item.id}>
                  <TableRow>
                    <TableCell>{item.document}</TableCell>
                    <TableCell>
                      <Button 
                        endIcon={expandedRows.includes(item.id) ? <ExpandLess /> : <ExpandMore />}
                        onClick={() => toggleRow(item.id)}
                      >
                        Ver Detalhes
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getStatusIcon(item.status)}
                        <Typography>{item.status === 'approved' ? 'Aprovado' : item.status === 'rejected' ? 'Rejeitado' : 'Pendente'}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                          variant="contained" 
                          color="success" 
                          size="small"
                          onClick={() => handleApprove(item.id)}
                        >
                          Aprovar
                        </Button>
                        <Button 
                          variant="outlined" 
                          color="error" 
                          size="small"
                          onClick={() => handleReject(item.id)}
                        >
                          Rejeitar
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                      <Collapse in={expandedRows.includes(item.id)} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            Detalhes da Validação
                          </Typography>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1">Dados Extraídos:</Typography>
                            <Box component="pre" sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                              {JSON.stringify(item.extractedData, null, 2)}
                            </Box>
                          </Box>
                          
                          {item.errors.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="subtitle1" color="error">Erros Detectados:</Typography>
                              <ul>
                                {item.errors.map((error, index) => (
                                  <li key={index}>
                                    <strong>{error.field}:</strong> {error.message}
                                  </li>
                                ))}
                              </ul>
                            </Box>
                          )}
                          
                          {item.suggestions.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="subtitle1">Sugestões de Correção:</Typography>
                              <ul>
                                {item.suggestions.map((suggestion, index) => (
                                  <li key={index}>
                                    <strong>{suggestion.field}:</strong> {suggestion.suggestion}
                                  </li>
                                ))}
                              </ul>
                            </Box>
                          )}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ValidationPanel;