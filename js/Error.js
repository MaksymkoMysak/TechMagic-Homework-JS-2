export default function errorHandler(err) {
    let modal = document.getElementById('errorModal');
    let errDescription = document.getElementById('errDescription');
    errDescription.innerHTML = `${err.name}: ${err.message}`;
    modal.style.display = 'block';
}