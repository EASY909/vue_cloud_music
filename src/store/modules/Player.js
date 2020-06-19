import {playMode} from "@/api/config";
const state = {
    fullScreen: false,// 播放器是否为全屏模式
    playing: false, // 当前歌曲是否播放
    sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
    playList: [],
    mode: playMode.sequence,// 播放模式
    currentIndex: -1,// 当前歌曲在播放列表的索引位置
    showPlayList: false,// 是否展示播放列表
    currentSong: {} 
}

const getters = {
    
}

const mutations = {
    changeFullScreen(state, value){
        state.fullScreen = value;
    },
    changePlayingState(state, value){
        state.playing = value;
    },
    changeSequecePlayList(state, value){
        state.sequencePlayList = value;
    },
    changePlayList(state, value){
        state.playList = value;
    },
    changePlayMode (state, value){
        state.mode = value;
    },
    changeCurrentIndex (state, value){
        state.currentIndex = value;
    },
    changePlayingState(state, value){
        state.playing = value;
    },
    changeShowPlayList(state, value){
        state.showPlayList = value;
    },
    changeCurrentSong(state, value){
        state.currentSong = value;
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}