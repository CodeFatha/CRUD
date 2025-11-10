const router = require('express').Router();
const controller = require('../controllers');

router.get('/students', controller.fetchStudents);  
router.get('/students/:id', controller.fetchStudent);
router.post('/students/create', controller.addStudent);
router.put('/students/update/:id', controller.updateStudent);
router.delete('/students/delete/:id', controller.deleteStudent);

router.get('/', (req, res) => {
    res.send('Welcome to the API...');
});

router.use((req,res) => {
    res.status(404).send('Route not found');
});

module.exports = router;