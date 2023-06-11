import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AxiosInterceptor() {
  let navigate = useNavigate();
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        navigate('/login');
      } else if (error.response.status === 403) {
        navigate('/forbidden');
      }
      // } else if (error.response.status === 404) {
      //   navigate('/notfound');
      // }

      return Promise.reject(error);
    }
  );
}

export default AxiosInterceptor;
