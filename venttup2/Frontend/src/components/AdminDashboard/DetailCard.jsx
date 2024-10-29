const DetailCard = ({
  isEditing,
  details,
  updates
}) => {
  return (
    <>
      <div className="space-y-4 grid grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold">Order ID</h3>
          <p className="text-gray-400">{details._id}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Customer ID</h3>
          <p className="text-gray-400">{details.customerId}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Order Type</h3>
          {isEditing ? (
            <select
              className="p-2 rounded bg-gray-700 text-white focus:outline-none"
              value={updates.orderType || details.orderType}
              onChange={(e) => handleChange("orderType", e.target.value)}
            >
              <option value="localization">Localization</option>
              <option value="contract_manufacturing">Contract Manufacturing</option>
              <option value="supply_chain">Supply Chain</option>
            </select>
          ) : (
            <p className="text-gray-400">{details.orderType}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold">Total Amount</h3>
          {isEditing ? (
            <input
              type="number"
              className="p-2 rounded bg-gray-700 text-white focus:outline-none"
              value={updates.totalAmount || details.totalAmount}
              onChange={(e) => handleChange("totalAmount", e.target.value)}
            />
          ) : (
            <p className="text-gray-400">₹{details.totalAmount}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold">Current Status</h3>
          {isEditing ? (
            <input
              type="text"
              className="p-2 rounded bg-gray-700 text-white focus:outline-none"
              value={updates.currentStatus || details.currentStatus}
              onChange={(e) => handleChange("currentStatus", e.target.value)}
            />
          ) : (
            <p className="text-gray-400">{details.currentStatus}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold">Vendor ID</h3>
          <div className="text-gray-400">
            {details.vendorId ? (
              details.vendorId
            ) : showVendorInput ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter Vendor ID"
                  className="w-1/2 p-2 rounded bg-gray-700 text-white focus:outline-none"
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                />
                <button
                  className="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
                  onClick={handleAssignVendor}
                >
                  Assign
                </button>
              </div>
            ) : (
              <button
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={() => setShowVendorInput(true)}
              >
                Assign Vendor
              </button>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Sector</h3>
          {isEditing ? (
            <input
              type="text"
              className="p-2 rounded bg-gray-700 text-white focus:outline-none"
              value={updates.sector || details.sector}
              onChange={(e) => handleChange("sector", e.target.value)}
            />
          ) : (
            <p className="text-gray-400">{details.sector}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold">Admin Approval</h3>
          {isEditing ? (
            <input
              type="checkbox"
              checked={updates.adminApproval || details.adminApproval}
              onChange={(e) => handleChange("adminApproval", e.target.checked)}
            />
          ) : (
            <p className="text-gray-400">
              {details.adminApproval ? "Approved" : "Pending"}
            </p>
          )}
        </div>
      </div>
    </>
  )
};

export default DetailCard;