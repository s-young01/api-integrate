import { createContext, useContext, useReducer, useRef } from "react";

//초기값지정
const initialState = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: false
    },
    {
        id: 2,
        text: '프로젝트 스타일링하기',
        done: false
    },
    {
        id: 3,
        text: 'context만들기',
        done: false
    },
    {
        id: 4,
        text: '기능 구현하기',
        done: false
    },
]

//리듀서 구현
function todoReducer(state, action) { //상태 액션객체값 받음
    switch(action.type){
        //action객체 type값이 'create'면
        case 'CREATE':
            return [
                ...state, 
                action.todo
            ];
        case 'TOGGLE':
            return state.map(todo=>todo.id ===action.id ? {...todo, done: !todo.done} : todo);
        case 'REMOVE':
            return state.filter(todo => action.id !== todo.id);
        default:
            return state;
    }
}

//컨텍스트 생성
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

const TodoContext = ({children}) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    // 마운트되어도 값을 계속 유지하기 위해 useRef()써줌
    const nextId = useRef(5);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
};

// 커스텀 훅
export function useTodoState() {
    // 위 함수 호출 시, state값 반환 
    return useContext(TodoStateContext);
}
export function useTodoDispatch() {
    // 위 함수 호출 시, dispatch값 반환
    return useContext(TodoDispatchContext);
}
export function useTodoNextId() {
    // 위 함수 호출 시, nextId값 반환
    return useContext(TodoNextIdContext);
}

export default TodoContext;