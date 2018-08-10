const openedFilms = {};

document.addEventListener('DOMContentLoaded', function () {
    for (let cat of categories) {
        const newCat = document.createElement('div');
        newCat.innerText = cat;
        newCat.addEventListener('click', function () {
            onCategoryChoice(cat);
        });
        document.querySelector('.categories').appendChild(newCat);
    }
});

function onCategoryChoice(categoryName) {
    document.querySelector('.films').innerHTML = '';
    const films = getFilmsByCategory(categoryName);

    for (let film of films) {
        renderFilm(film);
    }
}

function renderFilm(film) {
    const newEl = document.createElement('div');
    newEl.classList.add('film');
    newEl.innerHTML = `<div class="film-name">${film.name}</div>`;

    newEl.addEventListener('click', function () {
        onFilmClick(film, newEl);
    })

    document.querySelector('.films').appendChild(newEl);
}

function openFilmCard(film, newEl) {
    const comments = getFilmComments(film.name);
    let s = "";
    comments.forEach(c => s += `<div class="comment"> <span>${c.author}: </span>${c.text}</div>`)
    newEl.innerHTML += `<div class="film-content">${s}</div>`;

    const addCommentBtn = document.createElement('button');
    addCommentBtn.innerText = 'Добавить отзыв';
    addCommentBtn.classList.add('comment-button');
    addCommentBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        const commentForm = renderCommentForm(film);
        newEl.appendChild(commentForm);
        newEl.removeChild(addCommentBtn);

    });

    newEl.appendChild(addCommentBtn);
    openedFilms[film.name] = true;
}

function onFilmClick(film, newEl) {
    if (openedFilms.hasOwnProperty(film.name) && openedFilms[film.name] === true) {
        newEl.innerHTML = `<div class="film-name">${film.name}</div>`;
        openedFilms[film.name] = false;
    } else {
        openFilmCard(film, newEl)
    }
}

function getFilmByName(name) {
    return films.filter(f => f.name === name)[0];
}

function getFilmComments(filmName) {
    const film = getFilmByName(filmName)
    return film.comments;
}

function onAddComment(name) {
    console.log('hi');
    const film = getFilmByName(name);
    const authorValue = document.getElementById('author-' + name).value;
    const commentValue = document.getElementById('comment-' + name).value;
    film.addComment(commentValue, authorValue, 0);
    console.log(authorValue, commentValue);
}

function renderCommentForm(film) {
    const content = `<div class="form-title">Ваш отзыв на фильм "${film.name}"</div><div class="form-body"><input class="form-autor" id="author-${film.name}" placeholder="Ваше имя"><input class="form-comment" id="comment-${film.name}" placeholder="Отзыв"></div>`;


    const form = document.createElement('form');
    form.classList.add('comment-form');
    form.innerHTML = content;

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Отправить';
    submitButton.addEventListener('click', function (event) {
        onAddComment(film.name);
        event.stopImmediatePropagation();
    });
    form.appendChild(submitButton);

    form.addEventListener('mouseenter', function () {
        form.classList.add('chosen');
    });

    form.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    return form;
}
