# Polling Station Finder Uganda

A modern, responsive web application built with React and Material-UI that helps Ugandan voters find their polling stations by entering their Voter Identification Number (VIN).

![Polling Station Finder App Screenshot](app-screenshot.png)

## Features

- 🔍 **Voter Information Lookup**: Easily search for polling stations using Voter ID
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🌓 **Dark/Light Mode**: Toggle between dark and light themes
- 📋 **Search History**: View and manage your previous searches
- ⚡ **Performance Optimized**: Fast loading and responsive interactions
- 🔒 **Secure**: No sensitive data storage on client-side

## Tech Stack

- **Frontend Framework**: React 19
- **UI Library**: Material-UI (MUI) 5
- **Routing**: React Router 7
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Date Formatting**: date-fns
- **Notifications**: Notistack
- **Build Tool**: Vite
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/polling-station-checker-ug.git
   cd polling-station-checker-ug
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API configuration:
   ```
   VITE_API_BASE_URL=http://your-api-url.com/api
   VITE_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173` to see the application.

## Building for Production

To build the application for production:

```bash
npm run build
```

The optimized build will be available in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
polling-station-checker-ug/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, icons, and other resources
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Layout components
│   ├── pages/             # Page components
│   ├── services/          # API service functions
│   ├── styles/            # Global styles and theme configuration
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global CSS
├── .env                   # Environment variables (not in version control)
├── .eslintrc.js           # ESLint configuration
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Performance Optimizations

This application includes several performance optimizations:

1. **Memoization**: Components use React.memo, useMemo, and useCallback to prevent unnecessary re-renders
2. **Code Splitting**: Pages are loaded lazily using React's dynamic import
3. **Image Optimization**: Images are optimized for faster loading
4. **Debouncing**: User input is debounced to reduce API calls
5. **Caching**: API responses are cached in sessionStorage to minimize network requests
6. **Animation Optimization**: Animations are hardware-accelerated for smoother performance

## Accessibility

The application follows WAI-ARIA guidelines and includes features such as:

- Proper focus management
- Screen reader-friendly markup
- Keyboard navigation support
- Sufficient color contrast
- Resizable text
- Alternative text for images

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Electoral Commission of Uganda](https://www.ec.or.ug/) for providing the API service
- [Material-UI](https://mui.com/) for the UI component library
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool