import { useEffect, useReducer } from 'react';

// 1. 상태의 초기값 변수 선언
const initalState = {
    data: null,
    loading: false,
    error: null
}
// 2. reducer함수 구현
// 어떤 요청 사항이 있을지 미리 정해놔야 함
function reducer(state, action) {
    // 1) 로딩중일 때 loading -> true, usres -> null, error -> null
    // 2) 데이터를 성공적으로 받았을 때  loading -> false, users -> [], error -> null
    // 3) 데이터 요청 후 에러가 발생했을 때 loading -> false, users -> null, error -> {e}
    switch(action.type) {
        case 'LOADING':
            return {
                error: null,
                users: null,
                loading: true
            }
        case 'SUCCESS':
            return {
                error: null,
                data: action.data,
                loading: false
            }
        case 'ERROR':
            return {
                error: action.error,
                data: null,
                loading: false
            }
        default:
            return state;
    }
}
// default 매개변수 : 값이 없으면 = 빈배열을 넣겠다
// callback에는 API요청을 시작하는 함수가 담김,
// deps에는 해당 함수 안에서 사용하는 useEffect의 deps로 설정
const UseAsync = (callback, deps=[]) => {
    const [state, dispatch] = useReducer(reducer, initalState);
    // fetchUsers가 호출되면 dispatch함수 반환
    const fetchUsers = async () => {
        try{
            dispatch({
                type: 'LOADING'
            })
            // axios로 받은 데이터 결과가 response에 담김 
            const response = await callback();
            dispatch({
                type: 'SUCCESS',
                data: response.data
            }); // 데이터는 response.data 안에 있다.
        }
        catch(e){
            dispatch({
               type: 'ERROR',
               error: e
            })
        }
    };
    // Async 함수가 마운트 될 때, 아래의 함수가 호출됨
    useEffect(() => {
        fetchUsers();
    }, deps)

    // Async 함수는 서버에서 데이터를 요청하여 결과를 반환 
    return [state, fetchUsers];
};

export default UseAsync;