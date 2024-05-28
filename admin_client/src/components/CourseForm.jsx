import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import axios from 'axios'; // Import Axios

function CourseForm() {
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/courses', formData); 
      console.log('Course added:', response.data); // Log response data
      // Reset form fields after successful submission (optional)
      setFormData({
        name: '',
        level: '',
        description: '',
        image: ''
      });
    } catch (error) {
      console.error('Error adding course:', error); // Log any errors
    }
  };

  return (
    <div>
      <Typography variant="h4">Add Course</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="level"
          label="Level"
          value={formData.level}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          margin="normal"
        />
        <TextField
          name="image"
          label="Image URL"
          value={formData.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Course
        </Button>
      </form>
    </div>
  );
}

export default CourseForm;
