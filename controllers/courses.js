const model = require('../models/courses');
const studentsController = require('./students');
const validation = require('../validation/courses');
const { ObjectId } = require('mongodb');

exports.fetchStudentCourse = async (req, res) => { 
    /* 
     #swagger.tags = ['Courses']
     #swagger.description = 'Get a course for a student'
    */ 
    try {
        student = await studentsController.fetchStudentForCourse(req.params.studentId);
        const course = await model.getStudentCourse(student.course_id);    
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the course data.', error: error });
    }
}

exports.fetchCourses = async (req, res) => {   
    /* 
     #swagger.tags = ['Courses']
     #swagger.description = 'Get all courses'
    */
    try {
        const courses = await model.getCourses();
        if (!courses) {
            return res.status(404).json({ message: 'No courses found' });
        }
        res.status(200).json(courses);        
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching courses data.', error: error });
    }
}

exports.fetchCourse = async (req, res) => {     
    /* 
     #swagger.tags = ['Courses']
     #swagger.description = 'Get a course by ID'
    */
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ error: 'Invalid course ID' });

    try {
        const course = await model.getCourse(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);        
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching course data.', error: error });
    }
}

exports.addCourse = async (req, res) => {     
    /*
        #swagger.tags = ['Courses']
        #swagger.description = 'Create a new course'

        #swagger.parameters['course'] = {
            in: 'body',
            description: 'Course to add',
            required: true,
            schema: {
                'code': 101,
                name: 'Keyboard',
                'description': 'Learn to type on a keyboard',
                'credits': 3,
                'level': 'Beginner'
            }
        }

        #swagger.responses[201] = {
            description: 'Course created successfully'
        }
    */
    const validationError = validation.validateCourseCreate(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }
    try {
        const result = await model.addCourse(req.body); 
        if (!result.acknowledged) {
            return res.status(500).json({ message: 'Failed to add course' });
        }
        res.status(201).json({ message: 'Course added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding the course.', error: error });
    }
}

exports.updateCourse = async (req, res) => {  
    /*
        #swagger.tags = ['Courses']
        #swagger.description = 'Update an existing course'

        #swagger.parameters['course'] = {
            in: 'body',
            description: 'Course to add',
            required: true,
            schema: {
                'code': 101,
                name: 'Keyboard',
                'description': 'Learn to type on a keyboard',
                'credits': 3,
                'level': 'Beginner'
            }
        }

        #swagger.responses[201] = {
            description: 'Course updated successfully'
        }
    */
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ error: 'Invalid course ID' });  

    const validationError = validation.validateCourseUpdate(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }   

    try {
        const result = await model.updateCourse(req.params.id, req.body);   
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the course.', error: error });
    }
}

exports.deleteCourse = async (req, res) => {     
    /* 
     #swagger.tags = ['Courses']
     #swagger.description = 'Delete an existing course'
    */
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ error: 'Invalid course ID' });

    try {
        const result = await model.deleteCourse(req.params.id); 
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the course.', error: error });
    }
}

