import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth/login" element={<AdminLogin />} />
                    <Route path="/auth/signup" element={<AdminSignup />} />
                    <Route path="/courses" element={<ManageCourses />} />
                    <Route path="/admin/course/:id" element={<CourseDetail />} />
                    <Route path="/instructors" element={<Instructors />} />
                </Routes>
            </div>
        </Router>
    );
}

function LandingPage() {
    return (
        <div>
            <h2>Welcome to the Lecture Scheduling System</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/auth/login">Admin Login</Link>
                    </li>
                    <li>
                        <Link to="/auth/signup">Admin Signup</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/courses');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Admin Login</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}

function AdminSignup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/auth/register`, { username, password });
            navigate('/auth/login');
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <h2>Admin Signup</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Signup</button>
        </form>
    );
}

function ManageCourses() {
    const [courses, setCourses] = useState([]);
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Token:', token); 
                const response = await axios.get(`${apiUrl}/courses`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Courses response:', response.data);
                setCourses(response.data.courses);
            } catch (error) {
                console.error('Fetching courses failed', error);
            }
        };
        fetchCourses();
    }, []);

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${apiUrl}/courses`,
                { name, level, description, image },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCourses([...courses, response.data.course]);
            setName('');
            setLevel('');
            setDescription('');
            setImage('');
            window.location.reload();
        } catch (error) {
            console.error('Adding course failed', error);
        }
    };

    const redirectToInstructors = () => {
        navigate('/instructors');
    };
    return (
        <div>
            <h2>Manage Courses</h2>
            <form onSubmit={handleAddCourse}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Course Name" required />
                <input type="text" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Level" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required />
                <button type="submit">Add Course</button>
            </form>
            <button onClick={redirectToInstructors}>View Instructors</button>
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        <Link to={`/admin/course/${course._id}`}>{course.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}


function Instructors() {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${apiUrl}/instructors`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setInstructors(response.data);
            } catch (error) {
                console.error('Fetching instructors failed', error);
            }
        };

        fetchInstructors();
    }, []);

    if (instructors.length === 0) {
        return <div>No instructors available.</div>;
    }

    return (
        <div>
            <h2>Instructors</h2>
            <ul>
                {instructors.map(instructor => (
                    <li key={instructor.id}>{instructor.name}</li>
                ))}
            </ul>
        </div>
    );
}


function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${apiUrl}/courses/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCourse(response.data.course);
            } catch (error) {
                console.error('Fetching course details failed', error);
            }
        };

        fetchCourseDetails();
    }, [id]);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{course.name}</h2>
            <p><strong>Level:</strong> {course.level}</p>
            <p><strong>Description:</strong> {course.description}</p>
            {course.image && <img src={course.image} alt={course.name} />}
        </div>
    );
}


export default App;
