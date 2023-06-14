import { useEffect, useState } from 'react';
import { gameService } from '../../../services/GameService';
import { imageService } from '../../../services/ImageService';
import { useLogin } from '../../../contexts/LoginContext';
import { ROLES } from '../../../Constants';
import '../../../styles/game-page.css';

function CarouselGame({ game }) {
  const { role } = useLogin();
  const formData = new FormData();

  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [isChangedImages, setIsChangedImages] = useState(false);

  useEffect(() => {
    imageService
      .getImages(game.id)
      .then((response) => {
        setImages(response.data.data);
      })
      .catch((error) => error.message);
  }, [game, isChangedImages]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const deleteImage = (event, id) => {
    imageService
      .deleteImage(id)
      .then(() => {
        const carousel = document.querySelector('#carouselExampleFade');
        const items = carousel.querySelectorAll('.carousel-item');
        const activeItem = carousel.querySelector('.carousel-item.active');
        activeItem.classList.remove('active');

        items[0].classList.add('active');
        setIsChangedImages(!isChangedImages);
      })
      .catch();
  };

  function handleSubmit(event) {
    event.preventDefault();
    formData.append('image', image);

    imageService
      .createImage(game.id, formData)
      .then(() => setIsChangedImages(!isChangedImages))
      .catch((error) => error.message);
  }

  return (
    <div
      className='container-fluid carousel-game p-2 shadow border rounded col-sm me-3 mb-3'
      id='#myCarousel'
    >
      <div
        id='carouselExampleFade'
        className='carousel slide carousel-fade'
        data-bs-ride='false'
        data-bs-interval='false'
        style={{ minHeight: '200px' }}
      >
        <div
          className='carousel-inner d-flex align-items-center'
          style={{ minHeight: '200px' }}
        >
          <div className='carousel-item active'>
            <img
              className='d-block w-100'
              src={gameService.getAvatarUrl(game.avatarName)}
              alt={game.avatarName}
            ></img>
          </div>

          <iframe
            className='carousel-item'
            title={game.name}
            width='1280'
            height='720'
            src={game.videoUrl}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          />

          {images.length > 0 &&
            images.map((image) => (
              <div className='carousel-item' key={image.id}>
                <img
                  key={image.id}
                  className='d-block w-100'
                  src={imageService.getImage(game.id, image.name)}
                  alt={image.name}
                ></img>
                <div className='carousel-caption d-none d-md-block'>
                  <button
                    className='btn btn-danger'
                    onClick={(event) => deleteImage(event, image.id)}
                  >
                    <i className='bi-trash'></i>
                  </button>
                </div>
              </div>
            ))}
        </div>
        <button
          className='carousel-control-prev'
          type='button'
          data-bs-target='#carouselExampleFade'
          data-bs-slide='prev'
        >
          <span
            className='carousel-control-prev-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Previous</span>
        </button>
        <button
          className='carousel-control-next'
          type='button'
          data-bs-target='#carouselExampleFade'
          data-bs-slide='next'
        >
          <span
            className='carousel-control-next-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Next</span>
        </button>
      </div>
      {(role === ROLES[1] || role === ROLES[2]) && (
        <form onSubmit={handleSubmit}>
          <button type='submit' className='btn add-img-button btn-sm mb-1 mt-1'>
            Добавить изображение
          </button>
          <input
            type='file'
            className='form-control form-control-sm'
            onChange={handleImageChange}
          />
        </form>
      )}
    </div>
  );
}

export default CarouselGame;
