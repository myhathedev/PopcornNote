import { signOut,getAuth } from 'firebase/auth';
import { useEffect } from 'react';

export default function Logout () {

useEffect (() => {
    signOut(getAuth());
    window.location.replace("/contactus");
})
    
}