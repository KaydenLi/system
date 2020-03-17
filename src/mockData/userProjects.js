export default {
    _id: "001",
    user_id: "820807451",
    //用户的项目
    projects: [
        {
            project_id: "",
            projectName: "测试1",
            owner: "kaydenli",
            owner_id: "1",
            createdDate: "2019-09-08",
            projectAddress: "wuhan",
            watchNumber: 1234,
            project_img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        }
    ],
    toAuth: [//用户正在请求查看的项目
        {
            project_id: "1",
            projectName: "测试1",
            projectAddress: "wuhan",
            watchNumber: 1234,
            owner_id: "1",
            owner: "kaydenli",
            avatar:"",
            description: "申请查看项目。",
            applicationCreatedDate: "2019-09-08",
            status: "waitting",
            project_img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",        }
    ],
    //用户已获得授权的项目
    getAuthed: [
        {
            project_id: "",
        }
    ],
    //等待用户授权的项目
    toCheck: [
        {
            applicant_id: "0002",
            project_id: "1",
            status: "waitting",
            description: "",
        }
    ],
    //用户已开放的项目
    getChecked: [
        {
            user_id: "",
        }
    ]
}