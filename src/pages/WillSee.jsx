import { React, useState, useEffect } from 'react'
import ContentBlock from './components/ContentBlock'
import Item from './components/Item'
import Service from './services/Service'
import { useNavigate } from "react-router-dom"

export default function WillSee() {
    // массив для элементов
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    // массив для ввода
    const [itemName, setItemName] = useState('');

    useEffect(() => {
        Service.readAll('willSee')
            .then(data => setItems(data));
    }, []);

    function handleDeleteItem(id) {
        console.info('Try to remove item from will see');
        Service.delete(`willSee/${id}`)
            .then(() => {
                setItems(items.filter(elem => elem.id !== id))
                console.log("Removed from will see")
            });
    };

    function handleMinusItem(item) {
        console.info('Try to minus item from will see');
        item.count -= 1;
        if (item.count == 0) {
            handleDeleteItem(item.id)
            return;
        }
        Service.update('willSee/' + item.id, item)
        .then(()=> {
            setItems(
                items.map(elem =>
                    elem.id === item.id ? {
                        ...elem,
                        count: item.count
                    } : elem)
            )
            console.info('Done');
        })
    };

    function handleAddItem(item) {
        console.info('Try to plus item in will see');
        item.count += 1;
        Service.update('willSee/' + item.id, item)
        .then(()=> {
            setItems(
                items.map(elem =>
                    elem.id === item.id ? {
                        ...elem,
                        count: item.count
                    } : elem)
            )
            console.info('Done');
        })
    };

    const searchInput = <input className="form-control my-2 me-3" type="text" value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Введите название" />

    const content = (
        <>
            <table className="table" id="tbl-items">
                <tbody>
                     {items.map(item =>
                        (itemName === '' ? true : item.name.toLowerCase().includes(itemName.toLowerCase())) ?
                        <Item
                            item={item}
                            countItems={item.count}
                            key={item.id}
                            minusFunc={handleMinusItem}
                            removeFunc={handleDeleteItem}
                            addItemToWillSee={handleAddItem}
                            openItemPageFunc={(index) => navigate(`/mainPage/${index}`)}
                        /> : null)
                    }
                </tbody>
            </table>
        </>
    )
    return (
        <div>
            <ContentBlock valueBlock={content} title="Корзина" contentDop={searchInput}/>
        </div>
    )
}
