import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('/api/events').then((res) => setEvents(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newEvent = {
      title,
      date,
      location,
      description,
    };
  
    axios.post('/api/events', newEvent)
      .then(() => {
        setTitle('');
        setDate('');
        setLocation('');
        setDescription('');
        axios.get('/api/events')
          .then((res) => setEvents(res.data));
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  return (
    <div className="App">
      <h1>Event Planning App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Event</button>
      </form>

      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Description: {event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;