import Center from './Center/Center';
import LeftMenu from './Left/LeftMenu';

function MainPage() {
  return (
    <div className='mb-5'>
      <div
        className='container-fluid d-flex mx-auto mb-3'
        style={{ maxWidth: '1000px' }}
      >
        <LeftMenu></LeftMenu>
        <Center></Center>
      </div>
    </div>
  );
}

export default MainPage;
