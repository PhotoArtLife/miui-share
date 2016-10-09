var sosh = require('../js/index');
//取参数为对象字面量，配置分享的相关内容
sosh('#miui-share', {
    // 分享的链接，默认使用location.href
    // url: '',
    // 分享的标题，默认使用document.title
    // title: '',
    // 分享的摘要，默认使用<meta name="description" content="">content的值
    // digest: '',
    // 分享的图片，默认获取本页面第一个img元素的src
    // pic: '',
    // 选择要显示的分享站点，顺序同sites数组顺序，
    // 支持设置的站点有weixin,yixin,weibo,qzone,tqq,douban,renren,tieba
    sites: ['weixin', 'qzone','weibo','douban','renren','yixin', 'tqq','tieba',]
});
sosh('.share');