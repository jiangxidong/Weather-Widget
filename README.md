# Weather Widget Chrome Extension

A beautiful and intuitive weather widget that displays real-time weather information with a dynamic UI that adapts to temperature changes. Built with modern web technologies and featuring a sleek glass-morphism design.

![Weather Widget Screenshot](promo/screenshots/promo-main.png)

## ✨ Features

- **Real-time Weather Updates**: Get current weather conditions instantly
- **Dynamic UI**: Background colors change based on temperature
- **Location Detection**: Automatic local weather with geolocation
- **City Search**: Look up weather for any city worldwide
- **Detailed Information**: Temperature, humidity, wind speed, and weather conditions
- **Modern Design**: Beautiful glass-morphism UI with smooth animations
- **Responsive Layout**: Adapts perfectly to different window sizes
- **Offline Support**: Graceful fallback to last known data
- **Privacy Focused**: No personal data storage or tracking

## 🚀 Installation

### From Chrome Web Store
1. Visit the [Weather Widget Chrome Web Store page](your-store-link)
2. Click "Add to Chrome"
3. Click "Add Extension" in the popup

### For Development
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/weather-widget.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## 🎯 Usage

1. Click the Weather Widget icon in your Chrome toolbar
2. Allow location access for automatic local weather (optional)
3. Or search for any city using the search bar
4. View detailed weather information including:
   - Current temperature
   - Weather conditions
   - Humidity levels
   - Wind speed

## 🛠️ Technical Details

- Built with Manifest V3
- Uses QWeather API for weather data
- Modern JavaScript (ES6+)
- CSS3 with glass-morphism effects
- Responsive design principles
- Service Worker for background tasks

## 📦 Project Structure

```
├── manifest.json          // Extension configuration
├── popup/                 // Popup window files
│   ├── popup.html        // Main popup interface
│   ├── popup.css         // Styles and animations
│   └── popup.js          // Core functionality
├── assets/               // Static resources
│   └── icons/           // Extension icons
├── service-worker.js     // Background service worker
└── README.md            // Documentation
```

## 🔑 API Key

This extension uses the QWeather API. To run your own version:
1. Get an API key from [QWeather](https://dev.qweather.com/)
2. Replace the API_KEY constant in `popup.js`

## 🔒 Privacy

We take privacy seriously. This extension:
- Only collects location data with explicit permission
- Doesn't store any personal information
- Makes secure API calls over HTTPS
- See our full [Privacy Policy](PRIVACY.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work - [Your GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- [QWeather](https://www.qweather.com/) for providing the weather API
- [Font Awesome](https://fontawesome.com/) for the beautiful icons
- All our contributors and users

## 📞 Support

If you have any questions or need help, please:
- Open an issue in this repository
- Contact us at [your-email@example.com]
- Visit our [GitHub Discussions](https://github.com/yourusername/weather-widget/discussions) 