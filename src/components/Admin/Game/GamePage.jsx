import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gameService } from '../../../services/GameService';
import '../../../styles/carousel-game.css';
import '../../../styles/min-spec.css';
import CarouselGame from './CarouselGame';
import SideBody from './SideBody';
import FooterGamePage from './FooterGamePage';

function GamePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [game, setGame] = useState([]);

  const fetchData = () => {
    gameService
      .getGameById(id)
      .then((response) => {
        setGame(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return (
    <div className='d-flex'>
      <div className=' mx-auto' style={{ maxWidth: '1200px' }}>
        <div className=''>
          <h1 className=' bg-white '>{game.name}</h1>
        </div>
        <div className='d-flex flex-row mb-3'>
          <CarouselGame game={game} />
          <SideBody game={game} />
        </div>
        <FooterGamePage game={game} />
      </div>
    </div>
  );
}

export default GamePage;
