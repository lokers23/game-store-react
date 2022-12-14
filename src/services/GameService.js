import axios from "axios";
import { URL } from '../Constants'

export class gameService{
    constructor(headers){
        headers = { 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        }
    }
    

    static getGames(){
        return axios.get(URL.GAME, this.headers);
    }

    static deleteGame(){

    }

    static getGameById(id){

    }

    static saveGmae(id){

    }
}
