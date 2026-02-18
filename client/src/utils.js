export const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const getApiUrl = () => {
    let url = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    // Trim whitespace
    url = url.trim();

    // Check for protocol
    if (!url.match(/^https?:\/\//)) {
        if (url.includes('localhost') || url.includes('127.0.0.1')) {
            url = 'http://' + url;
        } else {
            url = 'https://' + url;
        }
    }

    // Remove trailing slash if present
    return url.replace(/\/$/, '');
};
