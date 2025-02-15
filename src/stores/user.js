import { defineStore } from 'pinia';

export const useTypeStore = defineStore('type', {
  state: () => ({ type: true }),
  actions: {
    changeType(newType) {
      this.type = newType;
    }
  }
});

export const useScrollStore = defineStore('scroll', {
  state: () => ({
      scrollTop: true,
      scrollBottom: true,
      scrollContainer: null,
  }),
  actions: {
      changeScrollTop(newScrollTop) {
          this.scrollTop = newScrollTop;
      },
      changeScrollBottom(newScrollBottom) {
          this.scrollBottom = newScrollBottom;
      },
      setScrollContainer(container) {
          this.scrollContainer = container;
      },
      scrollToTop() {
          if (this.scrollContainer) {
              this.scrollContainer.scrollTo({
                  top: 0,
                  behavior:'smooth'
              });
          }
      },
  },
});