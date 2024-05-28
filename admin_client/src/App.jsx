import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import AdminPanel from './components/AdminPanel';
import InstructorList from './components/InstructorList';
import CourseForm from './components/CourseForm';
import LectureForm from './components/LectureForm';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/admin/instructors" element={<InstructorList />} />
          <Route path="/admin/courses/:courseId/lectures" element={<LectureForm />} />
          <Route path="/admin/courses" element={<CourseForm />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
