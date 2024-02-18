import React, { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useContext } from "react";
import UserHome from "./UserHome";

const Home = () => {
    const {
        isAuthor,
        isUser,
        category,
        fetchCategory,
        createCategory,
        blog,
        fetchBlog,
        createBlog,
        updateBlog,
        deleteBlog
    } = useContext(AuthContext);
    const [formData, setFormData] = useState({ name: "" });
    const [blogFromData, setBlogFormData] = useState({ title: "", details: "", category: "" });
    const [file, setFile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editValue, setEditValue] = useState({});

    const handleCategory = () => {
        createCategory(formData);
        setFormData({ name: "" });
        document.getElementById('categoryModal').close();
    }

    const handleBlog = () => {
        const data = {
            title: blogFromData.title,
            details: blogFromData.details,
            category: blogFromData.category,
            banner_url: file
        }
        createBlog(data);
        setBlogFormData({ title: "", details: "", category: "" });
        setFile(null);
        document.getElementById('blogModal').close();
    }

    const editBlog = () => {
        const data = {
            title: blogFromData.title,
            details: blogFromData.details,
            category: blogFromData.category
        }
        updateBlog(editValue?.id, data);
        setBlogFormData({ title: "", details: "", category: "" });
        setFile(null);
        setEditMode(false);
        setEditValue({});
        document.getElementById('blogModal').close();
    }

    useEffect(() => {
        fetchCategory();
        fetchBlog();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (editMode) {
            editMode && setBlogFormData({
                title: editValue?.title,
                details: editValue?.details,
                category: editValue?.category
            });
        }
        // eslint-disable-next-line
    }, [editMode, editValue]);
    return (
        <div className="bg-base-200 p-5">
            {isAuthor && <h1 className="text-xl text-center">Welcome, you are logged in as an Author</h1>}
            {!isAuthor && !isUser && <h1 className="text-xl text-center">Welcome Guest</h1>}

            {isAuthor &&
                <>
                    <div className="overflow-x-auto bg-white rounded-lg p-5 mt-3">
                        <div className="flex justify-between items-center mb-3">
                            <h1 className="text-xl">Blogs List</h1>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary"
                                    onClick={() => {
                                        setEditMode(false);
                                        setBlogFormData({ title: "", details: "", category: "" });
                                        document.getElementById('blogModal').showModal()
                                    }}
                                >Create Blog</button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-success text-white"
                                    onClick={() => document.getElementById('categoryModal').showModal()}
                                >Create Category</button>
                            </div>
                        </div>
                        <table className="table table-zebra">
                            <thead>
                                <tr className="text-center">
                                    <th>SL.</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Author</th>
                                    <th>Total Views</th>
                                    <th>Created Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blog?.length > 0 ? blog?.map((item, index) => (
                                    <tr key={index} className="text-center">
                                        <td>{index + 1}</td>
                                        <td>{item?.title}</td>
                                        <td>{item?.category_name}</td>
                                        <td>{item?.author}</td>
                                        <td>{item?.total_views}</td>
                                        <td>{new Date(item?.created_at).toDateString()}</td>
                                        <td className="flex items-center justify-center gap-3">
                                            <button className="btn btn-sm btn-warning text-white" onClick={() => {
                                                setEditMode(true);
                                                setEditValue(item);
                                                document.getElementById('blogModal').showModal();
                                            }}>Edit</button>
                                            <button className="btn btn-sm btn-error text-white" onClick={() => deleteBlog(item?.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )) : <tr><td colSpan="7" className="text-center">No Blogs Found</td></tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* Category Modal */}
                    <dialog id="categoryModal" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>

                                <h3 className="font-bold text-sm uppercase">Create Category</h3>
                                <div className="form-control mt-3">
                                    <label className="label">
                                        <span className="label-text">Category Name <span className="text-red-400">*</span> </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter Category Name"
                                        className="input input-bordered"
                                    />
                                    {formData.name === "" && <p className="text-red-700 mt-2">**Category Name is Required</p>}
                                </div>

                                <div className="form-control mt-3">
                                    <button className="btn btn-sm btn-primary w-fit mx-auto" onClick={handleCategory}>Create</button>
                                </div>
                            </form>
                        </div>
                    </dialog>

                    {/* Blog Modal */}
                    <dialog id="blogModal" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>

                                <h3 className="font-bold text-sm uppercase">{!editMode ? "Create" : "Update"} Blog</h3>
                                <div className="form-control mt-3">
                                    <label className="label">
                                        <span className="label-text">Blog Title <span className="text-red-400">*</span> </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={blogFromData.title}
                                        onChange={(e) => setBlogFormData({ ...blogFromData, title: e.target.value })}
                                        placeholder="Enter Blog Title"
                                        className="input input-bordered"
                                    />
                                    {blogFromData.title === "" && <p className="text-red-700 mt-2">**Blog Title is Required</p>}
                                </div>
                                <div className="form-control mt-2">
                                    <label className="label">
                                        <span className="label-text">Blog Details <span className="text-red-400">*</span> </span>
                                    </label>
                                    <textarea
                                        value={blogFromData.details}
                                        onChange={(e) => setBlogFormData({ ...blogFromData, details: e.target.value })}
                                        placeholder="Enter Blog Details"
                                        className="textarea textarea-bordered"
                                    ></textarea>
                                    {blogFromData.details === "" && <p className="text-red-700 mt-2">**Blog Details is Required</p>}
                                </div>
                                <div className="form-control mt-2">
                                    <label className="label">
                                        <span className="label-text">Category <span className="text-red-400">*</span> </span>
                                    </label>
                                    <select
                                        value={blogFromData.category}
                                        onChange={(e) => setBlogFormData({ ...blogFromData, category: e.target.value })}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Select Category</option>
                                        {category?.map((item, index) => (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                    {blogFromData.category === "" && <p className="text-red-700 mt-2">**Category is Required</p>}
                                </div>
                                {!editMode && <div className="form-control mt-2">
                                    <label className="label">
                                        <span className="label-text">Upload Banner</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept=".jpg"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="input input-bordered file-input w-full"
                                    />
                                </div>}
                                <div className="form-control mt-3">
                                    <button className="btn btn-sm btn-primary w-fit mx-auto" onClick={!editMode ? handleBlog : editBlog}>
                                        {!editMode ? "Create" : "Update"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </dialog>
                </>}

            {isUser && <UserHome />}
        </div>
    )
}

export default Home;