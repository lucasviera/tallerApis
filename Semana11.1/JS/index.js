async function fetchData(breedName) {
    try {
        
        const apiUrl = `https://api.thedogapi.com/v1/breeds/search?q=${breedName}`;

        // solicitud GET a la API de The Dog API
        const response = await fetch(apiUrl);

        // Verificar si la solicitud fue exitosa 
        if (response.status === 200) {
         
            const data = await response.json();

            if (data.length === 0) {
                document.getElementById('data').innerHTML = '<p>No se encontraron resultados.</p>';
            } else {
                // Mostrar los datos en la página
                const breed = data[0]; 
                document.getElementById('data').innerHTML = `
                    <h2>${breed.name}</h2>
                    <p>Origen: ${breed.origin}</p>
                    <p>Temperamento: ${breed.temperament}</p>
                    <p>Esperanza de vida: ${breed.life_span}</p>
                `;
            }
        } else {
            console.error(`Error en la solicitud: Código de estado ${response.status}`);
        }
    } catch (error) {
        console.error(`Error en la solicitud: ${error.message}`);
    }
}

// Función para buscar una raza cuando se hace clic en el botón de búsqueda
function searchBreed() {
    const breedName = document.getElementById('breed-search').value.trim();

    if (breedName !== '') {
        fetchData(breedName);
    } else {
        alert('Por favor, ingresa el nombre de una raza de perro.');
    }
}