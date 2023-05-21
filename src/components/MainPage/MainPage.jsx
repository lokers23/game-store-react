import Center from './Center/Center';
import LeftMenu from './Left/LeftMenu';
//import '../../styles/MainPage.css';

function MainPage() {
  return (
    <div className='wrap'>
      <div
        className='container-fluid d-flex mx-auto'
        style={{ maxWidth: '1000px' }}
      >
        <LeftMenu></LeftMenu>
        <Center></Center>
      </div>
    </div>
  );
}

export default MainPage;
