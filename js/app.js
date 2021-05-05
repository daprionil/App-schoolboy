//Importando los selectores necesarios para el Inicio de la App
import {
    btnMenu,menu,formulario,
    btnOpenAside,modalCourse,formCourse,
} from './selectores.js';

//Importando Funciones
import {
    addStudent,createDB,
    modalCourses,addCourse
} from './funciones.js';

class App {
    constructor(){
        this.app = this.initApp();
    };
    initApp(){
        document.addEventListener('DOMContentLoaded',()=>{
            //Formulario
            formulario.addEventListener('submit',addStudent);
            //Create DB
            createDB();
            //Course Form Event
            formCourse.addEventListener('submit',addCourse);
            //Modal Courses
            modalCourse.addEventListener('click',modalCourses);
            //Btn Aside
            btnOpenAside.addEventListener('click',()=>{
                const aside = document.querySelector('.modalCourses');
                aside.classList.toggle('hidden');
            });
            //BTN Menu Responsive
            btnMenu.addEventListener('click',() => {
                menu.classList.toggle('hidden');
            });
        });
    };
};
const app = new App();