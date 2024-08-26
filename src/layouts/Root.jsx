import { NavLink, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div>
      {/* <header
        style={{
          maxWidth: '1500px',
          margin: '10px auto',
        }}
      >
        <nav style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h1 style={{ marginRight: 'auto' }}>Task Manager</h1>
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'tasks/'}>Tasks</NavLink>
        </nav>
      </header> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
