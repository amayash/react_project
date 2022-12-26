import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
    const fileReader = new FileReader()
    const [items, setItems] = useState([]);
    const [modalTable, setModalTable] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    // для выпадающих значений
    const [typeName, setTypeName] = useState([]);
    // для инпутов
    const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState('');
    const [itemPrice, setItemPrice] = useState(1);

    const [edit, setEdit] = useState(false);
    // хук для запоминания индекса элемента, вызвавшего модальное окно
    const [currEditItem, setCurrEditItem] = useState(0);

    // элементы, типы
    useEffect(() => {
        Service.readAll('lines')
            .then(data => setItems(data));
        Service.readAll('type')
            .then(data => setTypeName(data));
    }, []);
    fileReader.onloadend = () => (
        setSelectedImage(fileReader.result)
    )
    function changePicture(e) {
        e.preventDefault();
        const file = e.target.files[0]
        fileReader.readAsDataURL(file)
    }
    function handleDeleteItem(id) {
        console.info('Try to remove item');
        Service.delete(`lines/${id}`)
            .then(() => {
                setItems(items.filter(elem => elem.id !== id))
                console.log("Removed")
            });

        Service.delete(`willSee/${id}`)
            .catch((error) => '')
    };
    function handleEditItem(id) {
        console.info(`Start edit script`);
        setEdit(true)
        Service.read(`lines/${id}`)
            .then(function (data) {
                setItemName(data.name);
                setItemType(data.type);
                setItemPrice(data.price);
                setCurrEditItem(data.id);
                setModalTable(true)
                console.info('End edit script');
            })
    };
    // принимаем событие от кнопки "добавить" или "изменить"
    const handleSubmit = (e, id) => {
        e.preventDefault(); // страница перестает перезагружаться
        const itemObject = new ItemLine(selectedImage, itemName, itemType, itemPrice, id);
        if (!edit) {
            console.info('Try to add item');

            Service.create('lines', itemObject)
                .then((data) => {
                    setItems([...items, data]);
                    setItemName('');
                    setItemType('');
                    setItemPrice(1);
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
                    Service.read('willSee/' + id)
                        .then((data2) => {
                            data1.count = data2.count;
                            Service.update("willSee/" + id, data1)
                                .catch((error) => '')
                            setItems(
                                items.map(item =>
                                    item.id === id ? {
                                        ...item,
                                        image: data1.image,
                                        name: data1.name,
                                        type: data1.type,
                                        price: data1.price
                                    } : item)
                            )
                            console.info('End synchronize edit');
                            setModalTable(false)
                        })
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };
    function handleAddItemToWillSee(item) {
        console.info('Try to plus item in will see');
        item.count = 1;
        Service.create('willSee/', item)
            .catch((error) => {
                Service.read('willSee/' + item.id)
                    .then((data) => {
                        data.count += 1;
                        Service.update('willSee/' + item.id, data);
                        console.info('Done');
                    })
            })
    }
    function clearModalAndOpen() {
        if (!edit) {
            setItemName('');
            setItemType('');
            setItemPrice(1);
        }
        setModalTable(true)
    }

    const modalAddButton = <button className="btn btn-success my-2 me-3" onClick={() => { setEdit(false); clearModalAndOpen(); }}><FontAwesomeIcon className="text-white" icon={faAdd} /></button>;
    const Content = (
        <>
            <Modal visible={modalTable}>
                <form className="row g-3 fs-4 fw-bold text-white" id="frm-items" onSubmit={(e) => handleSubmit(e, currEditItem)}>
                    <div className="row">
                        <label className="form-label" htmlFor="itemPicture">Изображение</label>
                        <input required className="form-control" name="itemPicture" id="itemPicture"
                            type="file"
                            onChange={changePicture} />
                    </div>
                    <div className="row">
                        <label className="form-label" htmlFor="itemName">Название</label>
                        <input required className="form-control" name="itemName" id="itemName" type="text" value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Введите название" />
                    </div>
                    <div className="row">
                        <label className="form-label" htmlFor="itemType">Тип товара</label>
                        <select required className="form-select" name="itemType" id="itemType" value={itemType} onChange={e => setItemType(e.target.value)} >
                            <option value='' defaultValue disabled>Выберите значение</option>
                            {typeName.map(country =>
                                <option key={country}>{country}</option>
                            )}
                        </select>
                    </div>
                    <div className="row">
                        <label className="form-label" htmlFor="itemPrice">Цена</label>
                        <input required className="form-control" name="itemPrice" id="itemPrice" type="number" value={itemPrice} onChange={e => setItemPrice(e.target.value)} min="1" step="0.01" placeholder="Введите цену" />
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
            <Banner />
            <ContentBlock valueBlock={Content} contentDop={modalAddButton} title='Товары' />
        </div>
    )
}
