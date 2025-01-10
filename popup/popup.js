// API 配置
const API_KEY = 'cf83bdbb5ea2498fbe71d140d2bfb8dc';
const WEATHER_API_URL = 'https://devapi.qweather.com/v7/weather/now';
const GEO_API_URL = 'https://geoapi.qweather.com/v2/city/lookup';
const DEFAULT_CITY = 'new york';

// 温度范围对应的背景颜色
const TEMP_COLORS = {
    freezing: ['#1E90FF', '#87CEEB'],     // 低于 0°C
    cold: ['#6E8EFB', '#A777E3'],         // 0-10°C
    mild: ['#89F7FE', '#66A6FF'],         // 10-20°C
    warm: ['#FDB777', '#FF8C42'],         // 20-30°C
    hot: ['#FF512F', '#F09819']           // 30°C 以上
};

// DOM 元素
const elements = {
    citySearch: document.getElementById('citySearch'),
    searchBtn: document.getElementById('searchBtn'),
    locationBtn: document.getElementById('locationBtn'),
    loading: document.getElementById('loading'),
    weather: document.getElementById('weather'),
    location: document.getElementById('location'),
    temp: document.getElementById('temp'),
    humidity: document.getElementById('humidity'),
    wind: document.getElementById('wind'),
    weatherIcon: document.getElementById('weather-icon')
};

// 根据温度获取背景颜色
function getBackgroundColors(temperature) {
    if (temperature < 0) return TEMP_COLORS.freezing;
    if (temperature < 10) return TEMP_COLORS.cold;
    if (temperature < 20) return TEMP_COLORS.mild;
    if (temperature < 30) return TEMP_COLORS.warm;
    return TEMP_COLORS.hot;
}

// 更新背景颜色
function updateBackgroundColor(temperature) {
    const [color1, color2] = getBackgroundColors(temperature);
    document.body.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
}

// 获取天气图标
function getWeatherIconClass(iconCode) {
    // 将和风天气的图标代码映射到 Font Awesome 图标类
    const iconMap = {
        '100': 'sun',           // 晴
        '101': 'cloud',         // 多云
        '102': 'cloud-sun',     // 少云
        '103': 'cloud-sun',     // 晴间多云
        '104': 'cloud',         // 阴
        '150': 'moon',          // 晴（夜间）
        '151': 'cloud-moon',    // 多云（夜间）
        '152': 'cloud-moon',    // 少云（夜间）
        '153': 'cloud-moon',    // 晴间多云（夜间）
        '300': 'cloud-rain',    // 阵雨
        '301': 'cloud-rain',    // 强阵雨
        '302': 'cloud-bolt',    // 雷阵雨
        '303': 'cloud-bolt',    // 强雷阵雨
        '304': 'cloud-bolt',    // 雷阵雨伴有冰雹
        '305': 'cloud-rain',    // 小雨
        '306': 'cloud-rain',    // 中雨
        '307': 'cloud-rain',    // 大雨
        '308': 'cloud-rain',    // 极端降雨
        '309': 'cloud-rain',    // 毛毛雨
        '310': 'cloud-rain',    // 暴雨
        '311': 'cloud-rain',    // 大暴雨
        '312': 'cloud-rain',    // 特大暴雨
        '313': 'cloud-rain',    // 冻雨
        '314': 'cloud-rain',    // 小到中雨
        '315': 'cloud-rain',    // 中到大雨
        '316': 'cloud-rain',    // 大到暴雨
        '317': 'cloud-rain',    // 暴雨到大暴雨
        '318': 'cloud-rain',    // 大暴雨到特大暴雨
        '399': 'cloud-rain',    // 雨
        '400': 'snowflake',     // 小雪
        '401': 'snowflake',     // 中雪
        '402': 'snowflake',     // 大雪
        '403': 'snowflake',     // 暴雪
        '404': 'snowflake',     // 雨夹雪
        '405': 'snowflake',     // 雨雪天气
        '406': 'snowflake',     // 阵雨夹雪
        '407': 'snowflake',     // 阵雪
        '408': 'snowflake',     // 小到中雪
        '409': 'snowflake',     // 中到大雪
        '410': 'snowflake',     // 大到暴雪
        '499': 'snowflake',     // 雪
        '500': 'smog',          // 薄雾
        '501': 'smog',          // 雾
        '502': 'smog',          // 霾
        '503': 'wind',          // 扬沙
        '504': 'wind',          // 浮尘
        '507': 'wind',          // 沙尘暴
        '508': 'wind',          // 强沙尘暴
        '509': 'smog',          // 浓雾
        '510': 'smog',          // 强浓雾
        '511': 'smog',          // 中度霾
        '512': 'smog',          // 重度霾
        '513': 'smog',          // 严重霾
        '514': 'smog',          // 大雾
        '515': 'smog',          // 特强浓雾
        '900': 'temperature-high', // 热
        '901': 'temperature-low',  // 冷
        '999': 'question'          // 未知
    };

    return iconMap[iconCode] || 'question';
}

