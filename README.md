
# WeatherApp Frontend

This is the frontend for the WeatherApp, implemented using React and Vite. The application allows users to view the weather for a specified city, handle user authentication, access protected routes, and add comments. It includes features such as a dark mode/light mode toggle and a weather forecast visualization.

## Features

- Display current weather for a specified city
- User authentication (login/logout)
- Access protected/unprotected routes
- Add comments
- Toggle between dark mode and light mode
- Hourly weather forecast using charts

## Technologies Used

- React
- JavaScript
- Recharts
- @mui/material
- Vite

## Installation

### Prerequisites

- Node.js (v14.x or higher recommended)
- npm (v6.x or higher) or yarn

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/denis-svg/weather_app.git
   cd weather_app
   ```

2. **Install the dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Using yarn:
   ```bash
   yarn install
   ```
   
3. **Run the development server:**

   Using npm:
   ```bash
   npm run dev
   ```

   Using yarn:
   ```bash
   yarn dev
   ```

   The application will be accessible at `http://localhost:3000`.

## Usage

1. **Open the application in your web browser:**

   Navigate to `http://localhost:3000`.

2. **Login/Sign up:**

   Use the authentication system to log in or create a new account.

3. **View Weather:**

   Enter the name of a city to view its current weather and hourly forecast.

4. **Toggle Dark Mode/Light Mode:**

   Use the provided toggle switch to switch between dark and light modes.

5. **Add Comments:**

   Add comments to the weather data for the specified city.

## Project Structure

```
weather_app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── .env
├── package.json
├── vite.config.js
├── README.md
└── ...
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or new features to suggest.

