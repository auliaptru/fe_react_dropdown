import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './dropdown.scss';

const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        const arrowDownHandler = ({ key }) => {
            if (key === targetKey) {
                setKeyPressed(true);
            }
        };
        const arrowUpHandler = ({ key }) => {
            if (key === targetKey) {
                setKeyPressed(false);
            }
        };
        window.addEventListener('keydown', arrowDownHandler);
        window.addEventListener('keyup', arrowUpHandler);
        return () => {
            window.removeEventListener('keydown', arrowDownHandler);
            window.removeEventListener('keyup', arrowUpHandler);
        };
    }, [targetKey]);
    return keyPressed;
};

const Dropdown = ({ data }) => {
    const [showOption, setShowOption] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedOption, setSelectedOption] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [editing, setEditing] = useState(true);

    const downPress = useKeyPress('ArrowDown');
    const upPress = useKeyPress('ArrowUp');
    const enterPress = useKeyPress('Enter');
    const backspacePress = useKeyPress('Backspace');

    // Click option
    const handleOptionClick = (option) => {
        setSelectedValue(option);
        setShowOption(false);
        setEditing(false);
    };

    // Get value from input
    const handleChange = (e) => {
        if (searchQuery) {
            setShowOption(true);
        }
        setSearchQuery(e.target.value);
    };

    // Filter data
    const filterOptions = (query, data) => {
        if (!query) {
            return data;
        } else {
            return data.filter((d) =>
                d.option.toLowerCase().includes(query.toLowerCase())
            );
        }
    };

    const dataFilter = filterOptions(searchQuery, data);

    // Scroll with down arrow button
    useEffect(() => {
        if (dataFilter.length && downPress) {
            setSelectedOption((prev) =>
                prev < dataFilter.length - 1 ? prev + 1 : prev
            );
        }
    }, [downPress]);

    // Scroll with up arrow button
    useEffect(() => {
        if (dataFilter.length && upPress) {
            setSelectedOption((prev) => (prev > 0 ? prev - 1 : prev));
        }
    }, [upPress]);

    // Select with enter button
    useEffect(() => {
        if (dataFilter.length && enterPress) {
            handleOptionClick(dataFilter[selectedOption]);
        }
    }, [selectedOption, enterPress]);

    // Delete
    useEffect(() => {
        if (backspacePress && selectedValue) {
            setEditing(true);
            setShowOption(true);
        }
    }, [backspacePress, selectedValue]);

    useEffect(() => {
        if (dataFilter.length === 0) {
            setSelectedOption(0);
        }
    }, [dataFilter]);

    return (
        <div className='dropdown__container'>
            <div
                className='dropdown__container-input'
                onClick={() => setShowOption(!showOption)}
            >
                <input
                    type='text'
                    className='dropdown__select'
                    placeholder='Select'
                    value={editing ? searchQuery : selectedValue?.option || ''}
                    onChange={(e) => handleChange(e)}
                />
                <div className='dropdown__icon'>
                    <div
                        className={`arrowIcon ${showOption && 'arrow-select'}`}
                    >
                        <svg height='40' width='40' viewBox='0 0 20 20'>
                            <path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'></path>
                        </svg>
                    </div>
                </div>
            </div>
            {showOption && (
                <div className='dropdown__options'>
                    {dataFilter.length === 0 ? (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: '30px',
                            }}
                        >
                            <p>No data</p>
                        </div>
                    ) : (
                        dataFilter.map((opt, i) => (
                            <div
                                key={i}
                                className={`dropdown__option ${
                                    selectedOption === i ? 'selected' : ''
                                } `}
                                onClick={() => handleOptionClick(opt)}
                            >
                                <div
                                    className='icon'
                                    style={{ color: opt.color }}
                                >
                                    <img src={opt.icon} alt='' />
                                </div>
                                <p>{opt.option}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

Dropdown.propTypes = {
    data: PropTypes.array.isRequired,
    handleSelect: PropTypes.func.isRequired,
    placeholder: PropTypes.number.string,
};

export default Dropdown;
