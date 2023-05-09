import { randomUserMock, additionalUsers } from './FE4U-Lab3-mock.js';


console.log(randomUserMock);


// Завдання 1

const formatObject = (arr1, arr2) => {
    const courses = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry',
        'Law', 'Art', 'Medicine', 'Statistics'];

    const randomNumber = (max) => {
        return Math.floor(Math.random() * max + 1);
    }

    const generateRandomColor = () => {
        let color = '#';
        for (let i = 0; i < 2; i++) {
            color = color + randomNumber(255);
        }
        return color;
    }

    const generateId = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(randomNumber(charactersLength));
        }
        return result;
    }

    const normalArray = [];

    arr1.forEach(obj => {

        // Данні з обєкту random-user-mock привести до вигляду:

        const formattedUser = {
            "gender": obj.gender,
            "title": obj.name.title,
            "full_name": `${obj.name.first} ${obj.name.last}`,
            "city": obj.location.city,
            "state": obj.location.state,
            "country": obj.location.country,
            "postcode": obj.location.postcode,
            "coordinates": obj.location.coordinates,
            "timezone": obj.location.timezone,
            "email": obj.email,
            "b_date": obj.dob.date,
            "age": obj.dob.age,
            "phone": obj.phone,
            "picture_large": obj.picture.large,
            "picture_thumbnail": obj.picture.thumbnail
        };

        // До кожного з об’єктів масиву додати поля: id, favorite, course, bg_color, note

        const addField = {
            id: generateId(11),
            favorite: null,

            // Значення поля course заповнювати рандомно зі списку: 
            course: courses[randomNumber(courses.length - 1)],
            bg_color: generateRandomColor(),
            note: null
        }

        const newObject = Object.assign(formattedUser, addField);
        normalArray.push(newObject);
    });


    // По’єднати два обєкти в один, позбуваючись повторів

    arr2.forEach(element => {
        const f = normalArray.filter(o => o.full_name == element.full_name);
        if (!f.length) {
            normalArray.push(element);
        }
    });

    return normalArray;
}

const formatedArray = formatObject(randomUserMock, additionalUsers);
console.log(formatedArray);


// Завдання 2

const validateObject = (arr) => {
    // Перевірка поля full_name
    const validArray = [];
    arr.forEach((obj) => {
        if (typeof obj.full_name !== 'string' || !/^[A-Z][a-z]*\s[A-Z][a-z]*$/.test(obj.full_name)) {
            return false;
        }

        // Перевірка поля gender
        if (typeof obj.gender !== 'string' || !/^[A-Z]/.test(obj.gender)) {
            return false;
        }

        // Перевірка поля note
        if (typeof obj.note !== 'string' || !/^[A-Z]/.test(obj.note)) {
            return false;
        }

        // Перевірка поля state
        if (typeof obj.state !== 'string' || !/^[A-Z]/.test(obj.state)) {
            return false;
        }

        // Перевірка поля city
        if (typeof obj.city !== 'string' || !/^[A-Z]/.test(obj.city)) {
            return false;
        }

        // Перевірка поля country
        if (typeof obj.country !== 'string' || !/^[A-Z]/.test(obj.country)) {
            return false;
        }

        // Перевірка поля age
        if (typeof obj.age !== 'number') {
            return false;
        }

        // Перевірка поля phone
        if (typeof obj.phone !== 'string' || !/^\+\d{2}\(\d{3}\)\d{3}\d{2}\d{2}$/.test(obj.phone)) {
            return false;
        }
        // Ви можете додати код для перевірки формату номера телефону в залежності від країни.

        // Перевірка поля email
        if (typeof obj.email !== 'string' || !/\S+@\S+\.\S+/.test(obj.email)) {
            return false;
        }

        // Якщо всі перевірки були пройдені, поверніть true
        validArray.push(obj);
    });
    return validArray;
}

const validatedObj = validateObject(formatedArray);
console.log(validatedObj);


// Завдання 3

const filterArr = (arr, country, age, gender, favorite) => {
    return arr.filter(obj =>
        obj.country == country &&
        obj.age == age &&
        obj.gender == gender &&
        obj.favorite == favorite
    );
}

const filteredArr = filterArr(formatedArray, 'Germany', 65, 'male', null);
console.log(filteredArr);


// Завдання 4

const sortArray = (arr, param, order) => {
    if (!arr || !param || !order) {
        return arr;
    }

    const validParameters = ['full_name', 'age', 'b_day', 'country'];

    if (!validParameters.includes(param)) {
        return arr;
    }

    const compareFunction = (a, b) => {
        const aValue = typeof a[param] === 'string' ? a[param].toLowerCase() : a[param];
        const bValue = typeof b[param] === 'string' ? b[param].toLowerCase() : b[param];

        if (aValue < bValue) {
            return order === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
            return order === 'asc' ? 1 : -1;
        } else {
            return 0;
        }
    };

    return arr.slice().sort(compareFunction);
}

const sortedArr = sortArray(formatedArray, 'full_name', 'asc');
console.log(sortedArr);


// Завдання 5

const findObject = (arr, param, val) => {
    return arr.filter(obj => obj[param] === val);
}

const findedObj = findObject(formatedArray, 'gender', 'male');
console.log(findedObj);

// Завдання 6

const statArr = (arr, condition) => {
    const items = arr.filter(arr => condition(arr));
    return (items.length * 100 / arr.length);
}

const statistic = statArr(formatedArray, user => user.gender == 'male');
console.log(statistic);
