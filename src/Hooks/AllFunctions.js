import { useState, useEffect } from 'react';
import getData from './GetData';
import useData from './GetData';

const AllFunctions = () => {
    const [car, setCar] = getData();
    const DecreaseByOne = (item) => {

        console.log(item);

        const newItem = { name: item.name, description: item.description, price: item.price, img: item.img, supplierName: item.supplierName, quantity: item.quantity - 1 };

        useEffect(() => {
        const url = `http://localhost:5000/inventory/${item._id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
            .then(res => res.json())
            .then(data => {
                console.log('success', data);
                setCar(data);
            });
        }, [car])
    }

    const IncreaseByOne = (item, number) => {

        console.log(item, number);

        const newItem = { name: item.name, description: item.description, price: item.price, img: item.img, supplierName: item.supplierName, quantity: item.quantity + number };

        useEffect(() => {
        const url = `http://localhost:5000/inventory/${item._id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
            .then(res => res.json())
            .then(data => {
                console.log('success', data);
                setCar(data);
            });
        }, [car])
    }

    const DeleteByOne = id => {
        console.log(id);
        const url = `http://localhost:5000/inventory/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    const remaining = car.filter(item => item._id !== id);
                    setCar(remaining);
                }
            })
    }

    return [DecreaseByOne, IncreaseByOne, DeleteByOne];
}

export default AllFunctions