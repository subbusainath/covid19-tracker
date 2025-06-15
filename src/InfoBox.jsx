import React from 'react'
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  IconButton,
  Chip
} from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import { 
  TrendingUp, 
  HealthAndSafety, 
  Warning,
  Coronavirus
} from '@mui/icons-material'

// Enhanced Animation keyframes
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.6);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 15px rgba(220, 38, 38, 0.1);
    transform: scale(1.05);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
    transform: scale(1);
  }
`

const countUpAnimation = keyframes`
  from {
    transform: translateY(30px) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`

const glowAnimation = keyframes`
  0%, 100% {
    filter: brightness(1) drop-shadow(0 0 10px rgba(37, 99, 235, 0.3));
  }
  50% {
    filter: brightness(1.2) drop-shadow(0 0 20px rgba(37, 99, 235, 0.6));
  }
`

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`

// Enhanced styled component with vibrant colors and better visibility
const StyledInfoBox = styled(Card)(({ theme, isred, active }) => ({
  flex: 1,
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  minHeight: '140px',
  
  // Enhanced background with stronger contrast
  background: active 
    ? (isred 
        ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(234, 88, 12, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)')
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
  
  // Enhanced border with gradient
  border: active 
    ? `3px solid ${isred ? '#dc2626' : '#059669'}`
    : '2px solid rgba(255, 255, 255, 0.3)',
  
  // Dynamic shadows
  boxShadow: active 
    ? (isred 
        ? '0 16px 40px rgba(220, 38, 38, 0.3), 0 8px 16px rgba(0, 0, 0, 0.1)'
        : '0 16px 40px rgba(5, 150, 105, 0.3), 0 8px 16px rgba(0, 0, 0, 0.1)')
    : '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
  
  backdropFilter: 'blur(20px) saturate(1.5)',
  
  // Gradient top bar
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    background: isred 
      ? 'linear-gradient(90deg, #dc2626 0%, #ea580c 50%, #f97316 100%)'
      : 'linear-gradient(90deg, #059669 0%, #10b981 50%, #34d399 100%)',
    opacity: active ? 1 : 0.6,
    transition: 'opacity 0.3s ease',
  },
  
  // Glow effect on hover
  '&:hover': {
    transform: 'translateY(-12px) scale(1.05)',
    boxShadow: isred 
      ? '0 20px 60px rgba(220, 38, 38, 0.4), 0 16px 32px rgba(0, 0, 0, 0.15)'
      : '0 20px 60px rgba(5, 150, 105, 0.4), 0 16px 32px rgba(0, 0, 0, 0.15)',
    animation: `${floatAnimation} 2s ease-in-out infinite`,
    
    '&::before': {
      opacity: 1,
      height: 8,
    },
    
    '& .infoBox__icon': {
      transform: 'scale(1.2) rotate(10deg)',
      opacity: 0.6,
    },
    
    '& .infoBox__cases': {
      animation: `${glowAnimation} 2s ease-in-out infinite`,
    }
  },
  
  '&:active': {
    transform: 'translateY(-8px) scale(1.02)',
    transition: 'all 0.1s ease',
  },
  
  // Background icon with better visibility
  '& .infoBox__icon': {
    position: 'absolute',
    top: theme.spacing(2.5),
    right: theme.spacing(2.5),
    opacity: 0.25,
    fontSize: '3.5rem',
    color: isred ? '#dc2626' : '#059669',
    transition: 'all 0.3s ease',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
  },
  
  // Enhanced main number styling
  '& .infoBox__cases': {
    color: isred ? '#dc2626' : '#059669',
    fontWeight: 900,
    fontSize: '2.8rem',
    marginBottom: theme.spacing(1),
    fontFamily: '"Poppins", sans-serif',
    lineHeight: 1,
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    animation: active ? `${countUpAnimation} 0.8s cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
    
    // Enhanced gradient text
    background: isred 
      ? 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #f97316 100%)'
      : 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    
    // Fallback for browsers that don't support gradient text
    '@supports not (-webkit-background-clip: text)': {
      background: 'none',
      WebkitTextFillColor: 'inherit',
      color: isred ? '#dc2626' : '#059669',
    }
  },
  
  // Enhanced title styling
  '& .infoBox__title': {
    color: '#374151',
    fontWeight: 700,
    fontSize: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: theme.spacing(1.5),
    fontFamily: '"Inter", sans-serif',
  },
  
  // Enhanced subtitle styling
  '& .infoBox__total': {
    color: '#6b7280',
    fontSize: '0.875rem',
    fontWeight: 600,
    opacity: 0.8,
  },
  
  // Enhanced change indicator
  '& .infoBox__change': {
    position: 'absolute',
    top: theme.spacing(2.5),
    left: theme.spacing(2.5),
    animation: active && isred ? `${pulseAnimation} 3s infinite` : 'none',
    '& .MuiChip-root': {
      fontWeight: 700,
      fontSize: '0.75rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    }
  }
}))

const InfoIconMap = {
  'Total Cases': Coronavirus,
  'Recovered': HealthAndSafety,
  'Deaths': Warning,
}

function InfoBox({ title, cases, total, active, isRed, onClick, ...props }) {
  const IconComponent = InfoIconMap[title] || TrendingUp
  
  const formatNumber = (num) => {
    if (!num) return '0'
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  const getTrendColor = () => {
    if (title === 'Recovered') return 'success'
    if (title === 'Deaths') return 'error'
    return 'warning'
  }

  const getChipStyle = () => {
    const baseStyle = {
      fontSize: '0.75rem',
      fontWeight: 700,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    }
    
    if (title === 'Recovered') {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.9), rgba(16, 185, 129, 0.8))',
        color: 'white',
      }
    } else if (title === 'Deaths') {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.9), rgba(234, 88, 12, 0.8))',
        color: 'white',
      }
    } else {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.9), rgba(245, 158, 11, 0.8))',
        color: 'white',
      }
    }
  }

  return (
    <StyledInfoBox 
      isred={isRed} 
      active={active} 
      onClick={onClick}
      {...props}
    >
      <CardContent sx={{ 
        position: 'relative', 
        pb: 3, 
        pt: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Background Icon */}
        <IconComponent className="infoBox__icon" />
        
        {/* Today's Change Indicator */}
        {cases > 0 && (
          <Box className="infoBox__change">
            <Chip
              size="small"
              label={`+${formatNumber(cases)}`}
              sx={getChipStyle()}
            />
          </Box>
        )}
        
        {/* Title */}
        <Typography 
          className="infoBox__title" 
          variant="overline"
          sx={{ mt: cases > 0 ? 4 : 1 }}
        >
          {title}
        </Typography>
        
        {/* Main Number */}
        <Box className="infoBox__cases">
          {formatNumber(total)}
        </Box>
        
        {/* Subtitle */}
        <Typography 
          className="infoBox__total" 
          variant="body2"
        >
          {cases > 0 ? `+${formatNumber(cases)} today` : 'Total reported'}
        </Typography>
        
        {/* Progress indicator for active state */}
        {active && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              background: isRed 
                ? 'linear-gradient(90deg, #dc2626, #ea580c)'
                : 'linear-gradient(90deg, #059669, #10b981)',
              animation: `${pulseAnimation} 2s ease-in-out infinite`,
            }}
          />
        )}
      </CardContent>
    </StyledInfoBox>
  )
}

export default InfoBox 