import './App.css';
import Left from "./commpent/left";
import Right from "./commpent/right";

const testTask = {taskId:1,taskName:'任务1', avatar:'/logo192.png', taskDesc:'任务1描述'}
const testTask1 = {taskId:2,taskName:'任务2', avatar:'/logo192.png', taskDesc:'任务2描述'}
const taskArr = [testTask, testTask1]
function App() {
  return (
    <div className="App">
        <Left taskList={taskArr}  />
        <Right/>
    </div>
  );
}

export default App;
