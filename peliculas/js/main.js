// Datos de las películas
const movieData = [
    {
        title: "Avatar",
        img: "images/avatar-66ca0a9027f05.avif",
        momentImg: "images/momentoavatar.svg",
        info: "Un marine parapléjico es enviado a Pandora en una misión única...",
        duration: "2h 42m",
        price: "$10",
        category: "fantasia"
    },
    {
        title: "Capitán América",
        img: "images/capitanamerica.svg",
        momentImg: "images/momentocapitanamerica.svg",
        info: "La historia de Steve Rogers que se convierte en el super soldado Capitán América...",
        duration: "2h 4m",
        price: "$8",
        category: "accion"
    },
    {
        title: "Cazafantasmas",
        img: "images/cazafantasmas.png",
        momentImg: "images/momentocazafantasmas.svg",
        info: "Un grupo de investigadores paranormales forma un negocio de exterminio de fantasmas...",
        duration: "1h 45m",
        price: "$7",
        category: "comedia"
    },
    {
        title: "Cisne Negro",
        img: "images/CISNE_NEGRO.svg",
        momentImg: "images/momentocisnenegro.svg",
        info: "Una bailarina lucha con la presión de interpretar a la Reina Cisne...",
        duration: "1h 48m",
        price: "$9",
        category: "terror"
    },
    {
        title: "Dark Knight",
        img: "images/darknight.svg",
        momentImg: "images/momentodarknight.svg",
        info: "Batman tiene que enfrentarse al Joker...",
        duration: "2h 32m",
        price: "$11",
        category: "accion"
    },
    {
        title: "Deadpool",
        img: "images/deadpool.svg",
        momentImg: "images/momentodeadpool.svg",
        info: "Un ex-militar con habilidades regenerativas busca venganza...",
        duration: "1h 48m",
        price: "$8",
        category: "comedia"
    },
    {
        title: "Luciferina",
        img: "images/luciferina.svg",
        momentImg: "images/momentoluciferina.svg",
        info: "Una joven monja descubre el oscuro secreto de su familia...",
        duration: "1h 31m",
        price: "$6",
        category: "terror"
    },
    {
        title: "Shang-Chi",
        img: "images/shang-chi.svg",
        momentImg: "images/momentoshang-chi.svg",
        info: "Shang-Chi debe enfrentar el pasado que pensó haber dejado atrás...",
        duration: "2h 12m",
        price: "$9",
        category: "accion"
    },
    {
        title: "Star Wars",
        img: "images/starwars.svg",
        momentImg: "images/momentostarwars.jpg",
        info: "La historia épica de la familia Skywalker...",
        duration: "2h 1m",
        price: "$10",
        category: "fantasia"
    }
];

// Función que muestra los detalles de la película en un prompt
function showMovieDetails(movieTitle) {
    // Buscar la película en los datos usando el título
    const movie = movieData.find(m => m.title === movieTitle);
    
    // Si la película es encontrada, mostramos un prompt con los detalles
    if (movie) {
        prompt(
            `Título: ${movie.title}\n` +
            `Descripción: ${movie.info}\n` +
            `Duración: ${movie.duration}\n` +
            `Precio: ${movie.price}`
        );
    }
}

// Agregar evento de clic a las imágenes de las tarjetas de película
document.querySelectorAll('.movie-card img').forEach(image => {
    image.addEventListener('click', () => {
        // Obtener el título de la película desde el atributo de datos del contenedor
        const movieTitle = image.closest('.movie-card').getAttribute('data-movie');
        
        // Llamar a la función para mostrar detalles de la película
        showMovieDetails(movieTitle);
    });
});

// Función de búsqueda de películas (filtrar por título)
function filterMovies(searchTerm) {
    // Seleccionar todas las tarjetas de película
    const allMovieCards = document.querySelectorAll('.movie-card');
    searchTerm = searchTerm.toLowerCase();  // Convertir término de búsqueda a minúsculas

    // Iterar a través de todas las tarjetas
    allMovieCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const shouldShow = title.includes(searchTerm);
        
        // Si hay resultados de búsqueda, se clona la tarjeta y se agrega a los resultados
        if (searchTerm.length > 0) {
            const searchResults = document.getElementById('searchResults');
            if (shouldShow) {
                const clone = card.cloneNode(true);
                searchResults.appendChild(clone);
            }
        }
        
        // Mostrar u ocultar las tarjetas dependiendo de si coinciden con el término de búsqueda
        card.style.display = shouldShow ? 'block' : 'none';
    });
}

// Event listeners para cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    // Agregar event listeners para las tarjetas de película
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.addEventListener('click', () => {
            // Obtener el título de la película desde el atributo de datos
            const movieTitle = card.getAttribute('data-movie');
            showMovieDetails(movieTitle);
        });
    });

    // Agregar evento para la barra de búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '';  // Limpiar resultados anteriores
        filterMovies(e.target.value);
    });
});
// Función para agregar las películas a su respectiva categoría
function addMoviesToCategory(category) {
    const container = document.getElementById(`${category}-carousel`);
    const moviesInCategory = movieData.filter(movie => movie.category === category);

    moviesInCategory.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.setAttribute('data-movie', movie.title);

        movieCard.innerHTML = `
            <img class="normal-img" src="${movie.img}" alt="${movie.title}">
            <img class="momento-img" src="${movie.momentImg}" alt="Momento ${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.duration} | ${movie.price}</p>
            </div>
        `;
        container.appendChild(movieCard);
    });
}

// Llamamos a la función para agregar las películas a cada categoría
document.addEventListener('DOMContentLoaded', () => {
    addMoviesToCategory('comedia');
    addMoviesToCategory('fantasia');
    addMoviesToCategory('terror');
    addMoviesToCategory('accion');
});