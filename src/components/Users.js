import axios from 'axios';
import React from 'react';
import UseAsync from '../hooks/UseAsync';

// 콜백함수 로 전달해주는 async함수 작성
async function getUsers() {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    )
    // 위의 함수를 호출하면 response가 반환됨
    return response;
}

const Users = () => {
    const [state, refetch] = UseAsync(getUsers, []); // [] = [state, fetchUsers]
    const {loading, data: users, error} = state; // state.data를 users로 받기
    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!users) return null;
    return (
        <div>
            <ul>
                {users.map(user => <li key={user.id}>
                    {user.username} {user.name}</li>)}
            </ul>
            <button onClick={refetch}>재요청</button>
        </div>
    );
};

export default Users;