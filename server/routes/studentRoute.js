import express from 'express';
import { getStudents, getStudent, postStudent, putStudent, deleteStudent } from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getStudents);   

router.get('/:id', getStudent);  

router.post('/', postStudent); 

router.put('/:id', putStudent); 
     
router.delete('/:id', deleteStudent); 

export default router;
