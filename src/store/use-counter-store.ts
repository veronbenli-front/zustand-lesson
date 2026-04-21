import { create, type StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'


interface IActions {
    increment: () => void;
    decrement: () => void;
    // reset: () => void;
}

interface IInitialState {
    count: number;
}

interface ICounterState extends IInitialState, IActions { }

const initialState: IInitialState = {
    count: 0,
}

const counterStore: StateCreator<ICounterState,
    [['zustand/devtools', unknown], ['zustand/persist', unknown]]
> = (set) => ({
    ...initialState,
    increment: () => set((state) => ({ count: state.count + 1 }), false, 'increment'),
    decrement: () => set((state) => ({ count: state.count - 1 }), false, 'decrement'),
})

const useCounterStore = create<ICounterState>()(
    devtools(
        persist(
            counterStore,
            {
                name: 'counter-storage',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);

// Селекторы для вызова
export const useCounter = () => useCounterStore((state) => state.count)
export const incrementCounter = () => useCounterStore.getState().increment()
export const decrementCounter = () => useCounterStore.getState().decrement()
// export const useReset = () => useCounterStore((state) => state.reset)