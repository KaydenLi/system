// import {
//     INIT_USER_INFO,
//     CLOSE_WELCOME,
//     INIT_AUTH_ABOUT_PROJECTS,
//     INIT_AUTH_APPLICATION_PROJECTS,
//     INIT_POST,
//     SET_ACTIVE_TAB,
//     SET_AUTH_STATUS,
//     SET_AAPLICATION_STATUS
// } from './mutations-type.js'

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