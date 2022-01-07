import {
    apiBase
} from "../api/base"
import wx from 'weixin-js-sdk'

var wxshare = function (that, shareTitle, shareLink, shareDesc, shareImg) {
    let code = apiBase().wxsharecode
    let url = window.location.href.split('#')[0]
    if (!shareTitle) {
        shareTitle = "xx"
    }
    if (!shareLink) {
        shareLink = apiBase().url
    }
    if (!shareImg) {
        shareImg = ''
    }
    if (!shareDesc) {
        shareDesc = "xx"
    }

    if (that.$utils.isNull(that.$store.state.wx.appId)) {
        that.$api.post(apiBase().wxapi + '/wechat/getWxconfig', {
            accountCode: code,
            urlpath: url
        }, r => {
            if (r.retCode == "000000") {
                that.$store.state.wx.appId = r.apiResult.appid
                that.$store.state.wx.timestamp = r.apiResult.ret.timestamp
                that.$store.state.wx.nonceStr = r.apiResult.ret.nonceStr
                that.$store.state.wx.signature = r.apiResult.ret.signature
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: r.apiResult.appid, // 必填，公众号的唯一标识
                    timestamp: r.apiResult.ret.timestamp, // 必填，生成签名的时间戳
                    nonceStr: r.apiResult.ret.nonceStr, // 必填，生成签名的随机串
                    signature: r.apiResult.ret.signature, // 必填，签名，见附录1
                    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }
        })
    } else {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: that.$store.state.wx.appId, // 必填，公众号的唯一标识
            timestamp: that.$store.state.wx.timestamp, // 必填，生成签名的时间戳
            nonceStr: that.$store.state.wx.nonceStr, // 必填，生成签名的随机串
            signature: that.$store.state.wx.signature, // 必填，签名，见附录1
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }
    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: shareTitle, // 分享标题
            link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareImg, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                that.$store.state.wx.appId = ""
                that.$toast('分享成功！');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                that.$toast('取消分享！');
            }
        });
        wx.onMenuShareAppMessage({
            title: shareTitle, // 分享标题
            desc: shareDesc, // 分享描述
            link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareImg, // 分享图标
            type: "", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                that.$store.state.wx.appId = ""
                that.$toast('分享成功！');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                that.$toast('取消分享！');
            }
        });
        wx.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
    });
}

export default wxshare