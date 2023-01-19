import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useTodoDispatch, useTodoNextId } from '../hooks/TodoContext';
import { MdAdd } from "react-icons/md";

const CircleButton = styled.button`
    border: none;
    outline: none;
    background: #38d9a9;
    &:hover {
        background: #63e6be;
    }
    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    position: absolute;
    bottom: 0;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, 50%);
    color: #fff;
    transition: 0.3s;
    ${props=>
        props.open &&
        css`
            background: #ff6b6b;
            &:hover {
                background: #ff8787;
            }
            transform: translate(-50%, 50%) rotate(45deg);
        `
    }
`;

const InsertForm = styled.form`
    background: #f8f9fa;
    padding: 32px 32px 72px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`
const Input = styled.input`
    padding: 14px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
`
const TodoCreate = () => {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();
    const addTodo = (e) => {
        e.preventDefault(); //페이지이동 방지
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done: false
            }
        })
        setValue("");
        nextId.current += 1;
    }
    return (
        <div>
            {open && 
            <InsertForm onSubmit={addTodo}>
                <Input placeholder='할일을 입력한 후 Enter를 누르세요'value={value} 
                onChange={(e) => {
                    setValue(e.target.value);
                }}/>
                
            </InsertForm>
            }
            <CircleButton open={open} onClick={()=>setOpen(!open)}>
                <MdAdd/>
            </CircleButton>
        </div>
    );
};

export default TodoCreate;