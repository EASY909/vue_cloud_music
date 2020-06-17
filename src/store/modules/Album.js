import { getAlbumDetailRequest } from '@/api/cloudapi';
const state = {
    currentAlbum: {},
    enterLoading:true
}
const getters = {
    currentAlbum: state => state.currentAlbum,
    enterLoading:state=>state.enterLoading
    // access_level: state => state.access_level
}

const mutations = {
    changeCurrentAlbum (state, value) {
        state.currentAlbum = value
    },
    changeEnterLoading(state,value){
        state.enterLoading=value;
    }
}
const actions = {
    getAlbumDetailRequest ({ commit },id) {
        return new Promise((resolve, reject) => {
            getAlbumDetailRequest(id).then(res  => {
                let data = res.playlist;
                commit("changeCurrentAlbum", data);
                commit("changeEnterLoading", false);
                resolve(data);
            }).catch(() => {
                reject("获取 album 数据失败")
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