import React, { useState, useEffect } from 'react'
import { 
  FormControl, 
  Select, 
  MenuItem, 
  CardContent, 
  Card,
  Typography,
  Box,
  Container,
  Paper,
  Skeleton,
  Fade,
  Zoom,
  Grid,
  Alert,
  LinearProgress,
  Chip
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { 
  Public, 
  TrendingUp, 
  Timeline,
  Assessment
} from '@mui/icons-material'
import InfoBox from './InfoBox.jsx'
import Map from './Map.jsx'
import Table from './Table.jsx'
import './App.css'
import { sortData } from './utils.js'
import LineGraph from './LineGraph.jsx'

// Enhanced styled components for modern UI with better visibility
const AppContainer = styled(Container)(({ theme }) => ({
  maxWidth: '1400px !important',
  padding: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}))

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(4),
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
  borderRadius: theme.spacing(3),
  backdropFilter: 'blur(20px) saturate(1.5)',
  border: '3px solid rgba(255, 255, 255, 0.4)',
  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(37, 99, 235, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  
  // Animated gradient background
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, transparent 0%, rgba(37, 99, 235, 0.05) 50%, transparent 100%)',
    zIndex: -1,
  },
  
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(3),
    textAlign: 'center',
    padding: theme.spacing(3),
  },
}))

const StatsGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiGrid-item': {
    display: 'flex',
  },
}))

const SidePanel = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(3),
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
  backdropFilter: 'blur(20px) saturate(1.5)',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12), 0 6px 20px rgba(124, 58, 237, 0.08)',
  height: 'fit-content',
  position: 'sticky',
  top: theme.spacing(2),
  transition: 'all 0.3s ease',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 16px 50px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(124, 58, 237, 0.12)',
  }
}))

const MapSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.85) 100%)',
  borderRadius: theme.spacing(3),
  backdropFilter: 'blur(15px) saturate(1.2)',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
  
  '& .map-title': {
    marginBottom: theme.spacing(3),
    fontWeight: 800,
    fontSize: '1.5rem',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textAlign: 'center',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontFamily: '"Poppins", sans-serif',
  }
}))

const ModernSelect = styled(Select)(({ theme }) => ({
  minWidth: 220,
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: theme.spacing(2),
  fontWeight: 600,
  fontSize: '1rem',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(37, 99, 235, 0.15)',
  },
  
  '&.Mui-focused': {
    boxShadow: '0 8px 30px rgba(37, 99, 235, 0.25)',
  },
  
  '& .MuiSelect-icon': {
    color: '#2563eb',
  }
}))

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '0.875rem',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  
  '&.online': {
    background: 'linear-gradient(135deg, #059669, #10b981)',
    color: 'white',
  },
  
  '&.loading': {
    background: 'linear-gradient(135deg, #d97706, #f59e0b)',
    color: 'white',
  },
}))

const TitleText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 900,
  fontSize: '4rem',
  lineHeight: 1,
  background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 30%, #f97316 60%, #d97706 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  letterSpacing: '-2px',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}))

