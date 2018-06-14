//index.js
//获取应用实例
var Common = require('../../common')

var app = getApp()
Page({
  data: {
    id: "",
    name: "",
    src: "",
    poster: "",
    author: "",
    isplaying: true,
    islyric: false,
    sumduration: 0,
    lyricobj: {},
    lyricArr: [],
    isadd: false,
    items: [
      { name: 'recent', value: '最近' },
      { name: 'like', value: '我的收藏' }
    ],
    percent: '100%'
  },
  addsong: function () {
    this.setData({
      percent: '0'
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      percent: '100%'
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  showCircle: function () {
    this.setData({
      islyric: true,
      percent: '100%'
    })
  },
  showlyric: function () {
    this.setData({
      islyric: false,
      percent: '100%'
    })
  },
  onLoad: function () {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    // Common.playMusic(this.data.mp3Url, this.data.name, this.data.picUrl);
    // console.log('正在播放 onLoad')
    // var that = this
    // wx.setNavigationBarTitle({
    //   title: '正在播放'
    // })
    // this.audioPlay()
    // wx.playBackgroundAudio({
    //   dataUrl: this.data.src
    // })
  },
  onShow: function () {
    let that = this;
    Common.asyncGetStorage('clickdata')//本地缓存
      .then(data => {
        // console.log(data)
        if (!data) return;
        that.setData({
          id: data.id,
          name: data.name,
          src: data.mp3Url,
          poster: data.picUrl,
          author: data.singer
        })
        return Common.playMusic(data.mp3Url,  data.name, data.picUrl);
      })
      .then(status => {
        if(!status) return;
        wx.hideLoading();
        console.log('id,',that.data.id)
        return Common.getlyric(that.data.id)
      })
      .then((lyricArr) => {
        console.log('lyricArr',lyricArr)
        that.setData({
          lyricArr: lyricArr
        })
        return Common.getMusicData()
      })
      .then(data => {
        let tempduration = data.duration
        console.log('get bg success', tempduration, data)
        // 设置时长
        that.setData({
          sumduration: tempduration
        })
      })
  },
  audioPlay: function () {
    //背景音乐信息
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = '许巍'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
    Common.getlyric(this.data.id).then((lyricArr) => {
      this.setData({
        lyricArr: lyricArr
      })
      return Common.getMusicData()
    }).then(data => {
      let tempduration = data.duration
      // 设置时长
      this.setData({
        sumduration: tempduration
      })
    })
    this.setData({
      isplaying: true
    })
  },
  audioPause: function () {
    wx.pauseBackgroundAudio()
    this.setData({
      isplaying: false
    })
  },
  audio14: function () {

  },
  audioStart: function () {

  },
  slider3change: function (e) {
    sliderToseek(e, function (dataUrl, cal) {
      wx.playBackgroundAudio({
        dataUrl: dataUrl
      })
      wx.seekBackgroundAudio({
        position: cal
      })
    })

  },
  prev: function () {
    prevSong(this)
  }
})
// 上一曲
function prevSong(that) {
  let id = that.data.id
  console.log('id', id)
  wx.getStorage({
    key: 'searchReault',
    success: function (res) {
      console.log(res.data)
      let currentSongIndex = res.data.findIndex((item) => {
        return item.id == id;
      })
      console.log(currentSongIndex)
      currentSongIndex--;
      console.log(res.data[currentSongIndex])
      wx.playBackgroundAudio({
        dataUrl: res.data[currentSongIndex].mp3Url
      })
      wx.switchTab({
        url: '../now/index'
      })

    }
  })
}
//滑动 歌曲快进
function sliderToseek(e, cb) {
  wx.getBackgroundAudioPlayerState({
    success: function (res) {
      var dataUrl = res.dataUrl
      var duration = res.duration
      let val = e.detail.value
      let cal = val * duration / 100
      cb && cb(dataUrl, cal);
    }
  })
}
// 获取歌词
function getlyric(id, cb) {
  console.log('id:', id)
  let url = `http://neteasemusic.leanapp.cn/lyric`
  wx.request({
    url: url,
    data: {
      id: id
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      // success
      if (!res.data.lrc.lyric) return false;
      let lyric = res.data.lrc.lyric
      let timearr = lyric.split('[')
      let obj = {}
      let lyricArr = []
      // seek 为键  歌词为value
      timearr.forEach((item) => {
        let key = parseInt(item.split(']')[0].split(':')[0]) * 60 + parseInt(item.split(']')[0].split(':')[1])
        let val = item.split(']')[1]
        obj[key] = val
      })
      for (let key in obj) {
        // obj[key] = obj[key].split('\n')[0]
        lyricArr.push(obj[key])
      }
      cb && cb(obj, lyricArr)
    },
    fail: function (res) {
      // fail
    },
    complete: function (res) {
      // complete
    }
  })
}
// ----------------------------------------------------
