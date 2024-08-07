import React from 'react';
import CreateContact from './components/CreateContact/CreateContact';
import ContactsList from './components/ContactsList/ContactsList';
import HomePage from './pages/HomePage/HomePage';
import RootRoters from './routes'

function App() {
    return (
        <div className="App">
            <RootRoters>
                <HomePage />
            </RootRoters>
        </div>
    );
}

export default App;
