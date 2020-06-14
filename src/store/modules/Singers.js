import { getHotSingerListRequest, getSingerListRequest } from '@/api/cloudapi';
const state = {
    singerList: [],
    enterLoading: true,
    pullUpLoading: false,
    pullDownLoading: false,
    pageCount: 0
}
const getters = {
    singerList: state => state.singerList,
    enterLoading: state => state.enterLoading,
    pullUpLoading: state => state.pullUpLoading,
    pullDownLoading: state => state.pullDownLoading,
    pageCount: state => state.pageCount
}

const mutations = {
    changeSingerList(state, value) {
        state.singerList = value
    },
    changeEnterLoading(state, value) {
        state.enterLoading = value
    },
    changePullUpLoading(state, value) {
        state.pullUpLoading = value;
    },
    changePullDownLoading(state, value) {
        state.pullDownLoading = value;
    },
    changePageCount(state, value) {
        state.pageCount = value;
    }
}
const actions = {
    //第一次加载热门歌手
    getHotSingerList ({ commit,getters}) {
        return new Promise((resolve, reject) => {
            getHotSingerListRequest(0).then(res => {
                const data = res.artists;
                commit("changeSingerList", data);
                commit("changeEnterLoading", false);
                commit("changePullDownLoading", false);
                resolve(data);
            }).catch(() => {
                reject("热门歌手数据获取失败")
            })
        })
    },
    //加载更多热门歌手
    refreshMoreHotSingerList ({ commit ,getters}) {
        const pageCount=getters.pageCount;
        const singerList=getters.singerList;
        return new Promise((resolve, reject) => {
            getHotSingerListRequest(pageCount).then(res  => {
                const data = [...singerList, ...res.artists];
                console.log(data);
                console.log(res);
                commit("changeSingerList", data);
                commit("changePullDownLoading", false);
                resolve(data);
            }).catch(() => {
                reject("热门歌手数据获取失败")
            })
        })
    },
    //第一次加载对应类别的歌手
    getSingerList({ commit ,getters},reqData) {
        let {category, alpha}=reqData;

        return new Promise((resolve, reject) => {
            getSingerListRequest(category, alpha, 0).then(res  => {
                const data = res.artists;
                commit("changeSingerList", data);
                commit("changePullDownLoading", false);
                commit("changeEnterLoading", false);
                resolve(data);
            }).catch(() => {
                reject("歌手数据获取失败")
            })
        })
    },
    //加载更多歌手
    refreshMoreSingerList ({ commit ,getters},reqData) {
        let {category, alpha}=reqData;
        const pageCount=getters.pageCount;
        const singerList=getters.singerList;
        return new Promise((resolve, reject) => {

            getSingerListRequest(category, alpha, pageCount).then(res  => {
                const data = [...singerList, ...res.artists];
                commit("changeSingerList", data);
                commit("changePullUpLoading", false);
                resolve(data);
            }).catch(() => {
                reject("歌手数据获取失败")
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