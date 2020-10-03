// 注意：每次调用ajax函数时都会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我么给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 再发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(options.url);
})