import { useEffect, useState } from 'react';
import '../../../styles/Center.css'
import { useNavigate } from 'react-router-dom';
import { gameService } from '../../../services/GameService';

function Center() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  useEffect(
    () => {
      gameService.getGames()
      .then((response) => setGames(response.data))
      .catch((error) => console.log(error.message));
    }, [navigate]);

  return (
  <div>
    <h1>Список продуктов</h1>
    <ul>
    {
      games.length > 0 && games.map((game) =>
      (
        <li key={game.id}>{ game.name }</li>
      ))
    }
    </ul>
  </div>
  );
}

export default Center;