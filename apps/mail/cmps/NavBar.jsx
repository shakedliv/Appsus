const { Link, NavLink } = ReactRouterDOM

export function NavBar({ onFolderFilter }) {

    return <nav className="nav-bar">
        <button onClick={() => onFolderFilter({ folder: 'inbox' })}>📥 Inbox</button>
        <button onClick={() => onFolderFilter({ folder: 'sent' })}>📤 Sent</button>
        <button onClick={() => onFolderFilter({ folder: 'drafts' })}>📝 Drafts</button>
    </nav>
}
