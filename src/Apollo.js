import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const EXCHANGE_RATES = gql`
query rates($currency: String!) {
    rates(currency: $currency) {
      currency
      rate
    }
  }
`;

const Apollo = function () {
  const [currentCurrency, setCurrentCurrency] = React.useState('RUB')
  const {data, loading, error} = useQuery(EXCHANGE_RATES, {variables : {currency: currentCurrency}})

  const currencyChange = (name) => {
    setCurrentCurrency(name)
  }
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  
  return (
    <React.Fragment>
      <p style={{marginBottom: '20px', padding: '5px', fontSize: '18px', borderBottom: '1px solid black'}}>Все валюты, относительно выбранной (<b>{currentCurrency}</b>):</p>
      {data.rates.filter(d => d.currency !== currentCurrency).map(({ currency, rate }, i) => (
        <div key={i} style={{ display: 'inline-block', width: '30%', marginRight: '20px', textAlign: 'left' }}>
          <p><b style={{cursor: 'pointer'}} onClick={()=>currencyChange(currency)}>{currency}</b>: <i>{rate}</i></p>
        </div>
      ))
      }
  </React.Fragment>
  )
}
export default Apollo