const LoadingSkeleton = ({ height = 200 }) => (
  <Skeleton 
    variant="rectangular" 
    width="100%" 
    height={height} 
    sx={{ 
      borderRadius: 3, 
      mb: 2,
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)',
      '&::after': {
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
      }
    }}
    animation="wave"
  />
)

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases")
  const [loading, setLoading] = useState(true)
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3)
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString())
 
  // Fetch worldwide data on initial load
  useEffect(() => {
    const fetchWorldwideData = async () => {
      try {
        const response = await fetch("https://disease.sh/v3/covid-19/all")
        const data = await response.json()
        setCountryInfo(data)
        setLastUpdated(new Date().toLocaleString())
      } catch (error) {
        console.error('Error fetching worldwide data:', error)
      }
    }
    fetchWorldwideData()
  }, [])
  
  // Fetch countries data
  useEffect(() => {
    const getCountriesData = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://disease.sh/v3/covid-19/countries")
        const data = await response.json()
        
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }))
        
        const sortedData = sortData(data)
        setTableData(sortedData)
        setMapCountries(data)
        setCountries(countries)
        setLastUpdated(new Date().toLocaleString())
      } catch (error) {
        console.error('Error fetching countries data:', error)
      } finally {
        setLoading(false)
      }
    }
    getCountriesData()
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)

    const url = countryCode === "worldwide" ?
      "https://disease.sh/v3/covid-19/all" : 
      `https://disease.sh/v3/covid-19/countries/${countryCode}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      setCountryInfo(data)
      setLastUpdated(new Date().toLocaleString())
      
      // Update map center for specific country
      if (countryCode !== "worldwide") {
        setMapCenter([data.countryInfo.lat, data.countryInfo.lng])
        setMapZoom(4)
      } else {
        setMapCenter([34.80746, -40.4796])
        setMapZoom(3)
      }
    } catch (error) {
      console.error('Error fetching country data:', error)
    }
  }

  const formatNumber = (num) => {
    if (!num) return '0'
    return num.toLocaleString()
  }

  return (
    <AppContainer maxWidth="xl">
      {/* Header Section */}
      <Fade in timeout={1000}>
        <HeaderSection>
          <Box display="flex" alignItems="center" gap={2}>
            <Public sx={{ fontSize: '3rem', color: '#2563eb' }} />
            <Box>
              <TitleText variant="h1" component="h1">
                COVID-19 Tracker
              </TitleText>
              <Typography variant="h6" sx={{ 
                color: '#6b7280', 
                fontWeight: 600,
                fontSize: '1.1rem',
                mt: 1
              }}>
                Real-time Global Pandemic Data
              </Typography>
            </Box>
          </Box>
          
          <Box display="flex" flexDirection="column" alignItems="flex-end" gap={2}>
            <StatusChip 
              icon={<TrendingUp />}
              label={loading ? "Updating..." : "Live Data"}
              className={loading ? "loading" : "online"}
            />
            
            <FormControl>
              <ModernSelect
                variant="outlined"
                value={country}
                onChange={onCountryChange}
                displayEmpty
              >
                <MenuItem value="worldwide">🌍 Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.name} value={country.value}>
                    {country.name}
                  </MenuItem>
                ))}
              </ModernSelect>
            </FormControl>
            
            <Typography variant="caption" sx={{ 
              color: '#9ca3af', 
              fontSize: '0.75rem',
              fontWeight: 500
            }}>
              Updated: {lastUpdated}
            </Typography>
          </Box>
        </HeaderSection>
      </Fade>

      {/* Main Content Grid */}
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          {/* Stats Cards */}
          <Zoom in timeout={800}>
            <StatsGrid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={4}>
                <InfoBox
                  isRed
                  active={casesType === "cases"}
                  onClick={() => setCasesType("cases")}
                  title="Total Cases"
                  cases={countryInfo.todayCases}
                  total={countryInfo.cases}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <InfoBox
                  active={casesType === "recovered"}
                  onClick={() => setCasesType("recovered")}
                  title="Recovered"
                  cases={countryInfo.todayRecovered}
                  total={countryInfo.recovered}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <InfoBox
                  isRed
                  active={casesType === "deaths"}
                  onClick={() => setCasesType("deaths")}
                  title="Deaths"
                  cases={countryInfo.todayDeaths}
                  total={countryInfo.deaths}
                />
              </Grid>
            </StatsGrid>
          </Zoom>

          {/* Map Section */}
          <Fade in timeout={1200}>
            <MapSection>
              <Box display="flex" alignItems="center" justifyContent="center" gap={2} mb={2}>
                <Typography className="map-title" sx={{ 
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  margin: 0,
                  fontWeight: 700,
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '1.5rem',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Interactive Global Map
                </Typography>
              </Box>
              
              {loading ? (
                <LoadingSkeleton height={400} />
              ) : (
                <Map
                  casesType={casesType}
                  countries={mapCountries}
                  center={mapCenter}
                  zoom={mapZoom}
                />
              )}
            </MapSection>
          </Fade>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          <Fade in timeout={1400}>
            <Box display="flex" flexDirection="column" gap={3}>
              {/* Live Cases Chart */}
              <SidePanel>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Timeline sx={{ color: '#7c3aed' }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700,
                    color: '#374151',
                    fontFamily: '"Inter", sans-serif'
                  }}>
                    Worldwide Trend
                  </Typography>
                </Box>
                
                {loading ? (
                  <LoadingSkeleton height={200} />
                ) : (
                  <LineGraph casesType={casesType} />
                )}
              </SidePanel>

              {/* Countries Table */}
              <SidePanel>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Assessment sx={{ color: '#db2777' }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700,
                    color: '#374151',
                    fontFamily: '"Inter", sans-serif'
                  }}>
                    Live Cases by Country
                  </Typography>
                </Box>
                
                {loading ? (
                  <LoadingSkeleton height={300} />
                ) : (
                  <Table countries={tableData} />
                )}
              </SidePanel>
            </Box>
          </Fade>
        </Grid>
      </Grid>
      
      {/* Data Source Footer */}
      <Box sx={{ 
        mt: 4, 
        p: 2, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.6))',
        borderRadius: 3,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <Typography variant="caption" sx={{ 
          color: '#6b7280',
          fontWeight: 500,
          fontSize: '0.875rem'
        }}>
          Data source: disease.sh API • Updates every 10 minutes
        </Typography>
      </Box>
    </AppContainer>
  )
}

export default App 