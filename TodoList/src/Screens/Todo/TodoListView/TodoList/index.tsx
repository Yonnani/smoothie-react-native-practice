import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import Styled from 'styled-components/native';

import { TodoListContext } from '~/Context/TodoListContext';

import EmptyItem from './EmptyItem';
import TodoItem from './TodoItem';

// 리액트 네이티브의 리스트 뷰 중 하나인 FlatList 컴포넌트 사용
const Container = Styled(FlatList)`
`;
interface Props {}

const TodoList = ({}: Props) => {
    const { todoList, removeTodoList } = useContext<ITodoListContext>(
        TodoListContext
    );

    return (
        /*
        ListEmptyComponent
            - 주어진 배열에 데이터가 없을 경우 표시되는 컴포넌트
        renderItem
            - 주어진 배열에 데이터를 사용하여 반복적으로 표시될 컴포넌트
        contentContainerStyle={todoList.length === 0 && {flex: 1}}
            - 표시할 데이터 없는 경우, 안내 문구의 row를 전체 화면으로 표시하기 위함
         */
        <Container 
            data={todoList}
            keyExtractor={(item, index) => {
                return `todo-${index}`
            }}
            ListEmptyComponent={<EmptyItem />}
            renderItem={({ item, index }) => (
                <TodoItem
                    text={item as string}
                    onDelete={() => removeTodoList(index)}
                />
            )}
            contentContainerStyle={todoList.length === 0 && {flex: 1}}
        />
    );
};

export default TodoList;