const currencies = ['USD', 'AUD', 'NZD', 'GBP', 'EUR', 'SGD'];

function BitcoinRates() {

    const [currency, setCurrency] = useState(currencies[0]); // State for selected currency
    const options = currencies.map((curr) => <options value={curr} key={curr}>{curr}</options>); // Generate options for the select dropdown
    const [price, setPrice] = useState(null); // State for Bitcoin price
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        let ignore = false; // Flag to prevent state updates if component unmounts
        const controller = new AbortController(); // For cleanup of fetch requests

        const fetchBitcoinPrice = async () => {
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
                    setPrice(data.bpi[currency].rate); // Update price state
                }
            } catch (err) {
                if (!ignore) {
                    setError(err.message); // Update error state
                }
            }
        };

        fetchBitcoinPrice();

        return () => {
            ignore = true; // Prevent state updates
            controller.abort(); // Cancel fetch request
        };
    }, [currency]); // Effect runs when currency changes

    return (
        <div className="BitcoinRates componentBox">
            <h3>Bitcoin Rates</h3>
            <label>
                choose Currency:
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                >
                    {options} {/* Render the currency options */}
                </select>
            </label>
            <div>
                {error ? (
                    <p style={{ color: 'red' }}>Error: {error}</p>
                ) : price ? (
                    <p>
                        Current Bitcoin Price in {currency}: <strong>{price}</strong>
                    </p>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default BitcoinRates;