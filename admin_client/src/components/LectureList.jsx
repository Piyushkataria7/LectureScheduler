// src/components/LectureList.js

import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

function LectureList() {
  // Mock data for lectures (replace with actual data fetched from backend)
  const [lectures, setLectures] = useState([
    { id: 1, course: 'Course 1', instructor: 'Instructor A', date: '2024-06-01' },
    { id: 2, course: 'Course 2', instructor: 'Instructor B', date: '2024-06-02' },
    { id: 3, course: 'Course 3', instructor: 'Instructor C', date: '2024-06-03' },
  ]);

  // useEffect hook to fetch lectures from backend
  useEffect(() => {
    // Your logic to fetch lectures from backend API
    // Update lectures state with fetched data
  }, []); // Empty dependency array to run effect only once on component mount

  return (
    <div>
      <Typography variant="h4">Lecture List</Typography>
      <List>
        {lectures.map(lecture => (
          <ListItem key={lecture.id}>
            <ListItemText
              primary={lecture.course}
              secondary={`${lecture.instructor} - ${lecture.date}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default LectureList;
