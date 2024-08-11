const API_BASE_URL = 'http://localhost:3000/process-image-url';

export const fetchSuggestions = async (design: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/suggestions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ design }), // design is image url
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.suggestions;
    } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        throw error; // re-throwing the error is important if you want to handle it in the calling component
    }
};
