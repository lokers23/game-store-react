import { useEffect, useState } from 'react';
import '../../../styles/Center.css';
import { useNavigate } from 'react-router-dom';
import { gameService } from '../../../services/GameService';

function Center() {
  const navigate = useNavigate();
  const [games, setGame] = useState([]);
  const fetchData = () => {
    gameService
      .getGames()
      .then((response) => setGame(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return (
    <div>
      <h1>Каталог</h1>
      {games.length > 0 &&
        games.map((game) => (
          <div key={game.id}>
            <img
              src={gameService.getAvatarUrl(game.avatarName)}
              alt={game.avatarName}
            ></img>
            <h2>{game.name}</h2>
            <p>Price: {game.price}$</p>
            <ul>{game.genre}</ul>
          </div>
        ))}
    </div>
  );
}

export default Center;
