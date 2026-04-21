import { create, type StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


interface IActions {
    increment: () => void;
    decrement: () => void;
    // reset: () => void;
}

interface IInitialState {
    count: number;
}

interface ICounterState extends IInitialState, IActions { }

const intialState: IInitialState = {
    count: 0,
}

const counterStore: StateCreator<ICounterState> = (set) => ({
    ...intialState,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
})

const useCounterStore = create<ICounterState>()(
    persist(
        counterStore,
        {
            name: 'counter-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// Селекторы для вызова
export const useCounter = () => useCounterStore((state) => state.count)
export const incrementCounter = () => useCounterStore.getState().increment()
export const decrementCounter = () => useCounterStore.getState().decrement()
// export const useReset = () => useCounterStore((state) => state.reset)