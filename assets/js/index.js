$(function () {
    // 调用getUserInfo获取用户的基本信息
    getUserInfo();

    $('#btnLogout').on('click', function () {
        var layer = layui.layer;
        layer.confirm('是否确认退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清空本地存储中的token
            localStorage.removeItem('token');
            // 2.跳转到登录页面
            location.href = '/login.html';

            // 关闭confirm询问框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        /* headers: {
            Authorization: localStorage.getItem('token') || ''
        }, */
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data);
        },

        
        // 挪到baseAPI里面去了
        // 无论成功与否，都会调用complete这个回调函数
        /* complete: function (res) {
            // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据

            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.强制清空token
                localStorage.removeItem('token');
                // 2.强制跳回到登录页面
                location.href='/login.html';
            }
        } */
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username;
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        /* attr() 方法设置或返回被选元素的属性和值。 */
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}