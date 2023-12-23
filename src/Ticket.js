import React from 'react';

const Ticket = ({ ticket, getPriorityLabel }) => {
  return (
    <div style={{ margin: '0 0 10px 0', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}>
      {`${ticket.title} - ${getPriorityLabel(ticket.priority)}`}
    </div>
  );
};

export default Ticket;
