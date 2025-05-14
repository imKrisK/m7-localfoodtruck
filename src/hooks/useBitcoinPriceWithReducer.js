import { useReducer, useEffect } from 'react';

const initialState = {
    price: null,
    loading: false,
    error: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, price: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export function useBitcoinPriceWithReducer(currency) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let isMounted = true;
        dispatch({ type: 'FETCH_START' });

        fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Bitcoin price');
                }
                return response.json();
            })
            .then((data) => {
                if (isMounted) {
                    const price = data.bpi[currency].rate;
                    dispatch({ type: 'FETCH_SUCCESS', payload: price });
                }
            })
            .catch((error) => {
                if (isMounted) {
                    dispatch({ type: 'FETCH_ERROR', payload: error.message });
                }
            });

        return () => {
            isMounted = false;
        };
    }, [currency]);

    return state;
}