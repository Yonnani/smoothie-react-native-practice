import React, { useState } from 'react';

import AddButton from './AddButton';
import TodoInput from './TodoInput';

interface Props {}

const Addtodo = ({ }: Props) => {
    const [showInput, setShowInput] = useState<boolean>(false);
    return (
        <>
            <AddButton onPress={() => setShowInput(true)} />
            {
                showInput && 
                    <TodoInput hideTodoInput={() => setShowInput(false)} />
            }
        </>
    );
};