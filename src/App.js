import { createGlobalStyle } from 'styled-components';
import './App.css';
import TodoCreate from './components/TodoCreate';
import TodoHeader from './components/TodoHeader';
import TodoItem from './components/TodoItem';
import TodoTemplate from './components/TodoTemplate';
import TodoContext from './hooks/TodoContext';

// 글로벌 스타일 추가하고 싶을 때 (스타일된 컴포넌트)
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;
function App() {
  return (
      <TodoContext>
        <GlobalStyle/>
        <TodoTemplate>
          <TodoHeader/>
          <TodoItem/>
          <TodoCreate/>
        </TodoTemplate>
      </TodoContext>
  );
}

export default App;
