import { playMode } from "@/api/config";
import { findIndex } from '@/utils';// 注意引入工具方法
import { getSongDetailRequest } from "@/api/cloudapi"
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


        const fpIndex = findIndex(song, playList);
        playList.splice(fpIndex, 1);

        if (fpIndex < currentIndex) {
            currentIndex--;
        }
        const fsIndex = findIndex(song, sequenceList);
        sequenceList.splice(fsIndex, 1);

        state.playList = playList;
        state.sequencePlayList = sequenceList;
        state.currentIndex = currentIndex;

    },
    insertSong(state, value) {
        state.currentSong = value;
    },
    handleInsertSong(state, song) {
        const playList = JSON.parse(JSON.stringify(state.playList));
        const sequenceList = JSON.parse(JSON.stringify(state.sequencePlayList));
        let currentIndex = state.currentIndex;
        console.log(currentIndex);
        // 看看有没有同款
        const fpIndex = findIndex(song, playList);
        console.log(fpIndex);
        // 如果是当前歌曲直接不处理
        if (fpIndex === currentIndex && currentIndex !== -1) return;
        currentIndex++;
        // 把歌放进去，放到当前播放曲目的下一个位置
        playList.splice(currentIndex, 0, song);
        // 如果列表中已经存在要添加的歌，暂且称它 oldSong
        if (fpIndex > -1) {
            // 如果 oldSong 的索引在目前播放歌曲的索引小，那么删除它，同时当前 index 要减一
            if (currentIndex > fpIndex) {
                playList.splice(fpIndex, 1);
                currentIndex--;
            } else {
                // 否则直接删掉 oldSong
                playList.splice(fpIndex + 1, 1);
            }
        }
        // 同理，处理 sequenceList
        let sequenceIndex = findIndex(playList[currentIndex], sequenceList) + 1;
        let fsIndex = findIndex(song, sequenceList);
        // 插入歌曲
        sequenceList.splice(sequenceIndex, 0, song);
        if (fsIndex > -1) {
            // 跟上面类似的逻辑。如果在前面就删掉，index--; 如果在后面就直接删除
            if (sequenceIndex > fsIndex) {
                sequenceList.splice(fsIndex, 1);
                sequenceIndex--;
            } else {
                sequenceList.splice(fsIndex + 1, 1);
            }
        }

        state.playList = playList;
        state.sequencePlayList = sequenceList;
        state.currentIndex = currentIndex;


    }
}

const actions = {
    getSongDetail({ commit }, id) {
        return new Promise((resolve, reject) => {
            getSongDetailRequest(id).then(data => {
                let song = data.songs[0];
                commit("handleInsertSong", song);
                resolve(song);
            }).catch(() => {
                reject("插入歌曲失败")
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