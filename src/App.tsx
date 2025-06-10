import { useEffect, useState, createContext } from "react";

const CURRENCY_BY_LANG = {
  en: { code: "USD", locale: "en-US" },
  sq: { code: "ALL", locale: "sq-AL" },
  it: { code: "EUR", locale: "it-IT" },
};

export const CurrencyContext = createContext({
  rates: { USD: 1, ALL: 100, EUR: 0.9 }, // defaults
  currency: "USD",
  locale: "en-US",
  formatPrice: (usdPrice) => `$${usdPrice}`,
});

function App() {
  const [rates, setRates] = useState({ USD: 1, ALL: 100, EUR: 0.9 });
  const [rateDate, setRateDate] = useState('');
  const [currency, setCurrency] = useState(CURRENCY_BY_LANG['en'].code);
  const [locale, setLocale] = useState(CURRENCY_BY_LANG['en'].locale);

  useEffect(() => {
    // Fetch rates if day changed or never loaded
    const today = new Date().toISOString().split('T')[0];
    if (rateDate === today) return;
    fetch('https://api.exchangerate.host/latest?base=USD&symbols=ALL,EUR,USD')
      .then(r=>r.json())
      .then(data => {
        if(data && data.rates) {
          setRates({ USD: 1, ALL: data.rates.ALL, EUR: data.rates.EUR });
          setRateDate(today);
        }
      })
      .catch(()=>{});
  }, [rateDate]);

  useEffect(() => {
    // Set currency/locale by language
    setCurrency(CURRENCY_BY_LANG[language]?.code || "USD");
    setLocale(CURRENCY_BY_LANG[language]?.locale || "en-US");
  }, [language]);

  function formatPrice(usd) {
    const val = usd * (rates[currency] || 1);
    if (currency === 'ALL' || currency === 'EUR') {
      // Round to nearest integer, no decimals
      return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(Math.round(val));
    } else {
      // USD, keep decimals
      return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(val);
    }
  }

  return (
    <CurrencyContext.Provider value={{
      rates, currency, locale, formatPrice,
    }}>
      {/* ...rest of your app, e.g. <CartProvider>... */}
    </CurrencyContext.Provider>
  );
}

export default App;
