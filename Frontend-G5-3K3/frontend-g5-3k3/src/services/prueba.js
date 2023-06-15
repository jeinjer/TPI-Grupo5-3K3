axios.get('http:localhost:4000/api/articuloslacteos')
  .then(response => {
    if (response.data.length > 0) {
      const firstArticleId = response.data[0].id;
      console.log('ID del primer artículo:', firstArticleId);
    } else {
      console.log('No se encontraron artículos');
    }
  })
  .catch(error => {
    console.error('Error al obtener los artículos:', error);
  });