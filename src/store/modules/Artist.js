import { getSingerInfoRequest  } from '@/api/cloudapi';
const state = {
    artist: {},
    loading:true,
    songsOfArtist:[]
}
const getters = {
    artist: state => state.artist,
    loading:state=>state.loading,
    songsOfArtist:state=>state.songsOfArtist,
    // access_level: state => state.access_level
}

const mutations = {
    changeArtist (state, value) {
        state.artist = value
    },
    changeSongs (state,value){
        state.songsOfArtist=value;
    },
    changeEnterLoading (state,value){
        state.loading=value;
    }
}
const actions = {
    getSingerInfo({ commit },id) {
        return new Promise((resolve, reject) => {
            getSingerInfoRequest(id).then(data   => {
                commit("changeArtist",data.artist);
                commit("changeSongs",data.hotSongs);
                commit("changeEnterLoading", false);
                resolve(data);
            }).catch(() => {
                reject("获取 artist 数据失败")
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