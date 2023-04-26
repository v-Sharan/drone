import { useQuery } from "react-query";
import axios from "axios";
import Loader from "./components/Loader";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "flowbite-react";

function App() {
  const [locations, setLocations] = useState([]);
  const { data, isLoading, isError, error } = useQuery("Data", () => {
    return axios.get("https://medical-uav.onrender.com/api/medicaluav");
  });

  useEffect(() => {
    setLocations(data?.data?.locations);
  }, [data]);

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
      {isLoading && <Loader />}
      {locations?.length === 0 && (
        <div className="bg-white p-6 rounded-md">No data Found</div>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          {!isLoading && !isError && locations?.length !== 0 && (
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
                  CheckBox
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {locations?.map((row) => (
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {row.type}
                </th>
                <td className="px-6 py-4">{row.latitude}</td>
                <td className="px-6 py-4">{row.longitude}</td>
                <td className="px-6 py-4">
                  <input
                    id="vue-checkbox-list"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
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
