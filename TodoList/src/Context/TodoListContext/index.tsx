import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
    children: JSX.Element | Array<JSX.Element>;
}

const TodoListContext = createContext<ITodoListContext>({
    todoList: [],
    addTodoList: (todo: string): void => {},
    removeTodoList: (index: number): void => {},
});

/*
    - Context 사용하기 위해서 공통 부모 컴포넌트에서 자신의 부모 컴포넌트로 Context의 프로바이더를 사용함
    - 자식 컴포넌트를 children 매개변수로 전달받음
 */
const TodoListContextProvider = ({ children }: Props) => {
    const [todoList, setTodoList] = useState<Array<string>>([]);

    const addTodoList = (todo: string): void => {
        const list = [...todoList, todo];
        setTodoList(list);
        AsyncStorage.setItem('todoList', JSON.stringify(list));
    };

    const removeTodoList = (index: number): void => {
        let list = [...todoList];
        list.splice(index, 1);
        setTodoList(list);
        AsyncStorage.setItem('todoList', JSON.stringify(list));
    };

    const initData = async () => {
        try {
            const list = await AsyncStorage.getItem('todoList');
            if (list !== null) {
                setTodoList(JSON.parse(list));
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        initData();
    }, []);
    /**
     * useEffect 사용법
     * 1. componentDidMount 같은 역할
     *   - 두 번째 매개변수에 빈 배열 전달 시
     *   - 컴포넌트가 처음 화면에 표시된 이후 한번만 호출됨
     * 2. componentDidMount, componentDidUpdate 같은 역할
     *   - 두 번째 매개변수 설정하지 않는 경우
     *   - 컴포넌트가 처음 화면에 표시된 이후 실행, Props나 State가 변경되어 컴포넌트가 리렌더링된 후 실행
     * 3. componentWillUnmount 같은 역할
     *   - 첫 번째 매개변수 함수가 함수를 반환하는 경우
     *   - 컴포넌트가 화면에서 사라진 후 반환된 함수가 호출됨
     * 4. useEffect의 고유 기능
     *   - 두 번째 매개변수로 배열 전달 시, 전달된 변수가 변경될 때만 함수가 호출됨
     *   - 한 컴포넌트에 여러 번 정의하여 사용 가능
     */

    return (
        <TodoListContext.Provider
            value={{
                todoList,
                addTodoList,
                removeTodoList
            }}>
            {children}
        </TodoListContext.Provider>
    );
};

export { TodoListContextProvider, TodoListContext };