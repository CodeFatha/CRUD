const db = require('../db/connect');
const { ObjectId } = require('mongodb');

getStudents = () => {
    const database = db.getDB();
    students = database.collection('students').find().toArray();
    return students;
  }

getStudent = (id) => {
    const database = db.getDB();
    student = database.collection('students').findOne({_id: new ObjectId(id)});
    return student;
}

deleteStudent = (id) => {
    const database = db.getDB();
    result = database.collection('students').deleteOne({_id: new ObjectId(id)});
    return result;
}

addStudent = (student) => {
    
    const database = db.getDB();
    result = database.collection('students').insertOne(student);
    return result;
}   

updateStudent = (id, student) => {
    const database = db.getDB();
    result = database.collection('students').updateOne({_id: new ObjectId(id)}, {$set: student});
    return result;
}

module.exports = { getStudents, getStudent, deleteStudent, addStudent, updateStudent };