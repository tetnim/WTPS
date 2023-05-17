import { randomUserMock } from "./FE4U-Lab3-mock.js";
import { drawPage, buildTeachersList } from "./script_lab4.js";


// Завдання 1.

const getRandomUser = (callback, userCount = 50) => {
    const xhr = new XMLHttpRequest();
    const url = `https://randomuser.me/api/?results=${userCount}`;


    xhr.open("GET", url, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            callback(data.results);
        }
    };
    xhr.send();
}


// Завдання 2.

getRandomUser((param) => {
    randomUserMock.splice(0, randomUserMock.length, ...param);
    drawPage();
}, 50);


// Завдання 4.

const paginationLink = document.getElementById('pagination-link');
paginationLink.addEventListener('click', (e) => {
    e.preventDefault();
    getRandomUser((param) => {
        randomUserMock.push(...param);
        drawPage();
    }, 10)
})

