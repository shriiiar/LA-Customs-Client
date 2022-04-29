import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AllFunctions from '../../../Hooks/AllFunctions';
import './SingleInventory.css';

const SingleInventory = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/inventory/${id}`)
            .then(res => res.json())
            .then(data => setCar(data));
    }, [])

    const [DecreaseByOne, IncreaseByOne, DeleteByOne] = AllFunctions();
    const { name, description, price, img, supplierName, quantity } = car;

    const EventSubmit = event => {
        event.preventDefault();
        const number = event.target.number.value;
        IncreaseByOne(car, parseInt(number));
    }

    const goToManageInventory = () => {
        navigate('/manageInventory');
    }
    return (
        <div className='p-5'>
            <div className='card h-100 my-4 justify-content-center'>
                <h5 className='my-3 text-center'><span className='item-span'>{name}</span></h5>
                <div className='img-div'>
                    <img src={img} width="500px" className='img-fluid' alt="car image" />
                </div>
                <p className='text-center fs-5'>{description}</p>
                <h5 className='text-center'>Rating: <span className='item-span'>{price}</span></h5>
                <h5 className='text-center'>Supplier Name: <span className='item-span'>{supplierName}</span></h5>
                <h5 className='text-center'>Quantity: <span className='item-span'>{quantity}</span></h5>
                <button onClick={() => DecreaseByOne(car)} className='button-33 mx-auto w-25'>Delivered</button>
            </div>
            <div className='card form-container p-5'>
                <div>
                    <h2 className='form-title mb-5 text-center'>Restock Inventory</h2>
                    <form onSubmit={EventSubmit}>
                        <div className="input-group">
                            <label htmlFor='number'>Restock </label>
                            <input type="number" name="number" required />
                        </div>
                        <input className='form-submit w-25' type="submit" required value="Restock" />
                    </form>

                </div>
            </div>
            <button onClick={() => goToManageInventory()} className='button-33'>Manage Inventory</button>
        </div>
    );
};

export default SingleInventory;