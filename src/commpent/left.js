import {useState,useEffect} from "react";
import { Avatar, List } from 'antd';
import transit from "../Transit";
import './left.css'
const { ipcRenderer  } = window.myElectron
const sqliteUtilI  = window.sqlite3
const schedule  = window.schedule
function listItemClick(value){
    transit.subscriptions("publishTask",value)

}
let scheduleList = []
function addScheduleList(rows){
    if(scheduleList.length <= 0){
        rows.forEach((value) =>{
            console.log('初始化定时器',value.taskName,value.time)
            schedule.scheduleJob(value.time,()=>{
                ipcRenderer.send('scheduleJob', JSON.stringify(value))
            })
        })
        scheduleList = [...rows]
    }
}
const sqlite = new sqliteUtilI()
function useLeft(props){
    //初始化数据
    //const {taskList} = props
    const [taskList, setTaskList] = useState([])
    //console.log("left-------->")
    //const sqliteMemo = useMemo(() => sqlite )
    useEffect(()=>sqlite.select(rows => {
        addScheduleList(rows)
        setTaskList([...rows])
    }),[taskList])
    transit.subscriptionsOnlyKey("insert-success",() =>sqlite.select(rows=>setTaskList([...rows])))
    transit.deleteOnlyKey('insert-success')
    ipcRenderer.on('task-select-success',(sender,value)=>{
        const parse = JSON.parse(value);
        console.log('task-select-success')
        setTaskList(parse)
    })
    ipcRenderer.on('task-add-success',(sender,value)=>{
        const parse = JSON.parse(value);
        console.log('task-add-success')
        setTaskList(parse)
    })
    ipcRenderer.on('task-update-success',(sender,value)=>{
        const parse = JSON.parse(value);
        console.log('task-update-success')
        setTaskList(parse)
    })
    ipcRenderer.on('task-insert-success',(sender,value)=>{
        const parse = JSON.parse(value);
        console.log('task-insert-success')
        setTaskList(parse)
    })


    return(
        <div className="left">
            <List
                className="leftList"
                size="small"
                itemLayout="horizontal"
                dataSource={taskList}
                renderItem={item => (
                    <List.Item onClick={()=>listItemClick(item)}>
                        <List.Item.Meta
                            key={item.taskId}
                            avatar={<Avatar size={60} src={item.avatarPath ? item.avatarPath : './logo192.png'} />}
                            title={item.taskName}
                            description={item.taskDesc}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}
export default useLeft;