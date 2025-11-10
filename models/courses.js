const db = require('../db/connect');
const { ObjectId } = require('mongodb');

getCourses = () => {
    const database = db.getDB();
    courses = database.collection('courses').find().toArray();
    return courses;
}

getCourse = (id) => {
    const database = db.getDB();
    course = database.collection('courses').findOne({_id: new ObjectId(id)});
    return course;
}

getStudentCourse = (id) => {
    const database = db.getDB();
    course = database.collection('courses').findOne({_id: new ObjectId(id)});
    return course;
}

addCourse = (course) => {
    const database = db.getDB();
    result = database.collection('courses').insertOne(course);
    return result;
}

updateCourse = (id, course) => {  
    const database = db.getDB();
    result = database.collection('courses').updateOne({_id: new ObjectId(id)}, {$set: course});
    return result;
}

deleteCourse = (id) => {
    const database = db.getDB();
    result = database.collection('courses').deleteOne({_id: new ObjectId(id)});
    return result;
}

module.exports = { getCourses, getCourse, deleteCourse, addCourse, updateCourse, getStudentCourse };