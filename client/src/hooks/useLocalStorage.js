import {useState,useEffect} from 'react'

const MAIN = "App"
const PREFIX = 'chat-';
var main_arr = [];

export default function useLocalStorage(key,initialValue) {
    const prefixedkey = PREFIX + key;
    const [storedValue,setStoredValue] = useState(() => {
        const jsonvalue = localStorage.getItem(prefixedkey);
        if(jsonvalue !== null) return JSON.parse(jsonvalue);
        if (typeof initialValue === 'function') return initialValue();
        else return initialValue;
    });
    // var json = {
    //     key1: key
    // }

    // console.log(key +"="+ JSON.stringify(storedValue));
    useEffect(() => {
        localStorage.setItem(prefixedkey,JSON.stringify(storedValue));
    },[storedValue, prefixedkey]);
    
    
    return [storedValue,setStoredValue];
}

