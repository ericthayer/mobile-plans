import { defineStore } from 'pinia'
import { type ToDoList } from '../types'

const useToDoListStore = defineStore('ToDoListStore', {
  state: () => ({
    toDoList: [] as ToDoList[]
  }),
  actions: {
    setList(items: [{ description: string, completed: boolean }]) {
      this.toDoList = items
    }
  },
  getters: {
    getList: (state) => {
      if(state.toDoList.length == 0) {
        const list = [
          {
            description: 'list item',
            completed: false
          },
          {
            description: 'list item',
            completed: false
          },
          {
            description: 'list item',
            completed: false
          },
          {
            description: 'list item',
            completed: false
          }
        ]
        return list as [{ description: string, completed: boolean }]
      } else {
        return state.toDoList as []
      }
    }
  }
})

export default useToDoListStore
