import { useReducer, useEffect } from 'react';

const initialState = {
    price: null,
    error: null,
    loading: true,
};

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return { ...state, price: action.payload, error: null, loading: false };
        case 'FETCH_ERROR':
            return { ...state, price: null, error: action.payload, loading: false };
        case 'FETCH_LOADING':
            return { ...state, loading: true };
        default:
            return state;
    }
}

export function useBitcoinPrice(currency) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();

        const fetchBitcoinPrice = async () => {
            dispatch({ type: 'FETCH_LOADING' });
            try {
                const response = await fetch(
                    `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`,
                    { signal: controller.signal }
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch Bitcoin price');
                }
                const data = await response.json();
                if (!ignore) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: data.bpi[currency].rate });
                }
            } catch (err) {
                if (!ignore) {
                    dispatch({ type: 'FETCH_ERROR', payload: err.message });
                }
            }
        };

        fetchBitcoinPrice();

        return () => {
            ignore = true;
            controller.abort();
        };
    }, [currency]);

    return state;
}