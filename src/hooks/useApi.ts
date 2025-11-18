import { useState, useCallback } from 'react';

interface ApiState<T> {
    data: T | null;
    error: Error | null;  
    isLoading: boolean;   
}

type ApiHookResult<T, Args extends any[]> = [
    ApiState<T>,
    (...args: Args) => Promise<T | void>
];

export const useApi = <T, Args extends any[]>(
    apiFunc: (...args: Args) => Promise<T>
): ApiHookResult<T, Args> => {
    const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
});

const execute = useCallback(
    async (...args: Args): Promise<T | void> => {
        setState({
        data: null,
        error: null,
        isLoading: true,
    });
    try {
        const responseData = await apiFunc(...args);
        
        setState({
            data: responseData,
            error: null,
            isLoading: false,
        });
        
        return responseData;

        } catch (err) {
        console.error('Error en useApi hook:', err);
        setState({
            data: null,
            error: err as Error,
            isLoading: false,
        });
        }
    },
    [apiFunc]
);

return [state, execute];
};