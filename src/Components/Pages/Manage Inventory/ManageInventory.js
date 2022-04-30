import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InvididualItems from '../Invididual Items/InvididualItems';
import './ManageInventory.css';

const ManageInventory = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/inventory')
            .then(res => res.json())
            .then(newData => {
                const match = newData.filter(item => item.name.toLowerCase().includes(searchText));
                setData(match);
            })
    }, [searchText])

    const textChange = (event) => { // getting search result
        console.log(event.target.value);
        setSearchText(event.target.value);
    }

    const gotoMyItem = () => {
        navigate('/addInventory');
    }

    return (
        <div>
            <div className=''>
                <input id='input-text' onChange={textChange} className='my-5' type="text" placeholder='Search..' />
            </div>
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
                {
                    data.map(items => <InvididualItems key={items._id} items={items}></InvididualItems>)
                }
            </div>
            <button onClick={() => gotoMyItem()} className='button-33'>Add New Item</button>
        </div>
    );
};

export default ManageInventory;