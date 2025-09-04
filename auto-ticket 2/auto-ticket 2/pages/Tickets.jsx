import React, { useState, useEffect } from 'react';
import { ticketService } from '../../services/ticketServices.js';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchType, setSearchType] = useState('all'); // 'all', 'license', 'lot'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAllTickets();
  }, []);

  const fetchAllTickets = async () => {
    try {
      setLoading(true);
      setError('');
      const ticketData = await ticketService.getAllTickets();
      setTickets(ticketData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchTickets = async () => {
    try {
      setLoading(true);
      setError('');
      
      let ticketData;
      switch (searchType) {
        case 'license':
          ticketData = await ticketService.getTicketsByLicensePlate(searchQuery);
          break;
        case 'lot':
          ticketData = await ticketService.getTicketsByLotId(searchQuery);
          break;
        case 'all':
        default:
          ticketData = await ticketService.getAllTickets();
          break;
      }
      
      setTickets(ticketData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return price ? `R ${parseFloat(price).toFixed(2)}` : 'Not paid';
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    return dateTimeString;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchType === 'all') {
      fetchAllTickets();
    } else {
      searchTickets();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="text-white text-xl">Loading tickets...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{backgroundColor: '#000000', color: '#ffffff'}}>
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <h1 className="text-3xl font-bold mb-8" style={{color: '#ffffff'}}> Tickets</h1>

       
        <div className="w-full max-w-md mb-8 p-4 border border-gray-700 rounded-lg">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: '#cccccc'}}>
                Search By:
              </label>
              <select 
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              >
                <option value="all">All Tickets</option>
                <option value="license">License Plate</option>
                <option value="lot">Parking Lot</option>
              </select>
            </div>

            {(searchType === 'license' || searchType === 'lot') && (
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#cccccc'}}>
                  {searchType === 'license' ? 'License Plate' : 'Lot ID'}:
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchType === 'license' ? 'Enter license plate' : 'Enter lot ID'}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                />
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              {searchType === 'all' ? 'Refresh All' : 'Search'}
            </button>
          </form>
        </div>

        {error && (
          <div className="w-full max-w-md mb-6 p-4 bg-red-900 text-white rounded-lg text-center">
            {error}
            <button 
              onClick={fetchAllTickets}
              className="ml-4 bg-red-700 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        )}

        
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {tickets.map((ticket) => (
              <div 
                key={ticket.ticketId} 
                className="rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 border border-gray-700 w-full max-w-sm" 
                style={{backgroundColor: '#000000', color: '#ffffff'}}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold" style={{color: '#ffffff'}}>
                    {ticket.ticketId}
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={{color: '#cccccc'}}>Vehicle:</span>
                    <span className="text-sm font-semibold" style={{color: '#ffffff'}}>
                      {ticket.licensePlate}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={{color: '#cccccc'}}>Parking Lot:</span>
                    <span className="text-sm font-semibold" style={{color: '#ffffff'}}>
                      {ticket.lotId}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={{color: '#cccccc'}}>Entry Time:</span>
                    <span className="text-sm font-semibold" style={{color: '#ffffff'}}>
                      {formatDateTime(ticket.entryTime)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={{color: '#cccccc'}}>Exit Time:</span>
                    <span className="text-sm font-semibold" style={{color: '#ffffff'}}>
                      {formatDateTime(ticket.exitTime) || 'Still parked'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-700 mt-3">
                    <span className="text-lg font-medium" style={{color: '#ffffff'}}>Price:</span>
                    <span className="text-xl font-bold" style={{color: '#4ade80'}}>
                      {formatPrice(ticket.price)}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-700">
                  <button className="flex-1 py-2 px-3 rounded-md text-sm transition duration-200" 
                          style={{backgroundColor: '#4b5563', color: '#ffffff'}}>
                    View Details
                  </button>
                  <button className="flex-1 py-2 px-3 rounded-md text-sm transition duration-200" 
                          style={{backgroundColor: '#374151', color: '#ffffff'}}>
                    Print
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {tickets.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold mb-2" style={{color: '#ffffff'}}>
              {searchType === 'all' ? 'No tickets found' : 'No matching tickets'}
            </h3>
            <p style={{color: '#cccccc'}}>
              {searchType === 'all' 
                ? 'You don\'t have a tickets yet.' 
                : 'Try a different search criteria.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;

export default Tickets;

