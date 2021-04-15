import React from 'react';
import RequestHistorySearch from '../cards/RequestHistorySearch';
import RequestHistoryList from '../cards/RequestHistoryList';

const RequestHistoryPage = () => {
  return (
    <div>
      <RequestHistorySearch/>
      <RequestHistoryList/>
    </div>
  )
}

export default RequestHistoryPage;