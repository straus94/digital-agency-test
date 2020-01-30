//Api возвращае total_count (общее колличество гифок по заданному названию), offset - значение с которого 
// начинать выдачу результатов, но к сожалению реальное колличество не соответствует
//total_count, по этому по нажатию на кнопку "обновить" можно получить сообщение, типа "попробуйте еще"
// хотя запрос успешен, данные запроса выводятся так же в консоль


const APIKEY = 'O3iJIz4KNHqyrwfM88y7Abn9WA2607z0';


function createLink(offset = 0) {
    const title = document.querySelector('.block-search__text').value;
    const url = `http://api.giphy.com/v1/gifs/search?q=${title}&api_key=${APIKEY}&limit=8&offset=${offset}`;
    document.getElementById('root').innerHTML = '';
    fetch(url).then(function(result) {
        console.log(result);
        return result.json();
    }).then(function(result) {
        console.log(result);

        if (result.data.length === 0) {
            document.getElementById('root').innerHTML = 'The request is successful, but the pictures are deleted, or empty try again....';  

        } else {
            for (let item of result.data) {
                let picture = new Gif(item);
                picture.print();
            }
        }
    });
}

class Gif {
    constructor(data) {
        this.id = data.id;
        this.url = data.url;
        this.title = data.title;
        this.data = data.images;
    }

    print() {
        const domain = 'https://media.giphy.com/media/';
        const src = `${domain}${this.id}/giphy.gif`;
        const data = this.data;
        let result = `<div class="item"><div class="item__block">`;
        result += `<img class="item__img" src="${src}" alt="${this.title}">`;
        result += `<div class="item__title">${this.title}<i onclick="moreInfo(this)" class="item__icon fas fa-info"></i></div>`;
        result += `<div class="item__info"><span class="item__size">${data.original.height} x ${data.original.width}</span><a class="item__link" href="${this.url}">orginal</a></div>`;    
        result += `</div></div>`;
        document.getElementById('root').innerHTML += result;
    }
}

function moreInfo(event) {
    let elem = event.parentNode.nextSibling;

    if (elem.classList.contains('item__info--visible')) {
        elem.setAttribute('class', 'item__info');
    } else {
        elem.setAttribute('class', 'item__info item__info--visible');
    }
}

function refresh() {
    let random;
    const title = document.querySelector('.block-search__text').value;
    const url = `http://api.giphy.com/v1/gifs/search?q=${title}&api_key=${APIKEY}&limit=8`;

        fetch(url).then(function(result) {
            return result.json();
        }).then(function(result) {
            totalResults = result.pagination.total_count;
            random = getRandomInt(1, totalResults);
            createLink(random);
            isEmpty = true;
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}