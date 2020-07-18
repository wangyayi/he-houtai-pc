//工具封装模块，提供操作本地用户信息的相关函数

//sessionStorage进行存储，
// setItem("键名"，“具体数据，必须是字符串”)
//getItem('键名')
// removeItem('键名')
const Key = 'hm-toutiao-pc'
//保存用户信息
// @param{Object}user --使用户信息对象
const setUser = user => {
    window.sessionStorage.setItem(Key, JSON.stringify(user))
}


//获取用户信息
const getUser = () => {
    const localUser = window.sessionStorage.getItem(Key)
    //localUser的值有两种情况，用户信息json字符串，或者还没有存的时候，拿的是null
    //不能将null返回出去，容易发生报错（当返回为空，还在用user.token等操作这样取数据的时候，会报错）
    //如果为null，返回空对象{}
    return JSON.parse(localUser || '{}')
}


//删除用户信息
const delUser = () => {
    window.sessionStorage.removeItem(Key)
}
//导出函数即可
export default {
    setUser, getUser, delUser
}