/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

function HeaderForm({ id, loading }) {
  const [headerData, setHeaderData] = useState({});

  const headerDataAPI = () => {
    axios
      .get(`http://localhost:8000/api/TaskHeader/${id}`)
      .then((response) => {
        setHeaderData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    headerDataAPI();
  }, [id, loading]);

  return (
    <div className="mx-16 my-5 bg-white px-8 py-4 shadow-2xl rounded">
      <div className="font-bold text-xl mb-3">Detail Task</div>
      <div className="flex my-1">
        <p className="mr-14 w-1/12 py-1">Task Name</p>
        <p className="py-1 px-2 border-solid border-2 rounded-sm bg-gray-100 w-4/5">
          {headerData.task_name}
        </p>
      </div>
      <div className="flex my-1">
        <p className="mr-14 w-1/12 py-1">Status</p>
        <p className="py-1 px-2 border-solid border-2 rounded-sm bg-gray-100 w-4/5">
          {headerData.status}
        </p>
      </div>
      <div className="flex my-1">
        <p className="mr-14 w-1/12 py-1">Start Date</p>
        <p className="py-1 px-2 border-solid border-2 rounded-sm bg-gray-100 w-4/5">
          {headerData.start_date}
        </p>
      </div>
      <div className="flex my-1">
        <p className="mr-14 w-1/12 py-1">Due Date</p>
        <p className="py-1 px-2 border-solid border-2 rounded-sm bg-gray-100 w-4/5">
          {headerData.due_date}
        </p>
      </div>
    </div>
  );
}

export default HeaderForm;