// 显示加载状态
function showLoading() {
    elements.loading.classList.remove('hidden');
    elements.weather.classList.add('hidden');
}

// 显示天气信息
function showWeather(weatherData, locationName) {
    if (weatherData && weatherData.temp) {
        elements.loading.classList.add('hidden');
        elements.weather.classList.remove('hidden');
        elements.weather.dataset.hasData = 'true';

        // 更新天气信息
        elements.location.textContent = locationName;
        const temperature = Math.round(parseFloat(weatherData.temp));
        elements.temp.textContent = temperature;
        elements.humidity.textContent = `${weatherData.humidity}%`;
        elements.wind.textContent = `${weatherData.windSpeed} km/h`;
        
        // 使用 Font Awesome 图标
        const iconClass = getWeatherIconClass(weatherData.icon);
        elements.weatherIcon.className = `fas fa-${iconClass} weather-icon`;

        // 更新背景颜色
        updateBackgroundColor(temperature);
    }
}

// 清除搜索框
function clearSearch() {
    elements.citySearch.value = '';
}

// 获取城市ID
async function getCityId(cityName) {
    const response = await fetch(
        `${GEO_API_URL}?location=${encodeURIComponent(cityName)}&key=${API_KEY}`
    );
    
    const data = await response.json();
    if (data.code === '200' && data.location && data.location.length > 0) {
        return {
            id: data.location[0].id,
            name: data.location[0].name
        };
    }
    throw new Error('City not found');
}

// 通过城市名称获取天气
async function getWeatherByCity(city, isInitialLoad = false) {
    try {
        showLoading();
        const cityInfo = await getCityId(city);
        
        const response = await fetch(
            `${WEATHER_API_URL}?location=${cityInfo.id}&key=${API_KEY}`
        );
        
        const data = await response.json();
        if (data.code === '200') {
            showWeather(data.now, cityInfo.name);
            if (!isInitialLoad) {
                clearSearch();
            }
        } else {
            throw new Error('Weather data not available');
        }
    } catch (error) {
        // 如果获取天气失败，静默加载默认城市
        if (city !== DEFAULT_CITY) {
            await getWeatherByCity(DEFAULT_CITY, true);
        }
    }
}

// 通过地理位置获取天气
async function getWeatherByLocation(position) {
    try {
        showLoading();
        const { latitude, longitude } = position.coords;
        
        const response = await fetch(
            `${GEO_API_URL}?location=${longitude},${latitude}&key=${API_KEY}`
        );
        
        const data = await response.json();
        if (data.code === '200' && data.location && data.location.length > 0) {
            const cityId = data.location[0].id;
            const cityName = data.location[0].name;
            
            const weatherResponse = await fetch(
                `${WEATHER_API_URL}?location=${cityId}&key=${API_KEY}`
            );
            
            const weatherData = await weatherResponse.json();
            if (weatherData.code === '200') {
                showWeather(weatherData.now, cityName);
                return;
            }
        }
        throw new Error('Location data not available');
    } catch (error) {
        // 如果获取位置或天气失败，静默加载默认城市
        await getWeatherByCity(DEFAULT_CITY, true);
    }
}

// 事件监听器
elements.searchBtn.addEventListener('click', () => {
    const city = elements.citySearch.value.trim();
    if (city) {
        getWeatherByCity(city);
    }
});

elements.citySearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = elements.citySearch.value.trim();
        if (city) {
            getWeatherByCity(city);
        }
    }
});

elements.locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            getWeatherByLocation,
            () => getWeatherByCity(DEFAULT_CITY, true)
        );
    } else {
        getWeatherByCity(DEFAULT_CITY, true);
    }
});

// 初始化加载
document.addEventListener('DOMContentLoaded', () => {
    elements.weather.dataset.hasData = 'false';
    showLoading();
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            getWeatherByLocation,
            () => getWeatherByCity(DEFAULT_CITY, true)
        );
    } else {
        getWeatherByCity(DEFAULT_CITY, true);
    }
}); 