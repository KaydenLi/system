export default {
    initUserInfo(state, userinfo) {
        state.userInfo = userinfo;
    },
    closeWelcome(state) {
        state.userInfo.welcomeFlag = false;
    }
}