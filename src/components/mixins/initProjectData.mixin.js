const initProjectData = {
    data() {
        return {
            // 项目基本信息
            baseInfo: {
                time: "",
                timeStamp: "",
                planesNumber: 0,
                sitesNumber: 0,
                pointsNumber: 0
            },
            // 所有测区名
            planes: [
                // { text: "测区1", value: "测区1" }
            ],
            // 所有测站名
            sites: [
                // { text: "测站1", value: "测站1" }
            ],
            // 所有类型名
            selecttype: [],
            types: [
                // { text: "应力", value: "应力" }
            ],
            // 所有分组名
            selectgroup: [],
            groups: [
                // { text: "分组", value: "分组" }
            ],
            units: []
        }
    },
    methods: {
        $_initBaseInfo(data) {
            this.planes = [];
            this.sites = [];
            this.types = [];
            this.groups = [];
            this.units = [];
            this.selectgroup = [];
            this.selecttype = [];
            if (data.length === 0) return;
            // 项目基本信息
            this.baseInfo.planesNumber = data.length;
            this.baseInfo.time = data[0].currenttime;
            this.baseInfo.timeStamp = data[0].timeStamp;
            data.forEach(planes => {
                // 遍历得到所有已存在的测区
                let plane = planes.name;
                this.planes.push({ text: plane, value: plane });
                planes.children.forEach(sites => {
                    // 遍历得到所有已存在的测站
                    let site = sites.name;
                    this.baseInfo.sitesNumber++;
                    this.sites.push({ text: site, value: site });
                    sites.value.forEach(points => {
                        // 遍历得到所有存在的类型
                        if (this.selecttype.indexOf(points.type) === -1) {
                            let type = points.type;
                            this.selecttype.push(type);
                            this.types.push({ text: type, value: type });
                        }
                        // 遍历得到所有存在的分组
                        points.group.forEach(groupArray => {
                            if (this.selectgroup.indexOf(groupArray) === -1) {
                                this.selectgroup.push(groupArray);
                                this.groups.push({ text: groupArray, value: groupArray });
                            }
                        });
                        // 遍历得到所有存在的单位
                        if (this.units.indexOf(points.unit) === -1) {
                            this.units.push(points.unit);
                        }
                    });
                });
            });
        }
    }
}

export { initProjectData }