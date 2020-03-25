import {
    site1,
    site2,
    site3,
    site4,
    site5,
    site6
} from './site.js'

export const planes = [
    {
        _id:"1",
        name: "plane1",
        img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        currenttime: "2020-02-02 20:20:00",
        timeStamp: "60",//s
        children: [site1, site2, site3]
    },
    {
        _id:"2",
        name: "plane2",
        img: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        currenttime: "2020-02-02 20:20:00",
        timeStamp: "60",
        children: [site4, site5, site6]
    }
]