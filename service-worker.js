// Installation event listener
chrome.runtime.onInstalled.addListener(() => {
    console.log('Weather Widget extension installed');
});

// Here you can add background tasks, such as periodic weather updates
// Note: In Manifest V3, service workers are terminated when idle
// Use chrome.alarms API for periodic tasks 