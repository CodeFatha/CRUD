const router = require('express').Router();
const studentsController = require('../controllers/students');
const coursesController = require('../controllers/courses');
const { isAuthenticated } = require('../validation/authenticate');
const passport = require('passport');

router.get('/students', isAuthenticated, studentsController.fetchStudents);  
router.get('/students/:id', studentsController.fetchStudent);
router.post('/students/create', isAuthenticated, studentsController.addStudent);
router.put('/students/update/:id', isAuthenticated, studentsController.updateStudent);
router.delete('/students/delete/:id', isAuthenticated, studentsController.deleteStudent);
router.get('/courses', coursesController.fetchCourses);  
router.get('/student-course/:studentId', coursesController.fetchStudentCourse);  
router.get('/courses/:id', coursesController.fetchCourse);
router.post('/courses/create', isAuthenticated, coursesController.addCourse);
router.put('/courses/update/:id', isAuthenticated, coursesController.updateCourse);
router.delete('/courses/delete/:id', isAuthenticated, coursesController.deleteCourse);
router.get('/auth/github', passport.authenticate('github',(req, res) => {}));
router.get('/auth/callback', 
    passport.authenticate('github', { failureRedirect: '/failure', session: false }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/api-docs');
    }
); 
router.get('/failure', (req, res) => {
    res.send('Authentication Failed');
}); 

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        res.send('Successfully logged out');
    });
});

router.get('/', (req, res) => {
    res.send('Welcome to the API...');
});

router.use((req,res) => {
    res.status(404).send('Route not found');
});

module.exports = router;