import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Button, Chip, Divider } from '@mui/material';
import { CheckCircle, Warning, Error, Notifications } from '@mui/icons-material';

const NotificationsCenter = () => {
  // Dados de exemplo para notificações
  const notifications = [
    {
      id: 1,
      title: 'Validação pendente',
      message: 'O documento "Contrato Cliente A" aguarda sua validação',
      type: 'warning',
      date: '2023-10-15 10:30',
      read: false
    },
    {
      id: 2,
      title: 'Erro de validação',
      message: 'CPF inválido detectado no documento "Extrato Bancário"',
      type: 'error',
      date: '2023-10-16 14:15',
      read: false
    },
    {
      id: 3,
      title: 'Validação concluída',
      message: 'O documento "Comprovante de Renda" foi aprovado',
      type: 'success',
      date: '2023-10-17 09:45',
      read: true
    }
  ];

  const [notificationsList, setNotificationsList] = React.useState(notifications);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle color="success" />;
      case 'warning':
        return <Warning color="warning" />;
      case 'error':
        return <Error color="error" />;
      default:
        return <Notifications color="info" />;
    }
  };

  const markAsRead = (id) => {
    setNotificationsList(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationsList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Central de Notificações
      </Typography>
      
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Alertas e Mensagens
          </Typography>
          <Button 
            variant="outlined" 
            size="small"
            onClick={markAllAsRead}
            disabled={notificationsList.every(n => n.read)}
          >
            Marcar todas como lidas
          </Button>
        </Box>
        
        <List>
          {notificationsList.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem 
                sx={{ 
                  bgcolor: notification.read ? 'inherit' : '#f5f5f5',
                  borderRadius: 1
                }}
              >
                <ListItemIcon>
                  {getNotificationIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={notification.title}
                  secondary={`${notification.message} • ${notification.date}`}
                  primaryTypographyProps={{ 
                    fontWeight: notification.read ? 'normal' : 'bold' 
                  }}
                />
                {!notification.read && (
                  <Button 
                    size="small" 
                    variant="text"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Marcar como lida
                  </Button>
                )}
              </ListItem>
              {index < notificationsList.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default NotificationsCenter;