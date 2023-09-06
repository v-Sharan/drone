import { useQuery } from "react-query";
import axios from "axios";
import Loader from "./components/Loader";
import { useState } from "react";
import { Button } from "flowbite-react";

function App() {
  const [loadingDelete, setLoadingDelete] = useState({
    loading: false,
    id: "",
  });
  const [isErrorInUpdate, setIsErrorInUpdate] = useState(false);
  const [errorInUpdate, setErrorInUpdate] = useState();
  const { data, isLoading, isError, error, refetch } = useQuery("Data", () => {
    return axios.get(`${import.meta.env.VITE_APP_URL}/api/medicaluav`);
  });

  const handleDelete = (id) => {
    setLoadingDelete({ loading: true, id: id });
    axios
      .delete(`${import.meta.env.VITE_APP_URL}/api/medicaluav/${id}`)
      .then((res) => {
        refetch();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingDelete({ loading: false, id: "" });
      });
  };
  const handleUpdate = (id) => {
    axios
      .patch(`${import.meta.env.VITE_APP_URL}/api/medicaluav/${id}`)
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        setIsErrorInUpdate(true);
        setErrorInUpdate(err.response.data);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-10 bg-gradient-to-r from-cyan-200 to-blue-200 ">
      {!isLoading && (
        <h1 className="text-3xl uppercase text-gray-800">Drone Adminstrator</h1>
      )}
      {isError && error?.code === "ERR_BAD_REQUEST" && (
        <>
          <div className="bg-white p-5 rounded">
            404 Error Occured Reload the page
          </div>
          <Button
            onClick={() => {
              location.reload();
            }}
          >
            Reload
          </Button>
        </>
      )}
      {isErrorInUpdate && (
        <>
          <div className="bg-white p-5 rounded">
            An error Occured While updating the status
            {errorInUpdate}
          </div>
          <Button
            onClick={() => {
              location.reload();
            }}
          >
            Reload
          </Button>
        </>
      )}
      {isLoading && <Loader />}
      {data?.data?.locations?.length === 0 && (
        <div className="bg-white p-6 rounded-md">No data Found</div>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          {!isLoading && !isError && data?.data?.locations?.length !== 0 && (
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Latitude
                </th>
                <th scope="col" className="px-6 py-3">
                  Longitude
                </th>
                <th scope="col" className="px-6 py-3">
                  Task Completed status
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {data?.data?.locations?.map((row) => (
              <tr
                key={`${row._id}`}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {row.type}
                </th>
                <td className="px-6 py-4">{row.latitude}</td>
                <td className="px-6 py-4">{row.longitude}</td>
                <td className="px-[10vh] py-4 flex items-center gap-2">
                  <label className="bg-gray-300 p-1 rounded-lg px-3">
                    Statue
                  </label>
                  <input
                    id="vue-checkbox-list"
                    type="checkbox"
                    checked={row.status}
                    className="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={() => {
                      handleUpdate(row._id);
                    }}
                  />
                </td>
                <td className="px-4 py-4">
                  {!loadingDelete.loading || !(loadingDelete.id === row._id) ? (
                    <Button
                      onClick={() => {
                        handleDelete(row._id);
                      }}
                    >
                      Delete
                    </Button>
                  ) : (
                    <button disabled className="btn loading"></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
