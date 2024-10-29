import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import { useState } from "react";
import { toast } from "react-toastify"
import { ChevronLeft } from "lucide-react";

const OrderDetails = () => {
  const axios=useAxios();
  const orderId=useParams();
  const [details, setDetails] = useState({});

  useState(()=>{
    const fetchDetails = async() => {
      try {
        const response = await axios.get(`/admin/order/${orderId.orderId}`);
        setDetails(response.data);
        toast.success("Fetched successfully");
      } catch(err) {
        toast.error("Cannot fetch details");
      }
    }
    fetchDetails(); 
  },[orderId])
  
  return (
    <>
      <div className="w-lvw">
        <div className="w-full h-16 bg-violet-900 flex items-center">
          <div 
            className=" hover:underline hover:bg-white rounded-full px-2 h-8 cursor-pointer mx-2"
            onClick={()=>window.history.back()}
          >
            <ChevronLeft className="inline-block"/>View All Orders
          </div>
        </div>
        <div>
          <div className="w-full mx-auto bg-slate-600 shadow-lg p-8 text-gray-100">
            <h2 className="text-2xl font-bold text-center mb-6">Order Details</h2>

            <div className="space-y-4 grid grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold" >Order ID</h3>
                <p className="text-gray-400">{details._id}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Customer ID</h3>
                <p className="text-gray-400">{details.customerId}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Order Type</h3>
                <p className="text-gray-400">{details.orderType}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Total Amount</h3>
                <p className="text-gray-400">₹{details.totalAmount}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Current Status</h3>
                <p className="text-gray-400">{details.currentStatus}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Vendor ID</h3>
                <p className="text-gray-400">{
                  details.vendorId 
                  ? details.vendorId
                  :<button 
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={()=>console.log("to implement")}
                  >
                    Assign Vendor
                  </button>}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Sector</h3>
                <p className="text-gray-400">{details.sector}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Admin Approval</h3>
                <p className="text-gray-400">{details.adminApproval ? "Approved" : "Pending"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetails;