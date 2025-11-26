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
                       
                    </li>
                )}
            </ul>
        </section>
    )
}