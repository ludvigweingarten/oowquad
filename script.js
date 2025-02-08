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
        })
      .catch(error => console.error('Error loading JSON:', error));

    const plusSign = document.querySelector('.plus-sign'); // Select the container
    const aboutSection = document.querySelector('.about-section');

    plusSign.addEventListener('click', () => {
        aboutSection.classList.toggle('show');
        plusSign.classList.toggle('rotate'); // Now rotates the container
    });
});