import {db,detailsCourseHtml,studentHtml} from '../funciones.js';
import {selectCourses,boxHTMLStudents} from '../selectores.js';

export default class ControlUI {
    viewTotalStudents(){
        const objectStoreStudents = db.transaction('students','readwrite').objectStore('students');
        objectStoreStudents.openCursor().onsuccess = (e) => {
            const cursorStudent = e.target.result;
            if(cursorStudent){
                const {course} = cursorStudent.value;

                const courseHtml = document.querySelector(`[data-course=${course}]`);
                if(courseHtml){
                    courseHtml.insertBefore(studentHtml(cursorStudent.value),courseHtml.firstChild);
                }else{
                    objectStoreStudents.delete(cursorStudent.value.idStudent);
                };
                cursorStudent.continue();
            };
        };
    };
    viewTotalCourses(){
        this.clearTotalCourses();
        this.viewCoursesSelect();

        const objectStoreCourses = db.transaction('courses').objectStore('courses');

        let numCourse;

        objectStoreCourses.count().onsuccess = (e) => {
            numCourse = e.target.result;
        };

        objectStoreCourses.openCursor().onsuccess = (e) => {
            if(numCourse > 0){
                const cursorCourse = e.target.result;
                if(cursorCourse){
                    boxHTMLStudents.appendChild(detailsCourseHtml(cursorCourse.value));
                    cursorCourse.continue();
                };
                return;
            };
            const textNone = document.createElement('p');
            textNone.classList.add('p-2','mx-2','rounded-xl','text-white','bg-gray-700','text-center');
            textNone.textContent = "No Hay ningún Curso, ¡Agrega Alguno!";

            boxHTMLStudents.appendChild(textNone);
        };
        setTimeout(()=>{
            this.viewTotalStudents();
        },100);
    };
    clearTotalCourses(){
        while(boxHTMLStudents.firstChild){
            boxHTMLStudents.removeChild(boxHTMLStudents.firstChild);
        };
    };
    viewCoursesSelect(){
        this.cleanSelectCourses();

        const objectStore = db.transaction('courses').objectStore('courses');

        objectStore.openCursor().onsuccess = (e) => {
            const cursor = e.target.result;
            if(cursor){
                const {nameCourse,idCourse} = cursor.value;

                const option = document.createElement('option');
                option.value = idCourse;
                option.textContent = nameCourse;

                selectCourses.appendChild(option);
                cursor.continue();
            };
        };
    };
    cleanSelectCourses(){
        while(selectCourses.children[1]){
            selectCourses.removeChild(selectCourses.children[1]);
        };
    };
    message(text,type = ''){
        const msg = document.createElement('p');
        msg.classList.add('msg','p-2','text-center','rounded-md','font-black','text-white');
        msg.textContent = text;

        if(type === 'correcto'){
            msg.classList.add('border','bg-green-400','border-green-800');
        }else{
            msg.classList.add("border",'border-blue-800','bg-blue-400');
        };

        const boxMessage = document.querySelector('#boxMessage');
        if(!boxMessage.firstChild){
            boxMessage.insertBefore(msg,boxMessage.firstChild);
            setTimeout(()=>{
                msg.remove();
            },3000)
        };
    };
};