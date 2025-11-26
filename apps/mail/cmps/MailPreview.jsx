
export function MailPreview({ mail }) {
    const { subject, from, } = mail

    return (
        <article className='mail-prev'>
            <h3>{from}</h3>
            <p><span>subject:</span> {subject}</p>
        </article>
    )

}