import React from 'react';
import {Platform} from 'react-native';
import Styled from 'styled-components/native';

import Background from './Background';
import TextInput from './TextInput';

// KeyboardAvoidingView: 키보드가 활성화되면서 입력창을 가리는 문제를 해결하기 위한 컴포넌트
const Container = Styled.KeyboardAvoidingView`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: flex-end;
`;

interface Props {
    hideTodoInput: () => void;
}

const TodoInput = ({ hideTodoInput }: Props) => {
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Background onPress={hideTodoInput} />
            <TextInput hideTodoInput={hideTodoInput} />
        </Container>
    );
};

export default TodoInput;