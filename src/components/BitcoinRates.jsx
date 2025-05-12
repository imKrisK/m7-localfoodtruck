import React, { useState } from 'react';
import { useBitcoinPriceWithReducer } from '../hooks/useBitcoinPriceWithReducer';

const currencies = ['USD', 'AUD', 'NZD', 'GBP', 'EUR', 'SGD'];

function BitcoinRates() {
    const [currency, setCurrency] = useState(currencies[0]);
    const { price, error, loading } = useBitcoinPriceWithReducer(currency);

    const options = currencies.map((curr) => (
        <option value={curr} key={curr}>
            {curr}
        </option>
    ));

    return (
        <div className="BitcoinRates componentBox">
            <h3>Bitcoin Rates</h3>
            <label>
                Choose Currency:
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                >
                    {options}
                </select>
            </label>
            <div>
                {error ? (
                    <p style={{ color: 'red' }}>Error: {error}</p>
                ) : loading ? (
                    <p>Loading...</p>
                ) : (
                    <p>
                        Current Bitcoin Price in {currency}:{' '}
                        <strong>{price}</strong>
                    </p>
                )}
            </div>
        </div>
    );
}

export default BitcoinRates;