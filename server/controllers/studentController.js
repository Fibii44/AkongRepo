import Student from '../models/student.js';

const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.send(students);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching students' });
    }
};

const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.send(student);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching student' });
    }
};

const postStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        const savedStudent = await student.save();
        res.status(200).json(savedStudent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error saving student' });
    }
};

const putStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, 
            { new: true, runValidators: true } 
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student updated successfully', updatedStudent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating student', error });
    }
};


const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting student', error });
    }
};

export { getStudents, getStudent, postStudent, putStudent, deleteStudent };
