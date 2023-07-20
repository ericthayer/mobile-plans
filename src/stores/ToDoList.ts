// import { ToDoList } from './../types';
import { defineStore } from 'pinia'
import { type ToDoList } from '../types'

const useToDoListStore = defineStore('toDoListStore', {
  state: () => ({
    toDoList: [] as ToDoList[]
  }),
  actions: {
    setList() {
      const list = [
        {
          description: 'Fix TypeScript errors',
          completed: true
        },
        {
          description: 'Fix TypeScript errors',
          completed: false
        },
        {
          description: 'Fix TypeScript errors',
          completed: false
        },
        {
          description: 'Fix TypeScript errors',
          completed: false
        }
      ] 
      this.toDoList = list
    }
  },
  getters: {
    getList: (state) => {
      const list = state.toDoList
      return list
    }
  },
})

export default useToDoListStore
