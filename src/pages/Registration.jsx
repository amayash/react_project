import { React, useState, useEffect } from 'react'
import ContentBlock from './components/ContentBlock'

export default function Registration() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(false);
    const pattern = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

    useEffect(() => {
        setError(false)
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        if (name.length <= 0 || lastName.length <= 0 || phone.length <= 0 || !pattern.test(phone)) {
            setError(true)
            throw 'Form not submit'
        }
        console.log('Form submit')
        setError(false)
        setName('')
        setLastName('')
        setPhone('')
    }

    const Content = (
        <form onSubmit={handleSubmit} className="d-flex flex-column fs-4 fw-bold text-white text-center">
            <div>
                <label className="form-label">Имя</label>
                <input className="form-control mainInput" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Введите имя" />
            </div>
            {error && name.length <= 0 ? <label className="fs-6 text-danger">Неправильный ввод имени</label> : null}
            <div>
                <label className="form-label">Фамилия</label>
                <input className="form-control mainInput" type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Введите фамилию" />
            </div>
            {error && lastName.length <= 0 ? <label className="fs-6 text-danger">Неправильный ввод фамилии</label> : null}
            <div>
                <label className="form-label">Телефон</label>
                <input className="form-control mainInput" type="text" value={phone}
                    onChange={e => setPhone(e.target.value)} placeholder="89000000000" />
            </div>
            {error && !pattern.test(phone) ? <label className="fs-6 text-danger">Неправильный ввод номера</label> : null}
            <div>
                <button className="btn btn-success my-3" type="submit">Регистрация</button>
            </div>
        </form>
    )

    return (
        <ContentBlock valueBlock={Content} title='Регистрация' />
    )
}
