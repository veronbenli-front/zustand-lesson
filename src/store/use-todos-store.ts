import { create, type StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'


interface ITodo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

interface IActions {
    fetchTodos: () => Promise<void>;
    completeTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

interface IInitialState {
    todos: ITodo[];
    isLoading: boolean;
}

interface ITodoState extends IInitialState, IActions { }

const initialState: IInitialState = {
    todos: [],
    isLoading: false,
}

const todoStore: StateCreator<ITodoState,
    [ ['zustand/immer', unknown], ['zustand/devtools', unknown], ['zustand/persist', unknown] ]
> = (set) => ({
    ...initialState,
    fetchTodos: async () => {
        set({ isLoading: true }, false, 'fetchTodos');

        try {
            const response = await fetch('https://dummyjson.com/todos?limit=10&skip=0');
            const data = await response.json();
            set({ todos: data.todos }, false, 'fetchTodos/success');
        } catch (error) {
            console.error(error);
            set({ todos: [] }, false, 'fetchTodos/failure');
        } finally {
            set({ isLoading: false }, false, 'fetchTodos/finally');
        }
    },
    completeTodo: (id: number) => {
        set((state) => {
                const todo = state.todos.find((todo: ITodo) => todo.id === id);
                if (todo){todo.completed = !todo.completed};
        }, false, 'completeTodo');
    },
    deleteTodo: (id: number) => {
        set((state) => {
            const index = state.todos.findIndex((todo: ITodo) => todo.id === id);
            if(index === -1) return state;
            state.todos.splice(index, 1);
        }, false, 'deleteTodo');
    }

})

const useTodosStore = create<ITodoState>()(
    immer(
        devtools(
        persist(
            todoStore,
            {
                name: 'todos-storage',
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({ todos: state.todos }),
            }
        )
    )
    )
);

// Селекторы для вызова
export const useTodos = () => useTodosStore((state) => state.todos);
export const useIsLoading = () => useTodosStore((state) => state.isLoading);
export const fetchTodos = () => useTodosStore.getState().fetchTodos();
export const completeTodo = (id: number) => useTodosStore.getState().completeTodo(id);
export const deleteTodo = (id: number) => useTodosStore.getState().deleteTodo(id);

