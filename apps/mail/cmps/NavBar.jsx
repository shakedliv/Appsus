const { Link, NavLink } = ReactRouterDOM
const {useState} = React

export function NavBar({ onFolderFilter ,toggleCompose, isMenuOpen, unReadCounter}) {

   return <aside className={`nav-bar ${isMenuOpen? 'open' : 'close'} `}>
      <article onClick={toggleCompose} className='compose-mail-btn'>
                ✏️ {isMenuOpen ? 'Compose' : ''}
            </article>
        <article onClick={() => onFolderFilter({ folder: 'inbox' })}>📥 {isMenuOpen ? ('Inbox   ' + unReadCounter): '' }</article>
        <article onClick={() => onFolderFilter({ folder: 'sent' })}>📤 {isMenuOpen ? 'Sent' : ''}</article>
        <article onClick={() => onFolderFilter({ folder: 'drafts' })}>📝 {isMenuOpen ? 'Drafts' : ''}</article>
        <article onClick={() => onFolderFilter({ folder: 'unread' })}>✉️ {isMenuOpen ? 'Unread' : ''}</article>
    </aside>
}
