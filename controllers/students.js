const model = require('../models/students');
const validation = require('../validation/students');
const { ObjectId } = require('mongodb');

exports.fetchStudents = async (req, res) => {     
    try {
        const students = await model.getStudents();
        if (!students) {
            return res.status(404).json({ message: 'No students found' });
        }
        res.status(200).json(students);        
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching students data.', error: err });
    }
}
    
exports.fetchStudent = async (req, res) => {    

    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ error: 'Invalid student ID' }); 

    try {
        const student = await model.getStudent(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the student data.', error: err });
    }
}

exports.fetchStudentForCourse = async (id) => {     

    if (!ObjectId.isValid(id))
      return res.status(400).json({ error: 'Invalid student ID' });

    try {
        const student = await model.getStudent(id);
        if (!student) {
            return null
        }
        return student;
    } catch (error) {
       return error;
    }
}

exports.deleteStudent = async (req, res) => {    
    
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ error: 'Invalid student ID' });

    try {
        const result = await model.deleteStudent(req.params.id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.send('Successfully deleted student ' + req.params.id);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the student.', error: error });
    }
}

exports.addStudent = async (req, res) => {   
    const validationError = validation.validateStudentCreate(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }
    try {
        const result = await model.addStudent(req.body);
        if (!result.acknowledged) {
            return res.status(500).json({ message: 'Failed to add student' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding the student.', error: error });
    }
}

exports.updateStudent = async (req, res) => {    
    const validationError = validation.validateStudentUpdate(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ error: 'Invalid student ID' }); 

    try {
        const result = await model.updateStudent(req.params.id, req.body);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the student.', error: error });
    }
}
