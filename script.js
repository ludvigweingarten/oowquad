document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
  
    setTimeout(() => {
      document.querySelector('.main-header').classList.add('show');
    }, 500);
  
    const galleryContainer = document.querySelector('.gallery-container');
  
    fetch('data/image_data.json')
    .then(response => response.json())
    .then(data => {
        data.rows.forEach(row => {
          const imageRow = document.createElement('div');
          imageRow.classList.add('image-row');
  
          row.images.forEach(item => {
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');
  
            const mediaElement = document.createElement(item.type === 'video'? 'video': 'img');
            mediaElement.src = item.url;
            mediaElement.alt = `Media - ${item.caption.theme}`;
  
            if (item.type === 'video') {
              mediaElement.autoplay = true;
              mediaElement.controls = false;
              mediaElement.loop = true;
              mediaElement.muted = true;
            }
  
            imageItem.appendChild(mediaElement);
  
            const caption = document.createElement('div');
            caption.classList.add('caption');
            caption.textContent = item.caption.text;
            imageItem.appendChild(caption);
  
            imageRow.appendChild(imageItem);
          });
  
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
  
    // SVG Control
    const svgContainer = document.querySelector('.svg-container');
    // Get the gallery container
  
    function showSvg() {
      svgContainer.classList.add('show');
    }
  
    function hideSvg() {
      svgContainer.classList.remove('show');
    }
  
    showSvg(); // Show the SVG initially
  
    let inactivityTimer;
    function resetTimer() {
      clearTimeout(inactivityTimer);
      hideSvg(); // Hide immediately on interaction
      inactivityTimer = setTimeout(showSvg, 4000); // 3 seconds
    }
  
    // Reset the timer on user interaction
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);
    galleryContainer.addEventListener('scroll', resetTimer); // Add scroll listener to gallery container
  });