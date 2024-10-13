import { toast } from "react-toastify";

/** Displays a user-friendly error message in a toast.
 * @author Geetha
 * @param {Error} error The error object to display messaging for
 * @param {string} itemDescriptor A 1-2 word name/description of the kind of item being fetched
 * @param {import("react-toastify").Id} toastId (optional) The ID of a toast to update. If not provided, a new toast is created.
 */
export function handleFetchError(error, itemDescriptor, toastId = null) {
  let errorStr;
  if (error.response) {
    const status = error.response.status;
    if (status === 404) {
      errorStr = `${itemDescriptor} not found.`;
    } else if (status === 400) {
      errorStr = "Invalid input. Please check the data you've entered.";
    } else {
      errorStr = `An error occurred: ${
        error.response.data.message || "Unknown error"
      }`;
    }
  } else if (error.request) {
    errorStr =
      "No response from the server. Please check your network connection.";
  } else {
    errorStr = `Request error: ${error.message}`;
  }
  toastId
    ? toast.update(toastId, {
        render: errorStr,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      })
    : toast.error(errorStr);
}
