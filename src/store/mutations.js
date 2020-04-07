import {
    INIT_USER_INFO,
    INIT_PROJECTS,
    CLOSE_WELCOME,
    INIT_AUTH_ABOUT_PROJECTS,
    INIT_APPLICATION_ABOUT_PROJECTS,
    INIT_POSTS,
    SET_ACTIVE_TAB,
    SET_AUTH_STATUS,
    SET_APPLICATION_STATUS,
    TOOGLE_SIDE_BAR,
    INIT_CURRENT_PROJECT,
    INIT_CURRENT_PROJECT_INFO
} from './mutations-type.js'

export default {
    [INIT_USER_INFO](state, userinfo) {
        state.userInfo = userinfo;
    },
    [INIT_PROJECTS](state, projects) {
        state.projects = projects;
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
        state.authProjects.updated = status;
    },
    [SET_APPLICATION_STATUS](state, status = true) {
        state.applicationProjects.updated = status;
    },
    [TOOGLE_SIDE_BAR](state) {
        state.toogleSideBar = !state.toogleSideBar;
    },
    [INIT_CURRENT_PROJECT](state, project) {
        state.project = project;
    },
    [INIT_CURRENT_PROJECT_INFO](state, projectInfo) {
        state.projectInfo = projectInfo;
    }
}