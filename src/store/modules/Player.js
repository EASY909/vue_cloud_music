import { playMode } from "@/api/config";
import { findIndex } from '@/utils';// 注意引入工具方法
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
    changeFullScreen(state, value) {
        state.fullScreen = value;
    },
    changePlayingState(state, value) {
        state.playing = value;
    },
    changeSequecePlayList(state, value) {
        state.sequencePlayList = value;
    },
    changePlayList(state, value) {
        state.playList = value;
    },
    changePlayMode(state, value) {
        state.mode = value;
    },
    changeCurrentIndex(state, value) {
        state.currentIndex = value;
    },
    changePlayingState(state, value) {
        state.playing = value;
    },
    changeShowPlayList(state, value) {
        state.showPlayList = value;
    },
    changeCurrentSong(state, value) {
        state.currentSong = value;
    },
    handleDeleteSong(state, song) {
        const playList = JSON.parse(JSON.stringify(state.playList));
        const sequenceList = JSON.parse(JSON.stringify(state.sequencePlayList));
        let currentIndex = state.currentIndex;
        // console.log(song);
        console.log(currentIndex);
        const fpIndex = findIndex(song, playList);
        console.log(fpIndex);
        // console.log(fpIndex);
        playList.splice(fpIndex, 1);

        if (fpIndex < currentIndex) {
            currentIndex--;
            console.log("---");
        }
        const fsIndex = findIndex(song, sequenceList);
        sequenceList.splice(fsIndex, 1);

        state.playList = playList;
        state.sequencePlayList = sequenceList;
        state.currentIndex = currentIndex;

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