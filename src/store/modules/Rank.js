import { getRankListRequest } from '@/api/cloudapi';
const state = {
    rankList: [],
    loading: true
}
const getters = {
    rankList: state => state.rankList,
    loading: state => state.loading
}

const mutations = {
    changeRankList(state, value) {
        state.rankList = value;
    },
    changeLoading(state, value) {
        state.loading = value;
    }

}
const actions = {
    getRankList({ commit }) {
        return new Promise((resolve, reject) => {
            getRankListRequest().then(data => {
                let list = data && data.list;
                commit("changeRankList",list);
                commit("changeLoading",false);
                console.log(list);
                resolve(list);

            }).catch(() => {
                reject("排行榜数据传输错误")
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}