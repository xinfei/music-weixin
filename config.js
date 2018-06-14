/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：www.qcloud.com/solution/la

// var imgUrl ='mjw.citgroup.cn/mapImages/image';

// var host = "mjw.citgroup.cn";
/**
 * dev
 */
// var host='http://lgh.citgroup.cn';
/**
 * prod
 */
// var host = 'https://lgh.citgroup.cn';
// 阿里云
// const host = 'http://47.104.175.209:8083';
// const host = 'http://localhost:8083';
// 网易云
const host = 'https://neteasemusic.leanapp.cn'
const config = {
    // 主机
    host: `${host}`,
    // 根据搜索关键词获取歌曲列表
    // getMusicList: `${host}/kugou/list`,
    getMusicList: `${host}/search`,
    // 根据歌曲filehash播放歌曲
    // playMusic: `${host}/kugou/music`,
    playMusic: `${host}/music/url`,

    // 下面的地址配合云端 Server 工作
    // host,
     shilinHost: `${host}/`,
    //酒店列表接口
     hotelList: `${host}/phone/api/hotel/index`,
    //酒店详情接口
     hotelShow: `${host}/phone/api/hotel/show/`,
    //酒店下单接口
     hotelOrder: `${host}/phone/api/login/create`,
    //门票列表接口
     spotList: `${host}/phone/api/spot/index`,
    //门票详情接口
     spotShow: `${host}/phone/api/spot/show/`,
    //门票下单接口
     spotOrder: `${host}/phone/api/login/spotCreate`,
    //支付接口
    orderPay: `${host}/phone/wxpay/weixinpay`,
    //登陆接口
    ecLogin: `${host}/phone/member/login/wx_login`,
    //个人订单接口
    myOrder: `${host}/phone/api/order/list/`,

    //数据接口调用
    apiBase: `${host}`,

    // 登录地址，用于建立会话
    loginUrl: `${host}/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/testRequest`,

    // 用code换取openId
    openIdUrl: `${host}/openid`,

    // 测试的信道服务接口
    tunnelUrl: `${host}/tunnel`,

    // 生成支付订单的接口
    paymentUrl: `${host}/payment`,

    // 发送模板消息接口
    templateMessageUrl: `${host}/templateMessage`,

    // 上传文件接口
    uploadFileUrl: `${host}/upload`,

    // 下载示例图片接口
    downloadExampleUrl: `${host}/static/weapp.jpg`
};

module.exports = config
