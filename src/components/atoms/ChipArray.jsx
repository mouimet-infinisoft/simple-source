import React, { useState } from 'react';
import { Badge, InputGroup, FormControl, Button } from 'react-bootstrap';

function ChipArray({ initialItems = [], placeholder = "Enter value and press space...", onItemsChange }) {
    const [items, setItems] = useState(initialItems);
    const [currentInput, setCurrentInput] = useState('');

    const handleInputChange = (e) => {
        setCurrentInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (currentInput.trim() !== '') {
                const newItems = [...items, currentInput.trim()];
                setItems(newItems);
                setCurrentInput('');
                if (onItemsChange) {
                    onItemsChange(newItems);
                }
            }
        }
    };

    const handleRemoveChip = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        if (onItemsChange) {
            onItemsChange(newItems);
        }
    };

    return (
        <InputGroup style={{ gap: '0.5rem' }}>
            <FormControl
                value={currentInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                style={{ marginBottom: '0.5rem', flex: '1 0 100%' }}
            />

            {items && items?.map((item, index) => (
                <Badge pill bg="primary" key={index} className="me-2">
                    {item}

                    <Button
                        size="sm"
                        onClick={() => handleRemoveChip(index)}
                        style={{ marginLeft: '0.5rem', color: 'red', fontWeight: 'bold' }}
                    >
                        X
                    </Button>
                </Badge>
            ))}
        </InputGroup>
    );
}

export default ChipArray;
