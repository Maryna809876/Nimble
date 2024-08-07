import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import ContactPage from '../pages/ContactPage/ContactPage';

export default () => {
    return (
        <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={"/contact/:id"} element={<ContactPage />} />
            <Route path="*" element={<><div>404</div><br /><p>Page is not found</p></>} />
        </Routes>
    )
}