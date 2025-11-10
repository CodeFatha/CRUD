const router = require('express').Router();
const studentsController = require('../controllers/students');
const coursesController = require('../controllers/courses');

router.get('/students', studentsController.fetchStudents);  
router.get('/students/:id', studentsController.fetchStudent);
router.post('/students/create', studentsController.addStudent);
router.put('/students/update/:id', studentsController.updateStudent);
router.delete('/students/delete/:id', studentsController.deleteStudent);
router.get('/courses', coursesController.fetchCourses);  
router.get('/student-course/:studentId', coursesController.fetchStudentCourse);  
router.get('/courses/:id', coursesController.fetchCourse);
router.post('/courses/create', coursesController.addCourse);
router.put('/courses/update/:id', coursesController.updateCourse);
router.delete('/courses/delete/:id', coursesController.deleteCourse);

router.get('/', (req, res) => {
    res.send('Welcome to the API...');
});

router.use((req,res) => {
    res.status(404).send('Route not found');
});

module.exports = router;