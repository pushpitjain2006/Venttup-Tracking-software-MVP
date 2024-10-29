import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import { useState } from "react";

const OrderDetails = () => {
  const axios=useAxios();
  const orderId=useParams();

  useState(()=>{
    const fetchDetails = async() => {
      const response = await axios.get(`/admin/order/${orderId.orderId}`);
      console.log(response.data);
    }
    fetchDetails(); 
  },[orderId])
  

}

export default OrderDetails;