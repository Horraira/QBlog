import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Pages/shared/header/Header';
import Footer from '../Pages/shared/footer/Footer';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;