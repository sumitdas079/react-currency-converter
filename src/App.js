
import { useEffect, useState } from 'react'
import Currency from './Currency'

const App = () => {

  const url = 'https://api.exchangerate.host/latest'

  const [options, setOptions] = useState([])
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [exchangerate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountfrom, setAmountFrom] = useState(true)

  let fromAmt, toAmt
  if (amountfrom) {
    fromAmt = amount
    toAmt = amount * exchangerate
  }
  else {
    toAmt = amount
    fromAmt = amount / exchangerate
  }

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const first = Object.keys(data.rates)[0]
        setOptions([data.base, ...Object.keys(data.rates)])
        setFrom(data.base)
        setTo(first)
        setExchangeRate(data.rates[first])
      })
  }, [])

  useEffect(() => {
    if(from!=null && to!=null)
    {
      fetch(`${url}?base=${from}&symbols=${to}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[to]))
    }
  },[from, to])

  function handleFromAmountChange(e)
  {
    setAmount(e.target.value)
    setAmountFrom(true)
  }

  function handleToAmountChange(e)
  {
    setAmount(e.target.value)
    setAmountFrom(false)
  }


  return (
    <div className='container p-5'>
      <h1 className='text-center p-4'>Convert</h1>
      <Currency
        options={options}
        selected={from}
        onchange={e => setFrom(e.target.value)}
        amount={fromAmt}
        onChangeAmount={handleFromAmountChange} />
      <div className="text-center text-lg pb-3">
        <h2>=</h2>
      </div>
      <Currency
        options={options}
        selected={to}
        onchange={e => setTo(e.target.value)}
        amount={toAmt}
        onChangeAmount={handleToAmountChange} />
    </div>
  )
}

export default App