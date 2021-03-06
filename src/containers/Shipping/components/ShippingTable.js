import React, { useState } from "react";
import { edit, del, shipping } from "../../../components/svg/icon";
import EditShippingModal from "./EditShippingModal";
import ShippingDetailModal from "./ShippingDetailModal";

const ShippingTable = (props) => {
  const { shippings, onSort, onEdit } = props;

  const [editedDistrictID, setEditedDistrictID] = useState(null);
  const [detailedDistrictID, setDetailedDistrictID] = useState(null);

  const handlesetEditedBookId = (id) => {
    setEditedDistrictID(id);
  };

  const handleCloseEditModal = () => {
    setEditedDistrictID(null);
  };

  const handleCloseDetailModal = () => {
    setDetailedDistrictID(null);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover dataTable">
        <tr className="tr-header">
          <th
            onClick={() => {
              onSort("districtID");
            }}
          >
            ID
          </th>
          <th
            onClick={() => {
              onSort("district");
            }}
          >
            Quận, Huyện
          </th>
          <th
            onClick={() => {
              onSort("city");
            }}
          >
            Tỉnh, Thành phố
          </th>
          <th
            onClick={() => {
              onSort("fee");
            }}
          >
            Phí ship
          </th>

          <th>Action</th>
        </tr>

        <tbody>
          {shippings.map((shipping) => (
            <tr className="tr-body" key={shipping.districtID}>
              <td>{shipping.districtID}</td>
              <td>
                <a
                  onClick={() => {
                    setDetailedDistrictID(shipping.districtID);
                  }}
                >
                  {shipping.district}
                </a>
              </td>
              <td>{shipping.city}</td>
              <td>{new Number(shipping.fee).toLocaleString("vi-VI")}</td>
              <td>
                <button
                  className="icon-button"
                  onClick={() => handlesetEditedBookId(shipping.districtID)}
                >
                  {edit}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Boolean(editedDistrictID) && (
        <EditShippingModal
          show={Boolean(editedDistrictID)}
          districtID={editedDistrictID}
          onClose={handleCloseEditModal}
          onEdit={onEdit}
        />
      )}

      {Boolean(detailedDistrictID) && (
        <ShippingDetailModal
          show={Boolean(detailedDistrictID)}
          districtID={detailedDistrictID}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default ShippingTable;
