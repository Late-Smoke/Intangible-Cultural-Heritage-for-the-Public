import { defineStore } from 'pinia';

export const useTypeStore = defineStore('type', {
  state: () => ({ type: true }),
  actions: {
    changeType(newType) {
      this.type = newType;
    }
  }
});