import React, { useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const SingleUserBlog = () => {
    const { isUser } = useContext(AuthContext);
    const { id } = useParams();
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    const [singleBlog, setSingleBlog] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchSingleUserBlog = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/visitor/blog/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorageUser?.access}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setSingleBlog(data);
                setLoading(false);
            }
            else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchSingleUserBlog();
        // eslint-disable-next-line
    }, [id]);



    return (
        <React.Fragment>
            {isUser ? <div className='bg-base-200 p-5'>
                <div className='flex item-end justify-end px-10 py-3'>
                    <Link to='/' className='btn btn-sm btn-primary'>Back</Link>
                </div>
                {loading ? <div className='flex items-center justify-center'>
                    <span className="loading loading-spinner loading-lg"></span>
                </div> :
                    <div className='px-10'>
                        <div className="w-full flex items-center justify-center">
                            <figure><img src={singleBlog?.banner_url} alt={singleBlog?.title} className='h-80 w-full rounded-lg' /></figure>
                        </div>
                        <h1 className="text-2xl text-center mt-3">{singleBlog?.title}</h1>
                        <p className='text-md mt-2'>{singleBlog?.details}</p>
                    </div>}
            </div> : <div bg-base-200 p-5>
                <h1 className="text-2xl text-center">Unauthorized!!</h1>
            </div>}
        </React.Fragment>
    );
}

export default SingleUserBlog;