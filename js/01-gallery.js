import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector('.gallery');

function createGalleryMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
              <a class="gallery__link" href="${original}">
                <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
              </a>
            </li>`;
  }).join('');
}

galleryList.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

galleryList.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    const originalImgUrl = event.target.dataset.source;

    const instance = basicLightbox.create(`
    <img src="${originalImgUrl}" width="800" height="600">
    `);

    instance.show();

    document.addEventListener('keydown', onDocumentKeyDown);

    function onDocumentKeyDown(event) {
      if (event.code === 'Escape' && instance.visible()) {
        instance.close();
        document.removeEventListener('keydown', onDocumentKeyDown);
      }
    }
};