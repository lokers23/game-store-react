import Center from './Center/Center';
import LeftMenu from './Left/LeftMenu';
//import '../../styles/MainPage.css';

function MainPage() {
  return (
    <div className='wrap'>
      <div className='mainpage'>
        <LeftMenu></LeftMenu>
        <Center></Center>
      </div>
    </div>
  );
}

export default MainPage;
