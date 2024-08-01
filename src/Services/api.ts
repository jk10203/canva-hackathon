const API_BASE_URL = 'https://backend-api.com';

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
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        throw error; // re-throwing the error is important if you want to handle it in the calling component
    }
};
