import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

const UserHome = () => {
    const { visitorBlog, fetchVisitorBlog, loading, searchVisitorBlog, bookMarkBlog } = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchVisitorBlog(page);
        // eslint-disable-next-line
    }, [page]);

    const handleNext = () => {
        setPage(page + 1);
        fetchVisitorBlog(page + 1);
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
            fetchVisitorBlog(page - 1);
        }
    }
    return (
        <div className="px-10">
            {loading ? <div className='flex items-center justify-center mt-3'>
                <span className="loading loading-spinner loading-lg"></span>
            </div> :
                <div>
                    <div>
                        <h1 className="text-2xl text-center mt-3">Welcome to Blog App</h1>
                        <h4 className='text-md text-center'>{`( Total ${visitorBlog?.count} Blog Available )`}</h4>

                        <div className='flex items-center justify-center gap-4'>
                            <input
                                type="text"
                                placeholder="Search with anything..."
                                className="input input-bordered w-full mt-3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className='flex items-center justify-center gap-2'>
                                <button className="btn btn-primary mt-3" onClick={() => searchVisitorBlog(search)}>Search</button>
                                <button className="btn btn-outline mt-3 ml-3" onClick={() => fetchVisitorBlog(page)}>Reset</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-3">
                        {visitorBlog?.results?.length > 0 ?
                            visitorBlog?.results?.map((blog, index) => (
                                <div className="card w-full h-96 bg-base-100 shadow-xl relative" key={index + 1}>
                                    <figure><img src={blog?.banner_url} alt={blog?.title} className='h-60 w-full' /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {blog?.title.length > 15 ? blog?.title.slice(0, 15) + '...' : blog?.title}
                                            <div className="badge badge-info text-white">{blog?.category}</div>
                                        </h2>
                                        <p>{blog?.details.length > 50 ? blog?.details.slice(0, 50) + '...' : blog?.details}</p>
                                        <div className="card-actions flex items-end justify-between">
                                            <div className="badge badge-outline">{`Author -  ${blog?.author}`}</div>
                                            <Link to={`/blog/${blog?.id}`} className="btn btn-sm btn-primary">Read More</Link>
                                        </div>
                                        <div className='absolute top-2 right-2'>
                                            <button
                                                className="btn btn-sm btn-warning text-white"
                                                onClick={() => bookMarkBlog(blog?.id)}
                                                disabled={blog?.is_bookmarked ? true : false}
                                            >{blog?.is_bookmarked ? 'Bookmarked' : 'Add Bookmark'}</button>
                                        </div>
                                    </div>
                                </div>
                            )) : <h2 className='text-xl text-center'>No Blog Found!</h2>}
                    </div>
                    <div className='flex items-center justify-center gap-3 mt-3'>
                        <button className='btn btn-outline' onClick={handlePrev}
                            disabled={page === 1 && visitorBlog?.previous === null ? true : false}>Previous</button>
                        <button className='btn btn-outline' onClick={handleNext}
                            disabled={page === Math.ceil(visitorBlog?.count / 10) && visitorBlog?.next === null ? true : false}
                        >Next</button>
                    </div>
                </div>
            }
        </div>
    );
}
export default UserHome;