import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <h1>Welcome</h1>
        <p>This is Creator Connect. Premium place for creators.</p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1rem 0' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button variant="primary" isLoading={true}>Loading...</Button>
        </div>

        <div className="card-grid">
          <div className="info-card">
            <h3>Open for all</h3>
            <p>Conect</p>
          </div>
          <div className="info-card">
            <h3>ABC</h3>
            <p>XYZ</p>
          </div>
          <div className="info-card">
            <h3>HJJ</h3>
            <p>HJKJK</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
