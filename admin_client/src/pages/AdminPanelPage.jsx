// src/pages/AdminPanelPage.js
import React from 'react';
import CourseForm from '../components/CourseForm';
import InstructorList from '../components/InstructorList';

function AdminPanelPage() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <CourseForm />
      <InstructorList />
    </div>
  );
}

export default AdminPanelPage;
