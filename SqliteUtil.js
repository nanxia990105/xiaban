const Sqlite = require('sqlite3')
const path = require('path')


let sqliteUtilI = class sqliteUtil{
    flag
    dataBase
    constructor() {
        const dbPath = path.join(__dirname,'data','data.db')
        console.log(dbPath,'dbth')
        this.dataBase = new Sqlite.Database(dbPath,(err) =>{
            if(err){
                console.log(err)
                console.log('content error-------------')
                this.flag = false
            }
            //{avatar, taskDesc,taskName,time,music
            this.dataBase.run('create table if not exists task_table(taskId INTEGER PRIMARY KEY AUTOINCREMENT,avatarPath TEXT , taskDesc TEXT, taskName TEXT, time TEXT, musicPath TEXT)',(err)=>{
                if(err){
                    console.log('create table----error-->',err)
                    this.flag = false
                }
                this.flag = true
            })
        })
    }

    select(callBack){
        this.dataBase.all('select * from task_table',(err, rows)=>{
            if(err){
                console.log('select error',err)
                return[]
            }
            callBack(rows)
        })
    }

    insert({nowTask, avatarPath, taskDesc,taskName,time,musicPath},callBack){
        console.log(time,'insert time')
        const insertStr = `insert into task_table (avatarPath, taskDesc,taskName,time,musicPath) values ('${avatarPath}','${taskDesc}','${taskName}','${time}','${musicPath}')`;
        console.log(insertStr,'insert ssss')
        this.dataBase.run(insertStr,(err)=>{
            if(err){
                console.log('insert error',err)
            }
            callBack()
        })
    }

    delete(id,callBack){
        this.dataBase.all(`DELETE FROM task_table WHERE task_id = ${id}`,(err)=>{
            if(err){
                console.log('delete error', err)
            }
            callBack()
        })
    }

    update({taskId,avatar, taskDesc,taskName,time,music},callBack){
        this.dataBase.run(`UPDATE COMPANY SET avatar = ${avatar}, taskDesc = ${taskDesc}, taskName = ${taskName}, time = ${time}, music = ${music} WHERE task_id = ${taskId}`,(err)=>{
            if(err){
                console.log('update error', err)
            }
            callBack()
        })
    }
}
module.exports = sqliteUtilI