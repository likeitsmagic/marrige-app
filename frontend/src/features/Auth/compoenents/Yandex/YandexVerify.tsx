import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const YandexVerify = () => {
    const [searchParams] = useSearchParams()
    useEffect(() => {
        setTimeout(() => {
            window.close()
        }, 2000)
    }, []);
    return <div>{JSON.stringify(searchParams)}</div>
}