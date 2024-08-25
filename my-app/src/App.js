import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Create this CSS file for styling

const App = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');
    const [response, setResponse] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    // Validate JSON
    const validateJson = (input) => {
        try {
            JSON.parse(input);
            return true;
        } catch (e) {
            return false;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateJson(jsonInput)) {
            setError('Invalid JSON format');
            return;
        }

        setError('');
        setShowDropdown(true);

        try {
            const res = await axios.post('https://one553bajaj-7.onrender.com/api/data', JSON.parse(jsonInput));
            setResponse(res.data);
        } catch (error) {
            setError('Error connecting to API');
        }
    };

    // Render response
    const renderResponse = () => {
        if (response) {
            return (
                <div className="response-container">
                    <h3>Response:</h3>
                    <pre className="response">{JSON.stringify(response, null, 2)}</pre>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="app-container">
            <h1 className="title">JSON API Interface</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="jsonInput" className="label">JSON Input:</label>
                    <textarea
                        id="jsonInput"
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        rows="10"
                        cols="50"
                        placeholder='Enter valid JSON here'
                        className="textarea"
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            {error && <p className="error">{error}</p>}
            {renderResponse()}
            {showDropdown && (
                <div className="dropdown-container">
                    <label htmlFor="responseOptions" className="label">Select an option:</label>
                    <select id="responseOptions" className="dropdown">
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highestLowercase">Highest lowercase alphabet</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default App;
