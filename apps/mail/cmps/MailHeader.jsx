import { MailFilter } from '../cmps/MailFilter.jsx'

const { Link, NavLink } = ReactRouterDOM



export function MailHeader({ toggleMenu, onSetFilterBy, filterBy }) {
    return (
       <header className='mail-header'>
            <div className='btn-toggle-menu-container' onClick={toggleMenu}>
                {' '}
                <article className='btn-toggle-menu'>☰</article>
            </div>
            <div>
                <img className='app-logo' src='../imgs/APPSUS-logo.jpg' />
            </div>
            <MailFilter filterBy={filterBy} onFilterBy={onSetFilterBy} />
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/mail'>Mail</NavLink>
                <NavLink to='/note'>Note</NavLink>
            </nav>
        </header>
    )
}
