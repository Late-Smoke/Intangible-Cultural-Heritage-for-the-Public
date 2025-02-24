import { defineStore } from 'pinia';

export const usePositionStore = defineStore('position', {
  state: () => ({
    latitude: null,
    longitude: null,
  }), 
  actions: {
   changeLatitude(newLatitude) {
    this.latitude = newLatitude;
   },
   changeLongitude(newLongitude) {
    this.longitude = newLongitude; 
   } 
  }
})

export const useTypeStore = defineStore('type', {
  state: () => ({ type: true }),
  actions: {
    changeType(newType) {
      this.type = newType;
    }
  }
});

export const usePasswordStore = defineStore('password', {
  state: () => ({
    phone: '',
    code: null,
  }), 
  actions: {
   changePassword(newPassword) {
    this.password = newPassword;
   }, 
   changeCode(newCode) {
    this.code = newCode; 
   },
   changePhone(newPhone) {
    this.phone = newPhone; 
   }
  }
})

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

export const useActivityStore = defineStore('activity', {
  state: () => ({
    show: false,
    position: '全国',
    time: '全部时间',
  }), 
  actions: {
   changeShow(show) {
    this.show = show; 
   },
   changePosition(position) {
    this.position = position;
   }, 
   changeTime(time) {
    this.time = time;
   },
  }
})