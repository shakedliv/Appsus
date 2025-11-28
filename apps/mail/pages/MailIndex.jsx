import { mailsService } from '../services/mails.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'

import {
   showSuccessMsg,
   showErrorMsg,
} from '../../../services/event-bus.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { NavBar } from '../cmps/NavBar.jsx'
import { Fragment } from 'react/jsx-runtime'

const { Link, NavLink } = ReactRouterDOM
const { useEffect, useState } = React

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [unReadCounter, setUnReadCounter] = useState(0)
    const [isShowComposeModal, setIsShowComposeModal] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const [filterBy, setFilterBy] = useState(mailsService.getDefaultFilter())
    const [folderFilter, setFolderFilter] = useState('inbox')

    useEffect(() => {
        loadMails()
    }, [])

    useEffect(() => {
        const combinedFilter = { ...filterBy, folder: folderFilter }
        mailsService.query(combinedFilter).then((loadedMails) => {
            setMails(loadedMails)
        })
    }, [filterBy, folderFilter])

    function onSendMail(composedMail) {
        mailsService
            .save(composedMail)
            .then(() => {
                console.log('success')
                loadMails()
            })
            .catch((err) => {
                console.log('err:', err)
            })
    }
    function onSaveDraft(composedMail) {
        mailsService
            .save(composedMail)
            .then(() => {
                console.log('saved as draft')
            })
            .catch((err) => {
                console.log('err:', err)
            })
    }
    function toggleIsRead(mailId) {
        mailsService.toggleIsRead(mailId)
        // not working
        // setUnReadCounter(mails.filter(mail => !mail.isRead).length)
    }

    function onToggleComposeModal() {
        setIsShowComposeModal((prevIsComposeModal) => !prevIsComposeModal)
    }

    function loadMails() {
        setIsLoading(true)
        mailsService
            .query()
            .then((loadedMails) => {
                setMails(loadedMails)
                const unread = loadedMails.filter((mail) => !mail.isRead).length
                setUnReadCounter(unread)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function onSetFilterBy(newFilter) {
        setFilterBy((filter) => ({ ...filter, ...newFilter }))
    }

    function onSetFolderFilter(filterObj) {
        setFolderFilter(filterObj.folder)
    }

    function removeMail(mailId) {
        mailsService
            .remove(mailId)
            .then(() =>
                setMails((prevMails) =>
                    prevMails.filter((mail) => mailId !== mail.id)
                )
            )
            .catch(() => {
                showErrorMsg(`couldn't remove mail`)
                //   navigate('/mail')
            })
            .finally(() => {
                showSuccessMsg('Mail has been successfully removed!')
            })
    }

    const [isMenuOpen, setISMenuOpen] = useState(false)

    function toggleMenu() {
        setISMenuOpen(!isMenuOpen)
    }

    if (isLoading || !mails) return <div className='loader'>Loading...</div>
    return (
        <div>
            <header className='mail-header'>
                <div className='btn-toggle-menu-container' onClick={toggleMenu}>
                    {' '}
                    <article className='btn-toggle-menu'>☰</article>
             </div>
             <div><img className='app-logo' src='../imgs/APPSUS-logo.jpg' /></div>
             <MailFilter filterBy={filterBy} onFilterBy={onSetFilterBy} />
              <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
            </header>
            <main className='app-container'>
                <section>
                    <NavBar
                        unReadCounter={unReadCounter}
                        isMenuOpen={isMenuOpen}
                        toggleCompose={onToggleComposeModal}
                        onFolderFilter={onSetFolderFilter}
                        isShowComposeModal={isShowComposeModal}
                    />
                </section>

                <section className='mails-index mails-container'>
                    <MailList
                        mails={mails}
                        removeMail={removeMail}
                        toggleIsRead={toggleIsRead}
                    />
                </section>
                {isShowComposeModal && (
                    <MailCompose
                        toggleCompose={onToggleComposeModal}
                        sendMail={onSendMail}
                        saveDraft={onSaveDraft}
                    />
                )}
            </main>
        </div>
    )
}
