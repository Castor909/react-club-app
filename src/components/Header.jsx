import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="app-header">
      <div className="container app-header__inner">
        <h1 className="app-title">Fitness Club</h1>
        <nav aria-label="Main navigation" className="app-nav">
          <NavLink className={({ isActive }) => `app-nav__link${isActive ? ' active' : ''}`} to="/">
            Home
          </NavLink>
          <NavLink className={({ isActive }) => `app-nav__link${isActive ? ' active' : ''}`} to="/coaches">
            Coaches
          </NavLink>
          <NavLink className={({ isActive }) => `app-nav__link${isActive ? ' active' : ''}`} to="/venues">
            Venues
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
