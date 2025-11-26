import { MailPreview } from './MailPreview.jsx'


const { Link } = ReactRouterDOM

export function MailList({ mails, onRemove }) {
    return (
        <section className='mails-list'>
            <ul>
                {mails.map(mail =>
                    <li key={mail.id}>
                        <MailPreview mail={mail} />
                        {/* <button onClick={() => onRemove(mail.id)} className='close'><i className="fa-regular fa-trash-can"></i></button> */}
                        <nav className='mail-nav'>
                            <Link to={`/mail/${mail.id}`}><button><i className="fa-solid fa-circle-info"></i>Details</button></Link>
                            {/* <Link to={`/mail/edit/${mail.id}`}><button><i className="fa-solid fa-pen-to-square"></i></button></Link> */}
                        </nav>
                    </li>
                )}
            </ul>
        </section>
    )
}