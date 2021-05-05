import Course from './Clases/Courses.js'
import ControlUI from './Clases/ControlUI.js';
import Students from './Clases/Estudiantes.js';
import {formCourse,formulario} from './selectores.js';


const course = new Course();
const ui = new ControlUI();
const student = new Students();

let db;
//Variables Estudiantes
let modoStudent = false;

let objStudent = {
    name:'',
    apel:'',
    email:'',
    sexo:'',
    course:'',
    NI:'',
    date:'',
};

//===========
//Variables Curso
let modoCourse = false;

const objCourse = {
    nameCourse:''
};
//===========


//Agregar un nuevo curso a la base de datos
function addCourse(e){
    e.preventDefault();
    if(e.target.nameCourse.value !== ''){
        objCourse.nameCourse = e.target.nameCourse.value.trim();

        if(!modoCourse){
            objCourse.idCourse = Date.now();
            course.addCourse({...objCourse});
            ui.message("Nuevo Curso Agregado","correcto");
            resetObjCourse();
        }else{
            course.editCourse({...objCourse});
            ui.message("Editado Correctamente");
            resetObjCourse();
            modoCourse = false;
            formCourse.querySelector('[type="submit"]').textContent = "Agregar";
        };
        ui.viewTotalCourses();
        e.target.reset();
        return;
    };
    if(!e.target.querySelector('.msg-invalid')){
        const p = document.createElement('p');
        p.textContent = 'Completa todos los campos';
        p.classList.add('px-2','text-red-800','font-black','text-center','msg-invalid','text-sm');

        e.target.insertBefore(p,e.target.firstChild);
        setTimeout(()=>{
            p.remove();
        },3000);
    };
};
function resetObjCourse(){
    for(let value in objCourse){
        objCourse[value] = '';
    };
};
//Agregar un nuevo estudiante a la base de datos
function addStudent(e){
    e.preventDefault();
    const {formName,formApel,formEmail,formTI,formCourse,formSex,formDate} = e.target;

    objStudent.name = formName.value.trim();
    objStudent.apel = formApel.value.trim();
    objStudent.email = formEmail.value.trim();
    objStudent.sexo = formSex.value;
    objStudent.course = formCourse.value;
    objStudent.NI = formTI.value.trim();
    objStudent.date = formDate.value;

    const validate = Object.entries(objStudent).some( ([k,v]) => v === '');
    if(!validate){
        if(!modoStudent){
            objStudent.course = `course-id${objStudent.course}`;
            
            objStudent.idStudent = Date.now();
            student.addStudent({...objStudent})
            ui.message("Estudiante Agregado Correctamente","correcto");
        }else{
            objStudent.course = `course-id${objStudent.course}`;

            student.editStudent({...objStudent});
            ui.message("Estudiante Editado Correctamente");

            formulario.querySelector('[type="submit"]').textContent = "Agregar";
            modoStudent = false;
        };
        ui.viewTotalCourses();
        resetObjStudent();
        formulario.reset();
        return;
    };
    if(!e.target.querySelector('.error-msg')){
        const p  = document.createElement('p');
        p.classList.add('error-msg','text-center','text-white','rounded-sm','bg-red-400','p-1','my-2','border','border-red-800');
        p.textContent = "Debes Completar todos Los campos";

        e.target.insertBefore(p,e.target.children[e.target.children.length - 1]);
        setTimeout(()=>{
            p.remove();
        },3000);
    };
};
function resetObjStudent(){
    for(let value in objStudent){
        objStudent[value] = '';
    };
};
//Funciones para los elementos HTML
function detailsCourseHtml(obj){
    const {nameCourse,idCourse} = obj;

    const details = document.createElement('details');
    details.classList.add('p-2','m-2','text-white','bg-gray-800','rounded-md','shadow-lg');

    const summary = document.createElement('summary');
    summary.classList.add('flex','items-center','justify-between','py-2','border-b-2','border-gray-500','cursor-help');

    const divLeftSummary = document.createElement('div');
    divLeftSummary.innerHTML = `<p><span class="p-1 mr-5 text-black bg-white rounded-full cursor-help">🠟</span>${nameCourse}</p>`

    const divRightSummary = document.createElement('div');
    divRightSummary.classList.add('flex','btns-course');

    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('btn','bg-red-700','text-sm','mx-1');
    btnEliminar.textContent = 'X';
    btnEliminar.onclick = () => {
        deleteCourse(obj);
    };

    const btnEditar = document.createElement('button');
    btnEditar.classList.add('btn','bg-blue-700','text-sm','mx-1');
    btnEditar.textContent = '✏️';
    btnEditar.onclick = () => {
        editCourse(obj);
    };

    const divBoxStudents = document.createElement('div');
    divBoxStudents.classList.add('p-2','mt-2','rounded-xl');
    divBoxStudents.dataset.course = `course-id${idCourse}`;

    divRightSummary.appendChild(btnEliminar);
    divRightSummary.appendChild(btnEditar);

    summary.appendChild(divLeftSummary);
    summary.appendChild(divRightSummary);

    details.appendChild(summary);
    details.appendChild(divBoxStudents);
    return details;
};
function studentHtml(obj){
    const {name,apel,email,sexo,NI,date} = obj;

    const student = document.createElement('div');
    student.classList.add('grid','content-center','grid-cols-1','sm:grid-cols-6','gap-2','my-1','p-2','bg-gray-700','rounded-md','item-student');

    const divInfo = document.createElement('div');
    divInfo.classList.add('col-span-4','left');
    divInfo.innerHTML = `
    <p class="text-center bg-gray-600 rounded-sm">${name +" "+ apel}</p>
    <p><span class="font-semibold">Email: </span>${email}</p>
    <p><span class="font-semibold">NI: </span>${NI}</p>
    <div class="flex items-center justify-between w-full">
        <p><span>Fecha Nacimiento:</span> ${date}</p>
        <p class="px-1 bg-blue-700 rounded-xl">${sexo}</p>
    </div>`;

    const divBtns = document.createElement('div');
    divBtns.classList.add('flex','items-center','justify-between','col-span-2','sm:justify-evenly','right');

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn','bg-red-600','text-xs');
    btnDelete.textContent = "Eliminar";
    btnDelete.onclick = () => {
        deleteStudent(obj);
    };

    const btnEditar = document.createElement('button');
    btnEditar.classList.add('btn','bg-blue-500','text-xs');
    btnEditar.textContent = "Editar✏️";
    btnEditar.onclick = () => {
        editStudent(obj);
    };

    divBtns.appendChild(btnDelete);
    divBtns.appendChild(btnEditar);

    student.appendChild(divInfo);
    student.appendChild(divBtns);

    return student;
};
function editStudent(obj){
    const {name,apel,email,sexo,course,NI,date,idStudent} = obj;
    
    formulario.formName.value = name;
    formulario.formApel.value = apel;
    formulario.formEmail.value = email;
    formulario.formSex.value = sexo;
    formulario.formCourse.value = course;
    formulario.formTI.value = NI;
    formulario.formDate.value = date;

    formulario.querySelector('[type="submit"]').textContent = "Guardar Edición";

    objStudent = obj;

    modoStudent = true;
};
function deleteStudent(obj){
    const confirmado = confirm("¿Estas Seguro de Eliminar Este Estudiante?");
    if(confirmado){
        student.deleteStudent(obj);
        ui.viewTotalCourses();
        ui.message("Estudiante eliminado Correctamente");
    };
};
//Delete And Edit Course from DB Courses
function editCourse(obj){
    const {idCourse,nameCourse} = obj;
    objCourse.idCourse = idCourse;

    formCourse.nameCourse.value = nameCourse;

    const aside = document.querySelector('.modalCourses');
    aside.classList.toggle('hidden');

    formCourse.querySelector('[type="submit"]').textContent = "Editar Curso";

    modoCourse = true;
};
function deleteCourse(obj){
    const validate = confirm("¿Estas Seguro de Eliminar El Curso?");
    if(validate){
        course.deleteCourse(obj);
        ui.viewTotalCourses();
        ui.message("El Curso se ha Eliminado Correctamente");
    };
};
//Open And Cose Modal
function modalCourses(e){
    const t = e.target;
    const aside = document.querySelector('.modalCourses');
    if(t.classList.contains('modalCourses') || t.classList.contains('closeModalCourse')){
        aside.classList.toggle('hidden');
    };
};
//Creando La Base de Datos Indexada
function createDB(){
    const DB = window.indexedDB.open('AppSchoolboy',1);
    DB.onerror = (error) => console.log("Error" + error);
    DB.onsuccess = () => {
        db = DB.result;
        ui.viewTotalCourses();
    };
    DB.onupgradeneeded = (e) => {
        db = e.target.result;

        const objectStore = db.createObjectStore('students',{
            keyPath:'idStudent',
            autoIncrement:true
        });
        objectStore.createIndex('name','name',{unique:false});
        objectStore.createIndex('apel','apel',{unique:false});
        objectStore.createIndex('email','email',{unique:false});
        objectStore.createIndex('sexo','sexo',{unique:false});
        objectStore.createIndex('course','course',{unique:false});
        objectStore.createIndex('NI','NI',{unique:false});
        objectStore.createIndex('date','date',{unique:false});
        objectStore.createIndex('idStudent','idStudent',{unique:true});

        const courses = db.createObjectStore('courses',{
            keyPath:'idCourse',
            autoIncrement:true
        });
        courses.createIndex('nameCourse','nameCourse',{unique:false});
        courses.createIndex('idCourse','idCourse',{unique:true});
    };
};

export {
    addStudent,createDB,modalCourses,
    addCourse,ui,db,
    detailsCourseHtml,studentHtml
};