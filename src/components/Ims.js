import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

function ImageSlider(props) {
  const itemNames = props.images; //записуємо в змінну імена картинок
  const [imageUrls, setImageUrls] = useState([]); //створюємо стейт для посилань картинок
  const [currentImage, setCurrentImage] = useState(0); //створюємо стейт "поточна картинка" для послідовного отримання посилань

  useEffect(() => {
    const fetchImage = async (imgSrc) => {//функція для отримання посилання на картинку
      try { //запит на дропбокс чи є файл
        const response = await fetch('https://api.dropboxapi.com/2/files/search_v2', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer sl.B0nvS39NNadXGUkIi3pP8WbWPO1Y9cFTUBspv7gSJMbkNtr6a1_5thLbjJLdDtwzT63FPgn4zvLf-eqZ8U8ph6PPGIGeCvxrzej8jaj43VcFV2o4XoApKIYZQdB8ENkVPscapZq7ZakwrEhYYU-5R-Q`, // Replace with your access token
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: imgSrc, //ім'я картинки
            options: {
              file_status: 'active',
              filename_only: true,
              max_results: 1,
            },
            match_field_options: {
              include_highlights: false,
            },
          }),
        });

        const data = await response.json();
        if (data.matches.length > 0) {
          const path = data.matches[0].metadata.metadata.path_display;
          //запит на дропбоксна тимчасове посилання
          const linkResponse = await fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer sl.B0nvS39NNadXGUkIi3pP8WbWPO1Y9cFTUBspv7gSJMbkNtr6a1_5thLbjJLdDtwzT63FPgn4zvLf-eqZ8U8ph6PPGIGeCvxrzej8jaj43VcFV2o4XoApKIYZQdB8ENkVPscapZq7ZakwrEhYYU-5R-Q`, // Replace with your access token
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path }),
          });
          //записуємо тимчасове посилання
          const linkData = await linkResponse.json();
          return linkData.link;
        }
      } catch (error) { //обробка помилок
        console.error('Error fetching image from Dropbox:', error);
        return null;
      }
    };

    const fetchImages = async () => {//функція для отримання посилання на ВСІ КАРТИНКИ
      try { 
        const urls = []; //створення пустого масиву для посилань на зображення
        for (let i = 0; i < itemNames.length; i++) { //створення пустого масиву для посилань на зображення
          const itemName = itemNames[i]; //у змінну itemName в циклі по черзі записуємо назви картинок
          const imageUrl = await fetchImage(itemName);  //викликаємо для назви попередню ф-ю
          if (imageUrl) { //додаємо отримане посилання у масив urls
            urls.push(imageUrl);
          }
        }
        setImageUrls(urls); //оновлюємо стейт
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();  //тут кінець юзефекта, по суті юзефект викликає лише 2 ф-ю, що використовує 1-шу
  }, [itemNames]); //він виконується тільки якщо через пропси передано імена зображень

  const nextImage = () => {
    setCurrentImage((prevImage) =>
      prevImage < imageUrls.length - 1 ? prevImage + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage > 0 ? prevImage - 1 : imageUrls.length - 1
    );
  };

  const isAtFirstImage = currentImage === 0;
  const isAtLastImage = currentImage === imageUrls.length - 1;

  return (
    <div>
      <div className="image-container-slider">
        <div className={`left-arrow ${isAtFirstImage ? 'hidden' : ''}`} onClick={prevImage}><img src='/img/arrow.png' alt="Previous"/></div>
        <div className="image-slider">
          {imageUrls.length > 0 && <img src={imageUrls[currentImage]} alt={`Image ${currentImage}`} />}
        </div>
        <div className={`right-arrow ${isAtLastImage ? 'hidden' : ''}`} onClick={nextImage}><img src='/img/arrow.png' alt="Next"/></div>
      </div>
    </div>
  );
}

export default ImageSlider;
