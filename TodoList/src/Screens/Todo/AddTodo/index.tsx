import React, { useState } from 'react';

import AddButton from './AddButton';
import TodoInput from './TodoInput';

interface Props {}

const AddTodo = ({ }: Props) => {
    // 할 일 입력 컴포넌트 표시 여부 state에 저장
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

export default AddTodo;