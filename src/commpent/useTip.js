import {useState} from 'react';
import {Avatar, List} from 'antd';
import './leftList.css'
const { ipcRenderer  } = window.myElectron

const useTip = ()=>{
    const [taskList, setTaskList] = useState([])
    ipcRenderer.on('display:none',(sender,value)=>{
        setTaskList(JSON.parse(value))
    })
    return(
        <div className="tip">
        <List
            size="small"
            itemLayout="horizontal"
            dataSource={taskList}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        key={item.taskId}
                        avatar={<Avatar size={40} src={item.avatarPath ? item.avatarPath : './logo192.png'} />}
                        title={item.taskName}
                        description={item.taskDesc}
                    />
                    <Avatar size={40} src={item.avatarPath ? item.avatarPath : './logo192.png'} />
                    <Avatar size={40} src={item.avatarPath ? item.avatarPath : './logo192.png'} />
                </List.Item>
            )}
        />
        </div>
    )
}

export default useTip