import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function TableHeader() {
  const [taskHeader, setTaskHeader] = useState([]);
  const [load, setLoad] = useState(false);

  const location = useLocation();
  const isHistoryPath = location.pathname.includes("history");

  useEffect(() => {
    if (isHistoryPath) {
      axios
        .get("http://localhost:8000/api/TaskHeader?status=Complete")
        .then((response) => {
          setTaskHeader(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .get("http://localhost:8000/api/TaskHeader?is_active=1&status=open")
        .then((response) => {
          setTaskHeader(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [load, isHistoryPath]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  const toggleModal = (answer) => {
    if (answer) {
      axios
        .delete(`http://localhost:8000/api/TaskHeader/${idDelete}`)
        .then(() => {
          setLoad(!load); // Toggle load state to trigger useEffect
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setIsModalOpen(!isModalOpen);
  };

  const deleteTaskHeader = (id) => {
    setIdDelete(id);
    setIsModalOpen(true);
  };

  return (
    <>
      {isHistoryPath ? (
        ""
      ) : (
        <div>
          {isModalOpen && (
            <div
              id="popup-modal"
              tabIndex="-1"
              className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    onClick={() => toggleModal(false)}
                    type="button"
                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center">
                    <svg
                      className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this task?
                    </h3>
                    <button
                      onClick={() => toggleModal(true)} // Event handler for Yes button
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      {"Yes, I'm sure"}
                    </button>
                    <button
                      onClick={() => toggleModal(false)} // Event handler for No button
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between">
            <Link to={"/new"}>
              <button
                type="button"
                className="ml-20 mb-2 py-1 px-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm"
              >
                New Task
              </button>
            </Link>
            <Link to={"/history"}>
              <button
                type="button"
                className="mr-20 mb-2 py-1 px-4 focus:outline-none text-white bg-pink-500 hover:bg-pink-700 focus:ring-4 font-medium rounded-lg text-sm"
              >
                Completed Task
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="relative overflow-x-auto">
        <table className="w-11/12 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white font-bold uppercase bg-blue-600">
            <tr>
              <th scope="col" className="px-6 py-3">
                Task Name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3 w-1/5 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {taskHeader &&
              taskHeader.map((header) => (
                <tr
                  key={header.id}
                  className="bg-blue-white hover:bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700 text-black"
                >
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {header.task_name}
                  </th>
                  <td className="px-6 py-2">{header.status}</td>
                  <td className="px-6 py-2">{header.start_date}</td>
                  <td className="px-6 py-2">{header.due_date}</td>
                  <td>
                    <div className="flex justify-between mx-4">
                      <div className="hover:cursor-pointer mt-1">
                        <Link to={`detail/${header.id}`}>
                          <button
                            type="button"
                            className="w-16 mb-2 py-1 px-2 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm"
                          >
                            Show
                          </button>
                        </Link>
                      </div>
                      {isHistoryPath ? (
                        ""
                      ) : (
                        <>
                          <div className="hover:cursor-pointer ml-4 mt-1">
                            <Link to={`edit/${header.id}`}>
                              <button
                                type="button"
                                className="w-16 mb-2 py-1 px-2 focus:outline-none text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 font-medium rounded-lg text-sm"
                              >
                                Update
                              </button>
                            </Link>
                          </div>
                          <div className="hover:cursor-pointer ml-4 mt-1">
                            <button
                              type="button"
                              className="w-16 mb-2 py-1 px-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm"
                              onClick={() => deleteTaskHeader(header.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isHistoryPath ? (
          <Link to={"/"}>
            <button
              type="button"
              className="w-20 mt-4 ml-16 py-2 px-4 focus:outline-none text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 font-medium rounded-md text-sm"
            >
              Back
            </button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default TableHeader;
