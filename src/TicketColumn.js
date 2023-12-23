import React from 'react';
import Ticket from './Ticket';

const TicketColumn = ({ title, tickets, getPriorityLabel }) => {
  return (
    <div style={{ flex: 1, margin: '10px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h3>{title}</h3>
      {tickets.map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} getPriorityLabel={getPriorityLabel} />
      ))}
    </div>
  );
};

export default TicketColumn;