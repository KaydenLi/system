import {
    INIT_USER_INFO,
    CLOSE_WELCOME,
    INIT_AUTH_ABOUT_PROJECTS,
    INIT_APPLICATION_ABOUT_PROJECTS,
    INIT_POSTS,
    SET_ACTIVE_TAB,
    SET_AUTH_STATUS,
    SET_APPLICATION_STATUS,
    TOOGLE_SIDE_BAR
} from './mutations-type.js'

export default {
    [INIT_USER_INFO](state, userinfo) {
        state.userInfo = userinfo;
    },
    [CLOSE_WELCOME](state) {
        state.userInfo.welcomeFlag = false;
    },
    [INIT_AUTH_ABOUT_PROJECTS](state, projects) {
        state.authProjects = projects;
    },
    [INIT_APPLICATION_ABOUT_PROJECTS](state, projects) {
        state.applicationProjects = projects;
    },
    [INIT_POSTS](state, posts) {
        state.posts = posts;
    },
    [SET_ACTIVE_TAB](state, activeValue) {
        state.activeTab = activeValue;
    },
    [SET_AUTH_STATUS](state, status = true) {
        state.authProjects.updated = status
    },
    [SET_APPLICATION_STATUS](state, status = true) {
        state.applicationProjects.updated = status
    },
    [TOOGLE_SIDE_BAR](state) {
        state.toogleSideBar = !state.toogleSideBar;
    }

}