export default {
    initUserInfo(state, userinfo) {
        state.userInfo = userinfo;
    },
    closeWelcome(state) {
        state.userInfo.welcomeFlag = false;
    },
    initAuthAboutProjects(state, projects) {
        state.authAboutProjects = projects;
    },
    initPosts(state, posts) {
        state.posts = posts;
    }
}