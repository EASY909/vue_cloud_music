import { getBannerRequest, getRecommendListRequest } from '@/api/cloudapi';
const state = {
    bannerList: [],
    recommendList: [],
    enterLoading:true
}
const getters = {
    bannerList: state => state.bannerList,
    recommendList: state => state.recommendList,
    enterLoading:state=>state.enterLoading
    // access_level: state => state.access_level
}

const mutations = {
    changeBannerList(state, value) {
        state.bannerList = value
    },
    changeRecommendList(state, value) {
        state.recommendList = value
    },
    changeEnterLoading(state,value){
        state.enterLoading=value;
    }
}
const actions = {
    getBannerList({ commit }) {
        return new Promise((resolve, reject) => {
            getBannerRequest().then(data => {
                commit("changeBannerList", data.banners);
                resolve(data.banners);
                
            }).catch(() => {
                reject("轮播图数据传输错误")
            })
        })
    },
    getRecommendList({ commit }) {
        return new Promise((resolve, reject) => {
            getRecommendListRequest().then(data => {
                commit("changeRecommendList", data.result);
                resolve(data.result);
            }).catch(() => {
                reject("推荐歌单数据传输错误")
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