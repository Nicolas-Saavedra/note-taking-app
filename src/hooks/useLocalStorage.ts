import { useEffect, useState } from "react";

function useLocalStorage<T>(defaultValue: T, key: string) {

    const [value, setValue] = useState<T>(defaultValue)

    useEffect(() => {
        const item = localStorage.getItem(key);
        if (item) {
            setValue(JSON.parse(item))
        }
    },[key])

    useEffect(() => {
        const item = JSON.stringify(value);
        if (item) {
            localStorage.setItem(key, item)
        }
    },[value, key])
    
    return [value, setValue] as const;
}

export { useLocalStorage };