import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    
    fetch('http://traineeapp.azurewebsites.net/api/trainings')
      .then(response => response.json())
      .then(data => {
        const formattedTrainings = data.content.map(training => ({
          title: training.activity,
          start: new Date(training.date),
          end: moment(new Date(training.date)).add(training.duration, 'minutes').toDate()
        }));
        setTrainings(formattedTrainings);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Calendar
      localizer={localizer}
      events={trainings}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  );
};

export default MyCalendar;
