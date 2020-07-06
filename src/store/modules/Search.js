import { getHotKeyWordsRequest, getSuggestListRequest, getResultSongsListRequest } from '@/api/cloudapi';
const state = {
    hotList: [], // 热门关键词列表
    suggestList: [],// 列表，包括歌单和歌手
    songsList: [],// 歌曲列表
    enterLoading: false
}
const getters = {

}

const mutations = {
    changeHotList(state, value) {
        state.hotList = value
    },
    changeSuggestList(state, value) {
        state.suggestList = value
    },
    changeSongsList(state, value) {
        state.songsList = value
    },
    changeEnterLoading(state, value) {
        state.enterLoading = value
    },
}
const actions = {
    getHotKeyWords({ commit }) {
        return new Promise((resolve, reject) => {
            getHotKeyWordsRequest().then(data => {
                let list = data.result.hots;

                commit("changeHotList", list);

                resolve(list);
            }).catch(() => {
                reject("获取 搜索关键词 数据失败")
            })
        })
    },
    getSuggestList({ commit }, query) {
        return new Promise((resolve, reject) => {
            getSuggestListRequest(query).then(data => {
                if (!data) return;
                let res = data.result || [];
                commit("changeSuggestList", res);
                resolve(res);
            }).catch(() => {
                reject("获取 歌单和歌手 数据失败")
            })
        })
    },
    getSongList({ commit }, query) {
        return new Promise((resolve, reject) => {
            getResultSongsListRequest(query).then(data => {
                if (!data) return;
                let res = data.result.songs || [];
                commit("changeSongsList", res);
                commit("changeEnterLoading", false);
                resolve(res);
            })
        })
    },
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}