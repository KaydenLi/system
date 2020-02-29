export default {
    _id: "0011",
    userName: "KaydeLi",
    toQuest: [//用户正在请求查看的项目
        {
            _id: "01",
            user_id: "0002",
            userName: "kayden",
            project_id: "1",
            address: "湖北省武汉市洪山区华中科技大学",
            projectName: "某教学楼",
            date: "2020-02-02",
            status: "waitting",
            authdate: "",
            description: "申请用于项目建设期的安全监测和使用期的健康管理。",
        },
        {
            _id: "02",
            user_id: "0002",
            userName: "Jobs",
            address: "江苏省连云港市",
            project_id: "1",
            projectName: "某办公楼",
            date: "2020-02-02",
            status: "waitting",
            authdate: "2020-03-03",
            description: "申请用于项目建设期的安全监测和使用期的健康管理。",
        },
        {
            _id: "03",
            user_id: "0002",
            userName: "Smith",
            project_id: "1",
            address: "云南省宣威市",
            projectName: "某超高层建筑",
            date: "2020-02-02",
            status: "waitting",
            authdate: "",
            description: "测试",
        },
    ],
    getAuthed: [//用户已获得授权的项目
        {
            _id: "3",
            user_id: "0002",
            userName: "kayden",
            project_id: "1",
            address: "wuhan hust",
            projectName: "测试项目-已获取授权-1",
            date: "2020-02-02",
            status: "success",
            authdate: "2020-02-03",
            description: "测试已获得授权项目1",
        },
        {
            _id: "4",
            user_id: "0002",
            userName: "kayden",
            project_id: "1",
            address: "wuhan hust",
            projectName: "测试项目-已获取授权-2",
            date: "2020-02-02",
            status: "fail",
            authdate: "2020-02-03",
            description: "测试已获得授权项目2。",
        },
    ]
}