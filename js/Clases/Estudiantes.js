import {db} from '../funciones.js';

export default class Students {
    addStudent(obj){
        const transaction = db.transaction('students','readwrite');
        const objectStore = transaction.objectStore('students');

        objectStore.add(obj);
    };
    deleteStudent({idStudent}){
        const transaction = db.transaction('students','readwrite');
        const objectStore = transaction.objectStore('students');

        objectStore.delete(idStudent);
    };
    editStudent(obj){
        const transaction = db.transaction('students','readwrite');
        const objectStore = transaction.objectStore('students');

        objectStore.put(obj);
    };
};