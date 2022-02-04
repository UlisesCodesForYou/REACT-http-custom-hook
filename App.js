import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./CustomHooks/useHttp";

function App() {
  const [tasks, setTasks] = useState([]); // This state stores the data coming from the api.  It's also very specific. States like this can be left out from the custom hook.

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformedTasks = (tasksObj) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks); // This state updating function will NEVER change in useCallback.
    };

    fetchTasks(
      {
        url:
          "https://adding-tasks-to-a-task-list-default-rtdb.firebaseio.com/tasks.json",
      },
      transformedTasks
    );
  }, [fetchTasks]); // Remember! Fetching data is a side effect!  That's why useEffect is used!

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
