import { io } from 'socket.io-client';

const getBackendUrl = (): string => {
    // In production, use the same protocol and construct backend URL
    if (import.meta.env.PROD) {
        // If frontend is on Heroku, backend is too
        // return window.location.origin. replace('frontend', 'backend');
        console.log('HERE');
        
        // Or hardcode production URL
        return 'https://night-of-code-backend-8f55fe094632.herokuapp.com';
    }
        return 'https://night-of-code-backend-8f55fe094632.herokuapp.com';
    
    // Development
    return 'http://localhost:3001';
};

export const socket = io(getBackendUrl());

