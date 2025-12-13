const API_BASE_URL = 'http://localhost:8000/api';

// Auth API calls
// Add this to your existing api.js
export const authAPI = {
    login: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        return { ...data, ok: response.ok };
    },
    
    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        // const data = await response.json();
        // return { ...data, ok: response.ok };
    }
};

// Questions API calls
export const questionsAPI = {
    getQuestions: async (filters = {}) => {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE_URL}/questions?${params}`);
        return response.json();
    },
    
    createQuestion: async (questionData, token) => {
        const response = await fetch(`${API_BASE_URL}/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(questionData)
        });
        return response.json();
    },

    getQuestion: async (id) => {
        console.log(`${API_BASE_URL}/questions/${id}`);
        const response = await fetch(`${API_BASE_URL}/questions/${id}`);
        return response.json();
    }
};

// Interviews API calls
export const interviewsAPI = {
    getInterviews: async (filters = {}) => {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE_URL}/interviews?${params}`);
        return response.json();
    },
    
    createInterview: async (interviewData, token) => {
        const response = await fetch(`${API_BASE_URL}/interviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(interviewData)
        });
        return response.json();
    },

    getInterview: async (id) => {
        const response = await fetch(`${API_BASE_URL}/interviews/${id}`);
        return response.json();
    }
};

// Add this to your api.js
export const feedAPI = {
    getHomeFeed: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_BASE_URL}/questions/feed?page=${page}&limit=${limit}`);
        return response.json();
    }
};

// Also add stats API
export const statsAPI = {
    getCommunityStats: async () => {
        const response = await fetch(`${API_BASE_URL}/stats`);
        return response.json();
    }
};

// Add this to your existing api.js
export const userAPI = {
    getProfile: async () => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    },
    
    updateProfile: async (profileData) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
        });
        return response.json();
    },
    
    getUserPosts: async () => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        
        const response = await fetch(`${API_BASE_URL}/users/posts`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }
};


