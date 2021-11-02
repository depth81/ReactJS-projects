const obtenerDatos = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts');
    const post = await data.json();
    console.log(post);
}

export default  obtenerDatos;