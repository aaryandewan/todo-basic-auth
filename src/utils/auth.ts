interface DecodedJWT {
    exp: number;
  }
  
  // Function to decode JWT and check its validity
  export const decodeJWT = (token: string): DecodedJWT | null => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }
  };
  
  // Function to check if the user is authenticated
  export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    const decoded = decodeJWT(token);
    if (!decoded || new Date(decoded.exp * 1000) < new Date()) {
      // Token is either invalid or expired
      return false;
    }
    return true;
  };
  