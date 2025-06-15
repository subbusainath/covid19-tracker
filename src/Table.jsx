import React from 'react'
import { 
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
  Typography,
  Chip
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { TrendingUp } from '@mui/icons-material'

// Enhanced styled table container
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 400,
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
  borderRadius: theme.spacing(2),
  backdropFilter: 'blur(10px) saturate(1.2)',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  
  // Custom scrollbar
  '& *::-webkit-scrollbar': {
    width: 6,
  },
  '& *::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 10,
  },
  '& *::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    borderRadius: 10,
  },
}))

// Enhanced styled table row with gradient hover effects
const StyledTableRow = styled(TableRow)(({ theme, index }) => ({
  position: 'relative',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  
  // Rank-based background
  background: index === 0 
    ? 'linear-gradient(90deg, rgba(220, 38, 38, 0.1), rgba(239, 68, 68, 0.05))'
    : index === 1
    ? 'linear-gradient(90deg, rgba(234, 88, 12, 0.08), rgba(251, 146, 60, 0.04))'
    : index === 2
    ? 'linear-gradient(90deg, rgba(217, 119, 6, 0.06), rgba(245, 158, 11, 0.03))'
    : 'transparent',
  
  '&:hover': {
    background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.15), rgba(124, 58, 237, 0.1))',
    transform: 'scale(1.02)',
    boxShadow: '0 4px 20px rgba(37, 99, 235, 0.15)',
    zIndex: 1,
    
    '& .country-name': {
      color: '#2563eb',
      fontWeight: 700,
    },
    
    '& .cases-number': {
      color: '#dc2626',
      transform: 'scale(1.05)',
    },
    
    '& .rank-chip': {
      transform: 'scale(1.1)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    }
  },
  
  '&:active': {
    transform: 'scale(1.01)',
    transition: 'all 0.1s ease',
  }
}))

// Enhanced styled table cell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  fontSize: '0.9rem',
  border: 'none',
  
  '&.country-name': {
    fontWeight: 600,
    color: '#374151',
    fontFamily: '"Inter", sans-serif',
    transition: 'all 0.3s ease',
  },
  
  '&.cases-number': {
    fontWeight: 800,
    fontSize: '1rem',
    color: '#dc2626',
    textAlign: 'right',
    fontFamily: '"Poppins", sans-serif',
    transition: 'all 0.3s ease',
  },
  
  '&.rank-cell': {
    width: 60,
    padding: theme.spacing(1),
  }
}))

// Function to get rank chip styles
const getRankChipStyles = (rank) => {
  let chipStyle = {
    fontWeight: 800,
    fontSize: '0.75rem',
    minWidth: 32,
    height: 32,
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease',
  }
  
  if (rank === 1) {
    chipStyle.background = 'linear-gradient(135deg, #dc2626, #f87171)'
    chipStyle.color = 'white'
  } else if (rank === 2) {
    chipStyle.background = 'linear-gradient(135deg, #ea580c, #fb923c)'
    chipStyle.color = 'white'
  } else if (rank === 3) {
    chipStyle.background = 'linear-gradient(135deg, #d97706, #fbbf24)'
    chipStyle.color = 'white'
  } else {
    chipStyle.background = 'linear-gradient(135deg, rgba(107, 114, 128, 0.8), rgba(156, 163, 175, 0.6))'
    chipStyle.color = 'white'
  }
  
  return chipStyle
}

function Table({ countries }) {
  const formatNumber = (num) => {
    if (!num) return '0'
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Table Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1, 
        mb: 2,
        p: 2,
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.05))',
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <TrendingUp sx={{ color: '#2563eb', fontSize: '1.2rem' }} />
        <Typography variant="subtitle2" sx={{ 
          color: '#374151',
          fontWeight: 700,
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Top Countries by Cases
        </Typography>
      </Box>
      
      <StyledTableContainer component={Paper} elevation={0}>
        <MUITable stickyHeader size="small">
          <TableBody>
            {countries.slice(0, 20).map(({ country, cases }, index) => (
              <StyledTableRow key={`${country}-${index}`} index={index}>
                                 {/* Rank */}
                 <StyledTableCell className="rank-cell">
                   <Chip
                     className="rank-chip"
                     label={index + 1}
                     size="small"
                     sx={getRankChipStyles(index + 1)}
                   />
                 </StyledTableCell>
                
                {/* Country Name */}
                <StyledTableCell className="country-name">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 'inherit',
                      color: 'inherit',
                      fontSize: 'inherit'
                    }}>
                      {country}
                    </Typography>
                    {index < 3 && (
                      <Box sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: index === 0 
                          ? 'linear-gradient(135deg, #dc2626, #f87171)'
                          : index === 1
                          ? 'linear-gradient(135deg, #ea580c, #fb923c)'
                          : 'linear-gradient(135deg, #d97706, #fbbf24)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                      }} />
                    )}
                  </Box>
                </StyledTableCell>
                
                {/* Cases Number */}
                <StyledTableCell className="cases-number">
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 'inherit',
                      color: 'inherit',
                      fontSize: 'inherit'
                    }}>
                      {formatNumber(cases)}
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: '#6b7280',
                      fontSize: '0.7rem',
                      fontWeight: 500
                    }}>
                      cases
                    </Typography>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </MUITable>
      </StyledTableContainer>
      
      {/* Footer */}
      <Box sx={{ 
        mt: 1, 
        textAlign: 'center' 
      }}>
        <Typography variant="caption" sx={{ 
          color: '#9ca3af',
          fontSize: '0.75rem',
          fontWeight: 500
        }}>
          Showing top 20 countries • Click rows for details
        </Typography>
      </Box>
    </Box>
  )
}

export default Table 