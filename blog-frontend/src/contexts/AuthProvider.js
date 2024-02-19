import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const localStorageUser = JSON.parse(localStorage.getItem("user"));

    const [category, setCategory] = useState([]);
    const [blog, setBlog] = useState([]);
    const [visitorBlog, setVisitorBlog] = useState([]);
    const [loading, setLoading] = useState(false);

    const createUser = async (data) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                toast.success("Registration Successful. Please Login!");
                return response.json();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Registration Failed! Please try again");
                throw new Error(errorData.message);
            }
        } catch (error) {
            toast.error(error.message || "Registration Failed! Please try again");
            console.log(error.message);
        }
    };

    const signInUser = async (data) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const userData = await response.json();
                if (userData) {
                    setUser(userData);
                    localStorage.setItem("user", JSON.stringify(userData));
                    window.location.href = "/";
                }
                toast.success("Login Successful!");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Login Failed! Please try again");
                throw new Error(errorData.message);
            }
        } catch (error) {
            toast.error(error.message || "Login Failed! Please try again");
            console.log(error.message);
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/category/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorageUser?.access}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setCategory(data?.results);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    };

    const createCategory = async (data) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/category/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorageUser?.access}`
                    },
                    body: JSON.stringify(data)
                });
            if (response.ok) {
                const newCategory = await response.json();
                setCategory([...category, newCategory]);
                toast.success("Category Created Successfully!");
            }
            else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        }
        catch (error) {
            toast.error(error.message || "Category Creation Failed! Please try again");
            console.log(error.message);
        }
    }

    const createBlog = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("details", data.details);
            formData.append("category", data.category);
            formData.append("banner_url", data.banner_url);
            const response = await fetch("http://127.0.0.1:8000/api/blog/",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${localStorageUser?.access}`
                    },
                    body: formData
                });
            if (response.ok) {
                const newBlog = await response.json();
                setBlog([...blog, newBlog]);
                toast.success("Blog Created Successfully!");
            }
            else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        }
        catch (error) {
            toast.error(error.message || "Blog Creation Failed! Please try again");
            console.log(error.message);
        }
    }

    const fetchBlog = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/blog/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorageUser?.access}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBlog(data?.results);
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

    const fetchVisitorBlog = async (pageNumber) => {
        try {
            setLoading(true);
            const url = `http://127.0.0.1:8000/visitor/blogs/?page=${pageNumber}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorageUser?.access}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setVisitorBlog(data);
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

    const searchVisitorBlog = async (search) => {
        try {
            setLoading(true);
            const url = `http://127.0.0.1:8000/search/${search}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorageUser?.access}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setVisitorBlog(data);
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

    const updateBlog = async (id, data) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/blog/${id}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorageUser?.access}`
                    },
                    body: JSON.stringify(data)
                });
            if (response.ok) {
                const updatedBlog = await response.json();
                const newBlog = blog.map((b) => b.id === updatedBlog.id ? updatedBlog : b);
                setBlog(newBlog);
                toast.success("Blog Updated Successfully!");
            }
            else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        }
        catch (error) {
            toast.error(error.message || "Blog Updation Failed! Please try again");
            console.log(error.message);
        }
    }

    const deleteBlog = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/blog/${id}/`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorageUser?.access}`
                    }
                });
            if (response.ok) {
                const newBlog = blog.filter((b) => b.id !== id);
                setBlog(newBlog);
                toast.success("Blog Deleted Successfully!");
            }
            else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        }
        catch (error) {
            toast.error(error.message || "Blog Deletion Failed! Please try again");
            console.log(error.message);
        }
    }

    const bookMarkBlog = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/user/bookmark/${id}/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorageUser?.access}`
                    }
                });
            if (response.ok) {
                toast.success("Blog Bookmarked Successfully!");
            }
            else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        }
        catch (error) {
            toast.error(error.message || "Blog Bookmark Failed! Please try again");
            console.log(error.message);
        }
    }

    const logOutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            if (user?.user_type === "author") {
                setIsAuthor(true);
            } else if (user?.user_type === "normal") {
                setIsUser(true);
            } else {
                setIsAuthor(false);
                setIsUser(false);
            }
        }
    }, [user]);

    const authInfo = {
        createUser,
        signInUser,
        logOutUser,
        user,
        isUser,
        isAuthor,
        category,
        fetchCategory,
        createCategory,
        blog,
        fetchBlog,
        createBlog,
        updateBlog,
        deleteBlog,
        visitorBlog,
        fetchVisitorBlog,
        loading,
        searchVisitorBlog,
        bookMarkBlog
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;