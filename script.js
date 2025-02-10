document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
  
    setTimeout(() => {
      document.querySelector('.main-header').classList.add('show');
    }, 500);
  
    const galleryContainer = document.querySelector('.gallery-container');
  
    fetch('data/image_data.json')
    .then(response => response.json())
    .then(data => {
        data.images.forEach(item => { // Use 'item' instead of 'image'
          const imageRow = document.createElement('div');
          imageRow.classList.add('image-row');
  
          for (const theme in item.captions) {
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');
  
            // Determine whether to create an image or video element
            const mediaElement = document.createElement(item.type === 'video'? 'video': 'img'); 
            mediaElement.src = item.url;
            mediaElement.alt = `Media - ${theme}`; 
  
            // Add video attributes if it's a video
            if (item.type === 'video') {
              mediaElement.autoplay = true;
              mediaElement.controls = false;
              mediaElement.loop = true;
              mediaElement.muted = true;
            }
  
            imageItem.appendChild(mediaElement);
  
            const captionLines = item.captions[theme].split('\n');
  
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
  
        window.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowUp') {
            currentRow = Math.max(0, currentRow - 1);
          } else if (event.key === 'ArrowDown') {
            currentRow = Math.min(imageRows.length - 1, currentRow + 1);
          }
  
          imageRows[currentRow].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
            scrollMode: 'always'
          });
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