import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketColumn from './TicketColumn';

const KanbanBoard = () => {
  const [data, setData] = useState(null);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');
  const [display,setDisplay] = useState('priority');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
const groupData = (data, groupBy) => {
    if (groupBy === 'status') {
      // Group by status
      return data.reduce((grouped, ticket) => {
        const groupKey = ticket.status;
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        grouped[groupKey].push(ticket);
        return grouped;
      }, {});
    } else if (groupBy === 'userId') {
      // Group by user
      return data.reduce((grouped, ticket) => {
        const groupKey = ticket.userId;
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        grouped[groupKey].push(ticket);
        return grouped;
      }, {});
    } else if (groupBy === 'priority') {
      // Group by priority
      return data.reduce((grouped, ticket) => {
        const groupKey = getPriorityLabel(ticket.priority);
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        grouped[groupKey].push(ticket);
        return grouped;
      }, {});
    }
    return {};
  };

  const sortData = (data, sortBy) => {
    if (sortBy === 'priority') {
      // Sort by priority
      return data.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      // Sort by title
      return data.sort((a, b) => a.title.localeCompare(b.title));
    }
    return data;
  };

const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4:
        return 'Urgent';
      case 3:
        return 'High';
      case 2:
        return 'Medium';
      case 1:
        return 'Low';
      case 0:
        return 'No priority';
      default:
        return 'Unknown Priority';
    }
  };
  
  if (!data) {
    return <div>Loading...</div>;
  }

  const groupedData = groupData(data.tickets, groupBy);




  const getSortBy = (display) => {
    if (display === "priority_title") {
      return "priority";
    } else if (display === "title_priority") {
      return "title";
    } else {
      return display;
    }
  };
  





  return (


<div className='navbar'>
      <div>
        <label>Group By:</label>
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="status">Status</option>
          <option value="userId">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div>
        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div style={{ display: 'flex' }}>
        {Object.entries(groupedData).map(([groupKey, groupTickets]) => (
          <TicketColumn key={groupKey} title={groupKey} tickets={sortData(groupTickets, sortBy)} getPriorityLabel={getPriorityLabel} />
        ))}
      </div>
    </div>


  );
};

export default KanbanBoard;