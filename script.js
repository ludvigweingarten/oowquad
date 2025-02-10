document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  setTimeout(() => {
      document.querySelector('.main-header').classList.add('show');
  }, 500);

  const galleryContainer = document.querySelector('.gallery-container');

  fetch('data/image_data.json')
  .then(response => response.json())
  .then(data => {
      data.images.forEach(image => {
          const imageRow = document.createElement('div');
          imageRow.classList.add('image-row');

          for (const theme in image.captions) {
              const imageItem = document.createElement('div');
              imageItem.classList.add('image-item');

              const img = document.createElement('img');
              img.src = image.url;
              img.alt = `Image - ${theme}`;
              imageItem.appendChild(img);

              const captionLines = image.captions[theme].split('\n');

              captionLines.forEach((line, index) => {
                  const caption = document.createElement('div');
                  caption.classList.add('caption');
                  if (index === 1) {
                      caption.classList.add('caption-secondary');
                  }
                  caption.textContent = line;
                  imageItem.appendChild(caption);
              });

              imageRow.appendChild(imageItem);
          }
          galleryContainer.appendChild(imageRow);
      });

      setTimeout(() => {
          document.querySelectorAll('.image-row').forEach(row => row.classList.add('show'));
      }, 1600);

      let currentRow = 0;
      const imageRows = document.querySelectorAll('.image-row');

      let touchStartX = 0, touchStartY = 0;

      galleryContainer.addEventListener('touchstart', (event) => {
          touchStartX = event.touches[0].clientX;
          touchStartY = event.touches[0].clientY;
      });

      galleryContainer.addEventListener('touchend', (event) => {
          let touchEndX = event.changedTouches[0].clientX;
          let touchEndY = event.changedTouches[0].clientY;

          let deltaX = touchEndX - touchStartX;
          let deltaY = touchEndY - touchStartY;

          if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
              // Swipe left/right inside a row
              const activeRow = imageRows[currentRow];
              const scrollAmount = activeRow.clientWidth;

              if (deltaX < 0) {
                  activeRow.scrollBy({ left: scrollAmount, behavior: 'smooth' });
              } else {
                  activeRow.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
              }
          } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
              // Swipe up/down between rows
              if (deltaY > 0) {
                  currentRow = Math.max(0, currentRow - 1);
              } else {
                  currentRow = Math.min(imageRows.length - 1, currentRow + 1);
              }
              imageRows[currentRow].scrollIntoView({ behavior: 'smooth' });
          }
      });
  })
  .catch(error => console.error('Error loading JSON:', error));

  const plusSign = document.querySelector('.plus-sign');
  const aboutSection = document.querySelector('.about-section');

  plusSign.addEventListener('click', () => {
      aboutSection.classList.toggle('show');
      plusSign.classList.toggle('rotate');
  });
});
