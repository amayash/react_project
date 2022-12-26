import { React, useEffect, useState } from 'react'
import ContentBlock from './components/ContentBlock'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import Service from './services/Service'

export default function CurrPage() {
    const params = useParams();
    const [items, setItems] = useState({});

    useEffect(() => {
        fetch("http://localhost:8079/lines/" + params.id)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.info('Get item success');
                setItems(data);
            })
            .catch(function (error) {
                console.error('Error:', error);
                throw "Can't get item";
            });
    }, []);

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

    const content = (
        <div className="container">
            <div className="d-flex flex-wrap">
                <span className="text-white fs-1 fw-bold me-3">
                    {items.name}
                </span>
                <button onClick={() => handleAddItemToWillSee(items)} type="button" className="m-2 btn btn-success">
                    <FontAwesomeIcon icon={faHeart} />
                </button>
            </div>
            <img className="row posterItemPage me-3 mt-3" src={items.image} alt={items.name} />
            <div className="column fs-4">
                <div className="text-center row text-white fw-bold fs-2 customTable">О товаре</div>
                <div className="row customTable">
                    <div className="text-white-50 col">Название</div>
                    <div className="text-white col">{items.name}</div>
                </div>
                <div className="row customTable">
                    <div className="text-white-50 col">Тип</div>
                    <div className="text-white col">{items.type}</div>
                </div>
                <div className="row customTable">
                    <div className="text-white-50 col">Цена</div>
                    <div className="text-white col text-nowrap">{items.price} $</div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <ContentBlock valueBlock={content} title='Страница товара' />
        </div>
    )
}
