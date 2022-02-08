import React from 'react';

const Currency = ({ options,selected,onchange,amount,onChangeAmount }) => {
    return (
        <>
            <div className="input-group mb-3">
                <input type="text" value={amount} onChange={onChangeAmount} className="form-control mx-auto w-50" />
                <select value={selected} onChange={onchange} className="currency form-select-md">
                    {options.map(
                        option => (<option key={option} value={option}>{option}</option>)
                    )}
                </select>
            </div>
        </>
    )
};

export default Currency;

