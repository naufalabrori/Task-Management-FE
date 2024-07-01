import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateTaskDetailForm() {
  const [subTask, setSubTask] = useState("");
  const { headerId } = useParams();

  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/TaskDetail/${id}`)
      .then((response) => {
        setSubTask(response.data.data.sub_task_name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const updateTaskDetail = () => {
    axios
      .post(`http://localhost:8000/api/TaskDetail/${id}`, {
        task_header_id: headerId,
        sub_task_name: subTask,
        _method: "PUT",
      })
      .then(() => {
        navigate(`/detail/${headerId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="text-2xl font-bold w-full my-3 flex justify-center">
        TASK MANAGEMENT SYSTEM
      </div>
      <div className="ml-10 text-lg font-semibold">Update Sub Task</div>

      <div className="max-w-sm ml-10 mt-10">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sub Task Name
          </label>
          <input
            type="text"
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Task Name"
            onChange={(e) => setSubTask(e.target.value)}
            value={subTask}
            required
          />
        </div>
        <Link to={`/detail/${headerId}`}>
          <button
            type="button"
            className="w-20 mt-4 py-2 px-4 focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 font-medium rounded-md text-sm"
          >
            {"Back"}
          </button>
        </Link>
        <button
          type="submit"
          className="mt-5 ml-2 text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-200 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center"
          onClick={updateTaskDetail}
        >
          Update
        </button>
      </div>
    </>
  );
}

export default UpdateTaskDetailForm;
