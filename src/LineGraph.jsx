import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import numeral from 'numeral'
import { Box, CircularProgress } from '@mui/material'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

// Chart options configuration for Chart.js v4
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(context) {
          return numeral(context.parsed.y).format('+0,0')
        },
      },
    },
  },
  elements: {
    point: {
      radius: 0,
      hoverRadius: 4,
    },
    line: {
      tension: 0.1,
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        parser: 'MM/dd/yy',
        tooltipFormat: 'll',
        displayFormats: {
          day: 'MMM dd'
        }
      },
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: true,
        color: 'rgba(0,0,0,0.1)',
      },
      ticks: {
        callback: function(value) {
          return numeral(value).format('0a')
        },
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
}

function LineGraph({ caseType = 'cases', className }) {
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  const chartRef = useRef(null)

  // Build chart data from API response
  const buildChartData = useCallback((data, caseType) => {
    let chartData = []
    let lastDataPoint

    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[caseType][date] - lastDataPoint,
        }
        chartData.push(newDataPoint)
      }
      lastDataPoint = data[caseType][date]
    }
    return chartData
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
        )
        const data = await response.json()
        const processedData = buildChartData(data, caseType)
        setChartData(processedData)
      } catch (error) {
        console.error('Error fetching chart data:', error)
        setChartData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [caseType, buildChartData])

  // Cleanup chart instance on unmount to prevent canvas reuse error
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        try {
          chartRef.current.destroy()
        } catch (error) {
          // Chart might already be destroyed
          console.warn('Chart cleanup warning:', error.message)
        }
      }
    }
  }, [])

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height={300}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box className={className} sx={{ height: 300, width: '100%' }}>
      {chartData?.length > 0 && (
        <Line
          ref={chartRef}
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: 'rgba(204, 16, 52, 0.1)',
                borderColor: '#CC1034',
                borderWidth: 2,
                data: chartData,
                fill: true,
                pointBackgroundColor: '#CC1034',
                pointBorderColor: '#CC1034',
                pointHoverBackgroundColor: '#CC1034',
                pointHoverBorderColor: '#CC1034',
              },
            ],
          }}
        />
      )}
    </Box>
  )
}

export default LineGraph 