import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet'
import { Box, Typography, Chip, Skeleton } from '@mui/material'
import { styled } from '@mui/material/styles'
import numeral from 'numeral'
import 'leaflet/dist/leaflet.css'

// Styled components for modern look
const MapWrapper = styled(Box)(({ theme }) => ({
  height: 500,
  width: '100%',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  border: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  '& .leaflet-container': {
    height: '100%',
    width: '100%',
    borderRadius: theme.spacing(2),
  },
  '& .leaflet-popup-content-wrapper': {
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[8],
  },
  '& .leaflet-popup-tip': {
    borderTop: `7px solid white`,
  }
}))

const LoadingWrapper = styled(Box)(({ theme }) => ({
  height: 500,
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
}))

const PopupContent = styled(Box)(({ theme }) => ({
  minWidth: 200,
  padding: theme.spacing(1),
  '& .country-name': {
    fontWeight: 600,
    fontSize: '1.1rem',
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  '& .stat-row': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(0.5),
  }
}))

// Component to handle map updates
function MapUpdater({ center, zoom }) {
  const map = useMap()
  
  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom)
    }
  }, [map, center, zoom])
  
  return null
}

// Utility functions for map visualization
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 300,
  },
  recovered: {
    hex: "#7dd71d", 
    multiplier: 400,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 800,
  },
}

// Show data on map as circles
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <PopupContent>
          <Typography className="country-name">
            <img 
              src={country.countryInfo.flag} 
              alt={country.country}
              style={{ width: 20, height: 'auto', marginRight: 8, borderRadius: 2 }}
            />
            {country.country}
          </Typography>
          
          <Box className="stat-row">
            <Typography variant="body2">Cases:</Typography>
            <Chip 
              label={numeral(country.cases).format("0,0")} 
              size="small" 
              color="error"
              variant="outlined"
            />
          </Box>
          
          <Box className="stat-row">
            <Typography variant="body2">Recovered:</Typography>
            <Chip 
              label={numeral(country.recovered).format("0,0")} 
              size="small" 
              color="success"
              variant="outlined"
            />
          </Box>
          
          <Box className="stat-row">
            <Typography variant="body2">Deaths:</Typography>
            <Chip 
              label={numeral(country.deaths).format("0,0")} 
              size="small" 
              color="default"
              variant="outlined"
            />
          </Box>
          
          <Box className="stat-row" sx={{ mt: 1, pt: 1, borderTop: '1px solid #eee' }}>
            <Typography variant="caption" color="textSecondary">
              Population: {numeral(country.population).format("0.0a")}
            </Typography>
          </Box>
        </PopupContent>
      </Popup>
    </Circle>
  ))

function Map({ countries, casesType, center, zoom }) {
  const [mapData, setMapData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (countries && countries.length > 0) {
      setMapData(countries)
      setLoading(false)
    }
  }, [countries])

  // Default map center (showing world view)
  const defaultCenter = center || [34.80746, -40.4796]
  const defaultZoom = zoom || 3

  if (loading) {
    return (
      <LoadingWrapper>
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={500} 
          sx={{ borderRadius: 2 }}
        />
      </LoadingWrapper>
    )
  }

  return (
    <MapWrapper>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={center} zoom={zoom} />
        {showDataOnMap(mapData, casesType)}
      </MapContainer>
    </MapWrapper>
  )
}

export default Map 