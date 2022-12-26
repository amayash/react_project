import { React, useState, useEffect } from 'react'
import Item from './components/Item'
import Service from './services/Service'
import { useParams, useNavigate } from "react-router-dom";
import ContentBlock from './components/ContentBlock';

export default function SearchSame() {
    const navigate = useNavigate();
    // массив полученных элементов
    const [searchResult, setSearchResult] = useState([]);
    const params = useParams()
    const [items, setItems] = useState([])

    useEffect(() => {
        let temp = JSON.stringify(searchResult);
        temp = JSON.parse(temp);
        setItems(temp.filter(elem => elem.name.toLowerCase().includes(params.request.toLowerCase())));
    }, [searchResult, params]);

    useState(() => {
        const fetchData = async () => {
            const url = new URL('http://localhost:8079/lines')
            try {
                const response = await fetch(url.href);
                const json = await response.json();
                setSearchResult(json);
                console.info('Search success');
            } catch (error) {
                return;
            }
        };
        fetchData();
    }, [])

    function handleAdd(item) {
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

    return (
        <div>
            <ContentBlock
                valueBlock={items.map((item) =>
                    <Item
                        item={item}
                        key={item.id}
                        addItemToWillSee={handleAdd}
                        openItemPageFunc={(index) => navigate(`/mainPage/${index}`)}
                    />
                )}
                title='Поиск товара' />
        </div>
    )
}
