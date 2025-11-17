const API_BASE_URL = 'http://localhost:5000/api';

// Auth API calls
export const authAPI = {
    login: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    },
    
    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
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
    }
};