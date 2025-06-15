# COVID-19 Tracker 🦠

A modern, real-time COVID-19 statistics tracker built with React 18, Vite, and Material-UI (MUI) v5.

![COVID-19 Tracker](https://img.shields.io/badge/COVID--19-Tracker-red)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.2.8-646CFF)
![MUI](https://img.shields.io/badge/MUI-5.15.15-0081CB)

## ✨ Features

- **Real-time COVID-19 data** from Disease.sh API
- **Interactive dashboard** with statistics cards
- **Country-wise data table** with sorting
- **Dynamic charts** showing case trends over time
- **Responsive design** for all devices
- **Modern UI/UX** with Material-UI components
- **Fast development** with Vite hot reload

## 🚀 Tech Stack

### Frontend
- **React 18** - Latest React with concurrent features
- **Vite** - Ultra-fast build tool and dev server
- **Material-UI (MUI) v5** - Modern React component library
- **Emotion** - CSS-in-JS styling
- **Chart.js v4** - Beautiful interactive charts
- **Numeral.js** - Number formatting

### Development
- **Vitest** - Fast unit testing
- **TypeScript support** - Type definitions included
- **ES Modules** - Modern JavaScript module system

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/covid19-tracker.git
   cd covid19-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Available Scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build production-ready app               |
| `npm run preview` | Preview production build locally         |
| `npm run test`    | Run unit tests with Vitest               |
| `npm run test:ui` | Run tests with UI interface              |

## 📊 Data Source

This app uses the [Disease.sh API](https://disease.sh/) which provides:
- Real-time global COVID-19 statistics
- Country-wise data breakdown
- Historical data for trend analysis
- Reliable and frequently updated dataset

## 🏗️ Project Structure

```
covid19-tracker/
├── src/
│   ├── components/
│   │   ├── App.jsx          # Main application component
│   │   ├── InfoBox.jsx      # Statistics display cards
│   │   ├── LineGraph.jsx    # Chart component
│   │   ├── Table.jsx        # Country data table
│   │   ├── Map.jsx          # Map placeholder
│   │   └── utils.js         # Utility functions
│   ├── styles/
│   │   ├── App.css          # Main application styles
│   │   ├── Table.css        # Table-specific styles
│   │   └── index.css        # Global styles
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Features in Detail

### 📈 Interactive Dashboard
- Real-time statistics cards showing cases, recoveries, and deaths
- Hover effects and smooth animations
- Color-coded indicators for different data types

### 📊 Data Visualization
- Line chart showing daily new cases trend
- Interactive tooltips with formatted numbers
- Responsive chart sizing for all devices

### 🗂️ Country Data Table
- Sortable table with all country statistics
- Scrollable interface for large datasets
- Search and filter capabilities (coming soon)

### 📱 Responsive Design
- Mobile-first approach
- Optimized for tablets and desktops
- Touch-friendly interface elements

## 🔧 Development

### Environment Setup
Make sure you have Node.js 16+ installed:
```bash
node --version  # Should be 16+
npm --version   # Should be 8+
```

### Code Standards
- Use JSX file extensions for React components
- Follow ES6+ modern JavaScript syntax
- Implement proper error handling
- Add comments for complex logic

### Testing
Run tests to ensure code quality:
```bash
npm run test          # Run all tests
npm run test:ui       # Interactive test UI
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deploy Options
- **Vercel**: Perfect for React apps with automatic deployments
- **Netlify**: Static site hosting with continuous deployment
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Scalable cloud hosting solution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Disease.sh](https://disease.sh/) for providing the COVID-19 data API
- [Material-UI](https://mui.com/) for the beautiful component library
- [Chart.js](https://www.chartjs.org/) for the charting capabilities
- [Vite](https://vitejs.dev/) for the amazing development experience

## 📞 Support

If you have any questions or need help with setup, please open an issue on GitHub.

---

**Stay Safe! 😷 Keep tracking, keep healthy!**
