import { defineStore } from "pinia";

export const usePositionStore = defineStore("position", {
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
    },
  },
  persist: true,
});

export const useTypeStore = defineStore("type", {
  state: () => ({ type: true }),
  actions: {
    changeType(newType) {
      this.type = newType;
    },
  },
});

export const usePasswordStore = defineStore("password", {
  state: () => ({
    phone: "",
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
    },
  },
});

export const useScrollStore = defineStore("scroll", {
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
          behavior: "smooth",
        });
      }
    },
  },
});

export const useActivityStore = defineStore("activity", {
  state: () => ({
    show: false,
    position: "全国",
    time: "全部时间",
    ifPage: false,
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
    changeIfPage(ifPage) {
      this.ifPage = ifPage; 
    }
  },
});

export const useSearchStore = defineStore("search", {
  state: () => ({
    search: "",
    ifSearch: false,
    ifHistory: false,
  }),
  actions: {
    changeSearch(search) {
      this.search = search;
    },
    changeIfSearch(ifSearch) {
      this.ifSearch = ifSearch; 
    },
    changeIfHistory(ifHistory) {
      this.ifHistory = ifHistory; 
    }
  },
});

export const useDataStore = defineStore("data", {
  state: () => ({
    relatedPost: [],
  }), 
  actions: {
    changeRelatedPost(relatedPost) {
      this.relatedPost = relatedPost;
    }, 
  }
});

export const useHistoryStore = defineStore('history', {
  state: () => ({
    historyRecords: [], // 初始化为一个空数组
  }),
  actions: {
    changeHistoryRecords(historyRecords) {
      this.historyRecords = historyRecords; // 更新 historyRecords
    },
  },
  persist: true,
});