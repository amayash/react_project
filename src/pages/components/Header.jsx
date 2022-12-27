import { React, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function Header(props) {
    const navigate = useNavigate();
    const [searchName, setSearchName] = useState('');

    function handleSubmit(e) {
        console.info('Try to search data');
        e.preventDefault();
        navigate(`/search-same?request=${searchName}`)
        setSearchName('');
    }

    return (
        <header>
            <Navbar expand="md" className="bg-dark fw-bold fs-4">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="bg-white" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto ms-4">
                        <NavLink to={"/"}>Главная</NavLink>
                    </Nav>
                    <form onSubmit={handleSubmit} className="col d-flex align-items-center ms-2">
                        <input value={searchName} onChange={e => setSearchName(e.target.value)} className="form-control mainInput ms-2" type="text" name="text" search="true" rounded="true" required placeholder="Введите название" />
                        <button className="ms-2 btn btn-success" type="submit"><FontAwesomeIcon className="text-white" icon={faSearch} /></button>
                    </form>
                    <Nav>
                        {
                            props.links.map(route =>
                                <div key={route.path}>
                                    <NavLink className="text-decoration-none mx-3" to={route.path}>
                                        {route.label}
                                    </NavLink>
                                </div>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}
