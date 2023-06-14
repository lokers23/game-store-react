import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gameService } from '../../../services/GameService';
import '../../../styles/carousel-game.css';
import '../../../styles/min-spec.css';
import CarouselGame from './CarouselGame';
import SideBody from './SideBody';
import FooterGamePage from './FooterGamePage';
import NotFoundPage from '../../NotFoundPage';

function GamePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [game, setGame] = useState([]);

  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    gameService
      .getGameById(id)
      .then((response) => {
        setGame(response.data.data);
        setIsNotFound(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setIsNotFound(true);
        }
      });
  }, [navigate, id]);

  if (isNotFound) {
    return <NotFoundPage />;
  }

  return (
    <div className='container-fluid d-flex mb-5'>
      <div
        className='mx-auto'
        //style={{ maxWidth: '1200px', minWidth: '1200px' }}
        style={{ maxWidth: '1200px' }}
      >
        <div className=''>
          <h1 className=' bg-white '>{game.name}</h1>
        </div>
        <div className='d-flex flex-row flex-wrap row gx-0'>
          <CarouselGame game={game} />
          <SideBody game={game} />
        </div>
        <FooterGamePage game={game} />
      </div>
    </div>
  );
}

export default GamePage;
