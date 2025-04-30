import React, { useState } from 'react';

const DateFilter = ({ onFilter }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === 'fromDate') setFromDate(value);
    if (name === 'toDate') setToDate(value);
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    onFilter(fromDate, toDate);
  };

  return (
    <form onSubmit={handleFilterSubmit}>
      <input
        type="date"
        name="fromDate"
        value={fromDate}
        onChange={handleDateChange}
      />
      <input
        type="date"
        name="toDate"
        value={toDate}
        onChange={handleDateChange}
      />
      <button type="submit">Filter</button>
    </form>
  );
};

export default DateFilter;
