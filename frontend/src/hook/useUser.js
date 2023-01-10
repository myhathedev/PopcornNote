import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';

export default function useUser() {
    const [user,setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [username,setUsername] = useState(null);

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            const uid = user && user.uid;
            console.log(uid);
            const getusername = async () => {
                const response = await axios.get(`http://localhost:${process.env.PORT||8000}/api/getusername/${uid}`);
                setUsername(response.data);
            }
            if (user) {getusername()};
            console.log(username);
            setIsLoading(false);
        });
        return unsubscribe();
       
    },[username]);

    return {user, isLoading,username};

}

