/**
 * Utility functions for COVID-19 tracker
 */

/**
 * Sort countries data by total cases in descending order
 * @param {Array} data - Array of country objects
 * @returns {Array} - Sorted array by cases
 */
export const sortData = (data) => {
    if (!Array.isArray(data)) {
        console.warn('sortData: Expected array, received:', typeof data)
        return []
    }

    const sortedData = [...data].sort((a, b) => {
        const casesA = a.cases || 0
        const casesB = b.cases || 0
        return casesB - casesA
    })

    return sortedData
}

/**
 * Format number with appropriate suffix (K, M, B)
 * @param {number} num - Number to format
 * @returns {string} - Formatted number string
 */
export const prettyPrintStat = (stat) => {
    return stat ? `+${stat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : "+0"
}

/**
 * Get case type colors for map visualization
 * @param {string} casesType - Type of cases
 * @returns {Object} - Color configuration
 */
export const getCasesTypeColors = (casesType = "cases") => {
    const colors = {
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
    return colors[casesType] || colors.cases
}

/**
 * Calculate map circle radius based on case numbers
 * @param {number} cases - Number of cases
 * @param {string} casesType - Type of cases
 * @returns {number} - Circle radius
 */
export const calculateRadius = (cases, casesType = "cases") => {
    const colors = getCasesTypeColors(casesType)
    return Math.sqrt(cases) * colors.multiplier
}