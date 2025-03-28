import React from 'react'
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DocumentPanel from './components/DocumentPanel'
import ValidationPanel from './components/ValidationPanel'
import NotificationsCenter from './components/NotificationsCenter'
import WorkflowVisualization from './components/WorkflowVisualization'
import ErrorCorrection from './components/ErrorCorrection'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box sx={{ flexGrow: 1 }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<DocumentPanel />} />
              <Route path="/validation" element={<ValidationPanel />} />
              <Route path="/notifications" element={<NotificationsCenter />} />
              <Route path="/workflow" element={<WorkflowVisualization />} />
              <Route path="/correction" element={<ErrorCorrection />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App