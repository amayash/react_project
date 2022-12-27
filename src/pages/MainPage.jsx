import { React, useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Item from './components/Item'
import ContentBlock from './components/ContentBlock'
import Modal from './components/Modal'
import Banner from './components/Banner'
import '../styles/banner.css'
import ItemLine from './models/ItemLine'
import Service from './services/Service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from "@fortawesome/free-solid-svg-icons"

export default function Items() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [modalTable, setModalTable] = useState(false);
    // для инпутов
    const [itemName, setItemName] = useState('');
    const [itemCount, setItemCount] = useState(1);

    const [edit, setEdit] = useState(false);
    // хук для запоминания индекса элемента, вызвавшего модальное окно
    const [currEditItem, setCurrEditItem] = useState(0);

    // элементы, типы
    useEffect(() => {
        Service.readAll('lines')
            .then(data => setItems(data));
    }, []);

    function handleDeleteItem(id) {
        console.info('Try to remove item');
        Service.delete(`lines/${id}`)
            .then(() => {
                setItems(items.filter(elem => elem.id !== id))
                console.log("Removed")
            });
    };
    function handleEditItem(id) {
        console.info(`Start edit script`);
        setEdit(true)
        Service.read(`lines/${id}`)
            .then(function (data) {
                setItemName(data.name);
                setItemCount(data.count);
                setCurrEditItem(data.id);
                setModalTable(true)
                console.info('End edit script');
            })
    };
    // принимаем событие от кнопки "добавить" или "изменить"
    const handleSubmit = (e, id) => {
        e.preventDefault(); // страница перестает перезагружаться
        const itemObject = new ItemLine(itemName, itemCount, id);
        console.log(itemObject)
        if (!edit) {
            console.info('Try to add item');

            Service.create('lines', itemObject)
                .then((data) => {
                    setItems([...items, data]);
                    setItemName('');
                    setItemCount(0);
                    console.info('Added');
                    setModalTable(false)
                })
                .catch(function (error) {
                    console.error('Error:', error);
                    throw "Can't add item";
                });
        } else {
            // принимаем событие от кнопки "сохранить изменения"
            console.info('Start synchronize edit');
            Service.update("lines/" + id, itemObject)
                .then((data1) => {
                    setItems(
                        items.map(item =>
                            item.id === id ? {
                                ...item,
                                name: data1.name,
                                count: data1.count
                            } : item)
                    )
                    console.info('End synchronize edit');
                    setModalTable(false)
                })
        }
    };
    function handleAddItemToWillSee(item) {
        console.info('Try to plus item in will see');
        // const element = { "id": item.id, "linesId": item.id, "count": 1 };
        // Service.create('willSee/', element)
        //     .catch((error) => {
        //         Service.read('willSee/' + item.id)
        //             .then((data) => {
        //                 data.count += 1;
        //                 Service.update('willSee/' + item.id, data);
        //                 console.info('Done');
        //             })
        //     })
    }
    function clearModalAndOpen() {
        if (!edit) {
            setItemName('');
            setItemCount(0);
        }
        setModalTable(true)
    }

    // const [ot, setOt] = useState(1);
    // const [doo, setDoo] = useState(1);

    // function validNum(elem) {
    //     const query = new URLSearchParams(window.location.search);
    //     const min = query.get('min');
    //     const max = query.get('max');
    //     const price = elem.price - (elem.price * elem.sale) / 100;
    //     return price >= min && price <= max;
    // }

    // function periodSubmit(e) {
    //     console.info('Try to search data');
    //     e.preventDefault();
    //     navigate(`/mainPage?min=${ot}&max=${doo}`)
    //     console.log('searching')
        
    //     Service.readAll('lines')
    //         .then(data => {
    //             setItems(data.filter(validNum))
    //         })
    // }

    const modalAddButton = <button className="btn btn-success my-2 me-3" onClick={() => { setEdit(false); clearModalAndOpen(); }}><FontAwesomeIcon className="text-white" icon={faAdd} /></button>;
    const Content = (
        <>
            {/* <form className="container" id="frm-items" onSubmit={(e) => periodSubmit(e)}>
                <div className="row">
                    <label className="form-label" htmlFor="itemPrice">от</label>
                    <input required className="form-control" type="number" value={ot} onChange={e => setOt(e.target.value)} min="1" step="0.01" placeholder="Введите цену" />
                </div>
                <div className="row">
                    <label className="form-label" htmlFor="itemPrice">до</label>
                    <input required className="form-control" name="itemPrice" id="itemPrice" type="number" value={doo} onChange={e => setDoo(e.target.value)} min="1" step="0.01" placeholder="Введите цену" />
                </div>
                <div className="text-center">
                    <button className="btn btn-success fw-bold mx-1" type="submit">Отобразить</button>
                    <button className="btn btn-danger fw-bold mx-1" onClick={() => {
                        Service.readAll('lines')
                            .then(data => setItems(data));
                    }} type="button">Сбросить</button>
                </div>
            </form> */}
            <Modal visible={modalTable}>
                <form className="row g-3 fs-4 fw-bold text-white" id="frm-items" onSubmit={(e) => handleSubmit(e, currEditItem)}>
                    <div className="row">
                        <label className="form-label" htmlFor="itemName">Название</label>
                        <input required className="form-control" name="itemName" id="itemName" type="text" value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Введите название" />
                    </div>
                    <div className="row">
                        <label className="form-label" htmlFor="itemPrice">Количество</label>
                        <input required className="form-control" name="itemPrice" id="itemPrice" type="number" value={itemCount} onChange={e => setItemCount(e.target.value)} min="1" step="0.01" placeholder="Введите цену" />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-success fw-bold mx-1" type="submit">{edit ? 'Сохранить изменения' : 'Добавить'}</button>
                        <button className="btn btn-danger fw-bold mx-1" type="button" data-bs-dismiss="modal" onClick={() => { setEdit(false); setModalTable(false) }}>Отмена</button>
                    </div>
                </form>
            </Modal>
            {items.map((item) =>
                <Item
                    item={item}
                    key={item.id}
                    removeFunc={handleDeleteItem}
                    editFunc={handleEditItem}
                    addItemToWillSee={handleAddItemToWillSee}
                    openItemPageFunc={(index) => navigate(`/mainPage/${index}`)}
                />
            )}
        </>
    );

    return (
        <div>
            {/* <Banner /> */}
            <ContentBlock className="d-flex justify-content-start flex-wrap" valueBlock={Content} contentDop={modalAddButton} title='Товары' />
        </div>
    )
}
