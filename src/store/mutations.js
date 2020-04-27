import {
    INIT_USER_INFO,
    INIT_PROJECTS,
    CLOSE_WELCOME,
    INIT_AUTH_ABOUT_PROJECTS,
    INIT_APPLICATION_ABOUT_PROJECTS,
    INIT_POSTS,
    SET_ACTIVE_TAB,
    TOOGLE_SIDE_BAR,
    INIT_CURRENT_PROJECT,
    INIT_CURRENT_PROJECT_INFO,
    INIT_3D_DATAS
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
        if (projects.toCheck == null) {
            state.authProjects.getChecked = projects.getChecked;
        }
        else if (projects.getChecked == null) {
            state.authProjects.toCheck = projects.toCheck;
        } else {
            state.authProjects.toCheck = projects.toCheck;
            state.authProjects.getChecked = projects.getChecked;

        }
    },
    [INIT_APPLICATION_ABOUT_PROJECTS](state, projects) {
        if (projects.toQuest == null) {
            state.applicationProjects.getAuthed = projects.getAuthed;
        }
        else if (projects.getAuthed == null) {
            state.applicationProjects.toQuest = projects.toQuest;
        }
        else {
            state.applicationProjects.toQuest = projects.toQuest;
            state.applicationProjects.getAuthed = projects.getAuthed;

        }
    },
    [INIT_POSTS](state, posts) {
        state.posts = posts;
    },
    [SET_ACTIVE_TAB](state, activeValue) {
        state.activeTab = activeValue;
    },
    [TOOGLE_SIDE_BAR](state) {
        state.toogleSideBar = !state.toogleSideBar;
    },
    [INIT_CURRENT_PROJECT](state, project) {
        state.project = project;
    },
    [INIT_CURRENT_PROJECT_INFO](state, projectInfo) {
        state.projectInfo = projectInfo;
    },
    [INIT_3D_DATAS](state, data) {
        state.threeDatas = [];
        if (data.length === 0) return;
        data.forEach(planes => {
            if (planes.length === 0) return;
            let plane = planes.name;
            planes.children.forEach(sites => {
                if (sites.length === 0) return;
                let site = sites.name;
                let machineinfo = sites.machineinfo;
                sites.value.forEach(points => {
                    let tmp = {};
                    tmp.ratio = points.ratio;
                    tmp.name = points.name;
                    tmp.type = points.type;
                    tmp.position = points.position;
                    tmp.unit = points.unit;
                    tmp.value = points.value[0];
                    tmp.group = points.group;
                    tmp.site = site;
                    tmp.machineinfo = machineinfo;
                    tmp.plane = plane;
                    state.threeDatas.push(tmp);
                });
            });
        });
    }
}