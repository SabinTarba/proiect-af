import { useEffect } from "react";


const useCheckToken = (setToken, setIsLoggedIn) => {
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/check`, {
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