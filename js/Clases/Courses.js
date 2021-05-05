import {db} from '../funciones.js';

export default class Course{
    addCourse(obj){
        const transaction = db.transaction('courses','readwrite');
        const objectStore = transaction.objectStore('courses');

        objectStore.add(obj);
    };
    deleteCourse({idCourse}){
        const transaction = db.transaction('courses','readwrite');
        const objectStore = transaction.objectStore('courses');

        objectStore.delete(idCourse);
    };
    editCourse(obj){
        const transaction = db.transaction('courses','readwrite');
        const objectStore = transaction.objectStore('courses');

        objectStore.put(obj);
        transaction.oncomplete = () => {
            console.log("Perfectamente Editado");
        };
    };
};