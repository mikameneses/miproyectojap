function renderStars(score) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="bi ${i <= score ? 'bi-star-fill' : 'bi-star'}"></i>`;
  }
  return stars;
}

document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll(".star");

  // Evento para pintar/despintar estrellas
  stars.forEach(function (star, index) {
    star.addEventListener("click", function () {
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add("checked");
      }
      for (let i = index + 1; i < stars.length; i++) {
        stars[i].classList.remove("checked");
      }
    });
  });

  // Manejo del envío del formulario de calificación
  document.getElementById('ratingForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const commentInput = document.getElementById('comment-rating');
    const commentText = commentInput.value;
    const selectedStars = document.querySelectorAll('.star.checked').length;

    if (commentText && selectedStars) {
      const newComment = document.createElement('div');
      newComment.classList.add('comment');

      const starsHtml = renderStars(selectedStars);

      newComment.innerHTML = `
        <p><strong>Usuario:</strong> Anónimo</p>
        <p><strong>Calificación:</strong> ${starsHtml}</p>
        <p><strong>Comentario:</strong> ${commentText}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
      `;

      document.getElementById('comments-container').appendChild(newComment);

      commentInput.value = '';
      stars.forEach(star => star.classList.remove('checked'));
    }
  });
});

