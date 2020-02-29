export default {
    initUserInfo(state, userinfo) {
        state.userInfo = userinfo;
    },
    closeWelcome(state) {
        state.userInfo.welcomeFlag = false;
    },
    initAuthAboutProjects(state, projects) {
        state.authProjects = projects;
    },
    initApplicationAboutProjects(state, projects) {
        state.applicationProjects = projects;
    },
    initPosts(state, posts) {
        state.posts = posts;
    },
    setActiveTab(state, activeValue) {
        state.activeTab = activeValue;
    },
    setAuthStatus(state, status = true) {
        state.authProjects.updated = status
    },
    setApplicationStatus(state, status = true) {
        state.applicationProjects.updated = status
    }

}