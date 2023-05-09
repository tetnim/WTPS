import { formatObject, findObject, filterArr, sortArray, findTeachers } from "./script.js";


// Завдання 1

const buildTeachersList = (teachersList, section) => {
    const tInicial = (inicial) => {
        let str = '';
        const fCh = str.concat(inicial[0]);
        const sCh = inicial[inicial.indexOf(' ') + 1];
        str = str.concat(fCh, '.', sCh);
        return str;
    }

    section.innerHTML = '';

    teachersList.forEach(obj => {
        const tAvatar = (obj.picture_large !== undefined) ? (
            `<img src="${obj.picture_large}" alt="IT">`
        ) : (
            `<h1 class="t-inicial">${tInicial(obj.full_name)}</h1>`
        );

        const HTMLString = `
        <div class="t-card">
            <div class="t-avatar">
                ${tAvatar}
            </div>
            <h1 class="t-name">${obj.full_name}</h1>
            <p class="t-subject">${obj.course}</p>
            <p class="t-region">${obj.country}</p>
        </div>`;
        section.insertAdjacentHTML('beforeend', HTMLString);
    });
};

const teachersContainer = document.getElementById('teachers-container');
const allTeacher = formatObject();
buildTeachersList(allTeacher, teachersContainer);

const favoriteTeacherContainer = document.getElementById('favorite-teachers-container');
const favoriteTeacher = findObject(formatObject(), 'favorite', true);
buildTeachersList(favoriteTeacher, favoriteTeacherContainer);


// Завдання 2

const form = document.querySelector('form');
form.addEventListener('change', (event) => {
    const age = {};
    age.min = document.getElementById('age').value * 18;
    age.max = age.min + 18;

    const country = document.getElementById('country').value;
    const gender = document.getElementById('gender').value;
    const favorite = document.getElementById('only-favorits').checked;

    const filterTeacher = filterArr(formatObject(), country, age, gender, favorite);
    const teachersContainer = document.getElementById('teachers-container');
    buildTeachersList(filterTeacher, teachersContainer);
});


// Завдання 3

const buildStaticTable = (teachersList, section) => {
    section.innerHTML = '';

    teachersList.forEach(obj => {
        const HTMLString = `
        <tr>
                    <td>${obj.full_name}</td>
                    <td>${obj.course}</td>
                    <td>${obj.age}</td>
                    <td>${obj.gender}</td>
                    <td>${obj.country}</td>
                </tr>
        `;
        section.insertAdjacentHTML('beforeend', HTMLString);
    });
}

const staticContainer = document.querySelector('#stat-table tbody');
const staticTeacher = sortArray(formatObject(), 'full_name');
buildStaticTable(staticTeacher, staticContainer);


// Завдання 4
const searchLink = document.getElementById('searchLink');

searchLink.addEventListener('click', () => {
    const nnOrAgeSearch = document.getElementById('nnOrAgeSearch');
    const val = nnOrAgeSearch.value;
    if (val) {
        nnOrAgeSearch.value = ''
        const findTeacher = findTeachers(formatObject(), val);
        console.log(findTeacher);
        const teachersContainer = document.getElementById('teachers-container');
        buildTeachersList(findTeacher, teachersContainer);
    }
});

const sortStaticHeader = document.getElementById('sortStaticHeader');
sortStaticHeader.addEventListener('click', (event) => {
    const staticContainer = document.querySelector('#stat-table tbody');
    const staticTeacher = sortArray(formatObject(), event.target.dataset.sort);
    buildStaticTable(staticTeacher, staticContainer);
});


// Завдання 5

const addTeacher = document.querySelector('#add-teacher-form');

addTeacher.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('ogh');
    const formData = new FormData(addTeacher);

    fetch('http://localhost:3000/teachers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
});



// побудова списка країн для select

(() => {
    const arr = [];
    formatObject().forEach(el => {
        arr.push(el.country);
    });

    const unique = (arr) => {
        let result = [];
        for (let str of arr) {
            if (!result.includes(str) && str != undefined) {
                result.push(str);
            }
        }
        return result;
    }

    const country = document.getElementById('country');;
    unique(arr).forEach(el => {
        country.insertAdjacentHTML('beforeend', `<option value="${el}">${el}</option>`)
    });
})();
