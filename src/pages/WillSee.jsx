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
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    Service.read('lines/' + data[i].id)
                        .then((elem) => {
                            for (let j in elem) {
                                data[i][j] = elem[j];
                            }
                            setItems(data)
                        })
                }
            });
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
        Service.read('willSee/' + item.id)
            .then((data) => {
                data.count -= 1;
                if (data.count == 0) {
                    handleDeleteItem(item.id)
                    return;
                }
                Service.update('willSee/' + item.id, data)
                    .then(() => {
                        setItems(
                            items.map(elem =>
                                elem.id === data.id ? {
                                    ...elem,
                                    count: data.count
                                } : elem)
                        )
                        console.info('Done');
                    })
            })
    };

    function handleAddItem(item) {
        console.info('Try to plus item in will see');
        Service.read('willSee/' + item.id)
            .then((data) => {
                data.count += 1;
                Service.update('willSee/' + item.id, data)
                    .then(() => {
                        setItems(
                            items.map(elem =>
                                elem.id === data.id ? {
                                    ...elem,
                                    count: data.count
                                } : elem)
                        )
                        console.info('Done');
                    })
            })
    };

    return (
        <div>
            <ContentBlock
                className="d-flex justify-content-start flex-wrap"
                valueBlock={items.map(item =>
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
                title="Корзина"
                contentDop={<input className="form-control my-2 me-3 mainInput"
                    type="text" value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Введите название" />} />
        </div>
    )
}
