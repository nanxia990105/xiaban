
import './right.css'
import { TimePicker,Input, Button, Upload,Form  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import transit from "../Transit";
const { ipcRenderer  } = window.myElectron
const sqliteUtilI  = window.sqlite3
const schedule  = window.schedule


let nowTask = {}
const style = {
    input:{
        maxWidth:'300px'
    }
}

//设置当前任务
const publishTask = (task) => {
    nowTask = task
}

function useRight(props){
    const [form] = Form.useForm()
    const sqlite = new sqliteUtilI()
    transit.publish("publishTask",publishTask)
    console.log("right-------->")
    //表单提交
    const onFinish = ({avatar, taskDesc,taskName,time,music}) => {
        const avatarPath = avatar.file.originFileObj.path
        const musicPath = music.file.originFileObj.path
        const obj = {nowTask, avatarPath,taskDesc,taskName,time, musicPath};
        const scheduleStr = `${time.seconds()} ${time.minutes()} ${time.hours()} * * *`
        obj.time = scheduleStr
        sqlite.insert(obj,()=>{
            transit.publishOnlyKey('insert-success')
            form.resetFields(['avatar', 'taskDesc','taskName','time','music'])
            schedule.scheduleJob(scheduleStr,()=>{
                ipcRenderer.send('scheduleJob', JSON.stringify({avatarPath, taskDesc,taskName,time,musicPath}))
            })
        })
    };
    //表单提交失败
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const avatarProps = {
        showUploadList:false,
        maxCount:1,
        accept:'.png,.jpg,.jpeg',
        customRequest(value){

        },
    };
    const musicProps = {
        accept: '.mp3',
        maxCount:1,
        showUploadList:false,
        customRequest(value){

        },
    };



    return(
        <div className='right'>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="选择头像"
                    name="avatar"
                    rules={[
                        {
                            required: true,
                            message: '请选择头像!',
                        },
                    ]}
                >
                       <Upload {...avatarProps}>
                            <Button icon={<UploadOutlined />}>点击选择头像</Button>
                        </Upload>
                </Form.Item>

                <Form.Item
                    label="任务名称"
                    name="taskName"
                    rules={[
                        {
                            required: true,
                            message: '请输入任务名称！',
                        },
                    ]}
                >
                    <Input style={style.input}/>
                </Form.Item>

                <Form.Item
                    label="任务描述"
                    name="taskDesc"
                    rules={[
                        {
                            required: true,
                            message: '请输入任务描述！',
                        },
                    ]}
                >
                    <Input style={style.input}/>
                </Form.Item>

                <Form.Item
                    label="下班时间"
                    name="time"
                    rules={[
                        {
                            required: true,
                            message: '请选择下班时间!',
                        },
                    ]}
                ><TimePicker/>
                </Form.Item>
                <Form.Item
                    label="选择音乐"
                    name="music"
                    rules={[
                        {
                            required: true,
                            message: '请选择音乐!',
                        },
                    ]}
                    >
                    <Upload {...musicProps}>
                        <Button icon={<UploadOutlined />}>点击选择音乐</Button>
                        </Upload>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default useRight;