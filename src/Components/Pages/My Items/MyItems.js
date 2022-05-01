import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../../Api/AxiosPrivate';
import auth from '../../../firebase.init';
import SingleMyItem from '../SingleMyItem/SingleMyItem';
import './MyItems.css'

const MyItems = () => {
    const [myItems, setMyItems] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {

        const getMtItems = async () => {
            const email = user?.email;
            const url = `http://localhost:5000/myItems?email=${email}`;
            try {
                const { data } = await axiosPrivate.get(url);
                console.log(data);
                setMyItems(data);
            }
            catch (error) {
                console.log(error.message);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login');
                }
            }
        }
        getMtItems();

    }, [user])

    return (
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
            {
                myItems.map(items => <SingleMyItem key={items._id} item={items}></SingleMyItem>)
            }
        </div>
    );
};

export default MyItems;