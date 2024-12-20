import { useEffect } from "react";
import { API_URL } from "../constants";


const useCheckToken = (setToken, setIsLoggedIn) => {
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch(`${API_URL}/auth/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token})
            })
            .then((res) => res.json())
            .then((res) => {
                if (res.data.valid) {
                    setToken(token)
                    setIsLoggedIn(true);
                }
            })
            .catch(() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
            })
        } 
    })
}

export default useCheckToken;