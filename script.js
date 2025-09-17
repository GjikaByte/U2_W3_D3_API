const API_URL = 'https://striveschool-api.herokuapp.com/books';

const row = document.getElementById('booksRow');

document.addEventListener('DOMContentLoaded', loadBooks);

function loadBooks() {
  return fetch(API_URL)
    .then(Response => {
      if (!Response.ok) throw new Error(`HTTP ${Response.status}`);
      return Response.json();
    })
    .then(books => {
      renderBooks(books);
    })
    .catch(err => {
      row.innerHTML = `
        <div class="col-12">
          <div class="alert alert-danger">
            Errore nel caricamento dei libri: ${escapeHtml(err.message)}
          </div>
        </div>`;
    });
}


function renderBooks(books) {
  // Build once → inject once (fast & clean)
  const html = books.map(b => `
    <div class="book-col col-12 col-sm-6 col-lg-4 col-xl-3">
      <div class="card h-100 shadow-sm">
        <img
          src="${b.img}"
          alt="${b.title}"
          class="card-img"
          style="width:100%; aspect-ratio: 3/4; object-fit:cover; display:block;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title fs-6 mb-1">${b.title}</h5>
          <p class="card-text text-muted mb-3">€ ${Number(b.price).toFixed(2)}</p>
          <button class="btn btn-outline-danger btn-sm mt-auto w-100"
                  data-action="discard" data-asin="${b.asin}">
            Scarta
          </button>
        </div>
      </div>
    </div>
  `).join('');

  row.innerHTML = html;
}

// Event delegation for “Scarta”
row.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="discard"]');
  if (!btn) return;
  btn.closest('.book-col').remove();
});