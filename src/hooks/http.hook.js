import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // собственный хук, устанавливающий состояние loading и error при выполнении запроса на сервер.
    // UseCallback используется для кеширования функции request, что дает возможноть ее использования без дополнительного вызова и перерисовки компонента
    // данный хук только отправляет запрос на сервер, но не обрабатывает ошибки. поэтому используется try-catch
    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        setLoading(true);
        try {
            const response = await fetch(url, { method, body, headers });
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            setLoading(false);
            return data;

        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null),[]);

    return {loading,request,error, clearError}
}