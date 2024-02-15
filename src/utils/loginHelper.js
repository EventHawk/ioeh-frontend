export const setAuthToken = (token) => {
    // Store the authentication token in local storage or cookies
    localStorage.setItem('authToken', token);
};
  
export const getAuthToken = () => {
    // Retrieve the authentication token from local storage or cookies
    return localStorage.getItem('authToken');
};

export const removeAuthToken = () => {
    // Remove the authentication token from local storage or cookies
    localStorage.removeItem('authToken');
};
  

export const isAuthenticated = () => {
    // Check if the user is authenticated by verifying the token's validity
    const token = getAuthToken();
    // Implement token validation logic here
    return Boolean(token);
};