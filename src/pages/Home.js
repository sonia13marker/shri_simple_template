import { TodoList } from "../components/TodoList";
import React from 'react';

export const Home = () => {
    return (
        <>
            <h1 data-testid="page-title">Home</h1>
            <p>This is the list.</p>
            <TodoList />
            <h2>Проверка 2</h2>
        </>
    );
};
