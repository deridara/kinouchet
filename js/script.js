class Film {
    constructor(name, catNum) {
        this.name = name;
        this.category = categories[catNum];
        this.comments = [];
    }

    addComment(text, author, stars) {
        this.comments.push(new Comment(text, author, stars));
    }

    getAverageStars() {
        return this.comments.length > 0 ? this.comments.reduce((acc, e) => acc + e.stars, 0) / this.comments.length : 0;
    }
}

class Comment {
    constructor(text, author, stars) {
        this.text = text;
        this.author = author;
        this.stars = stars;
    }
}

const categories = ['Комедия', 'Драма', 'Детектив', 'Ужасы', 'Фантастика'];
const films = [];

const getFilmsByCategory = category => {
    return films.filter(film => film.category === category)
}

films.push(new Film('Один дома', 0));
films.push(new Film('Титаник', 1));
films.push(new Film('Подозрительные лица', 2));
films.push(new Film('Пила', 3));
films.push(new Film('Звездная пыль', 4));
films.push(new Film('Запределье', 4));


films[0].addComment('милый фильм', 'петр', 4)
films[0].addComment('прекрасный фильм!', 'анна', 5)

