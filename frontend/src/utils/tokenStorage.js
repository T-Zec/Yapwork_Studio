const REFRESH_TOKEN_KEY = "refresh_token";

export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (token) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const clearTokens = () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}