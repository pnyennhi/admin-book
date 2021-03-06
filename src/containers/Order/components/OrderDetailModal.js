import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";

import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";

import OrderInvoice from "./OrderInvoice";

import { ORDER_STATUS } from "../../../constants";

const STATUSES = ORDER_STATUS.map((status) => status.status);

const EditOrderModal = (props) => {
  const { show, orderId, onClose, onEdit } = props;

  const [order, setOrder] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://bookstoreprojectdut.azurewebsites.net/api/orders/${orderId}`
    ).then((res) => {
      setOrder(res.data);
    });
  }, []);

  return (
    <Modal show={show} maxWidth="910px">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Chi tiết đơn hàng
        </h5>
        <button
          className="close"
          onClick={() => {
            onClose();
          }}
        >
          <span>×</span>
        </button>
      </div>

      {order ? (
        <Formik enableReinitialize={true} initialValues={order}>
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              setFieldValue,
            } = props;

            return (
              <Form>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-sm-12 col-md-5">
                      <Field
                        type="text"
                        name="orderID"
                        component={TextInput}
                        className="form-control"
                        label="Id"
                        disabled
                      />
                      <Field
                        type="text"
                        name="email"
                        component={TextInput}
                        className="form-control"
                        label="Email"
                        disabled
                      />

                      <Field
                        type="text"
                        name="nameOfRecipient"
                        component={TextInput}
                        className="form-control"
                        label="Tên người nhận"
                        disabled
                      />
                      <Field
                        type="text"
                        name="phone"
                        component={TextInput}
                        className="form-control"
                        label="Số điện thoại"
                        disabled
                      />
                      <div className="form-group">
                        <label>
                          <b>Địa chỉ</b>
                        </label>
                        <textarea className="form-control" disabled>
                          {order.address}
                        </textarea>
                      </div>
                      <div className="form-group">
                        <label>
                          <b>Ghi chú</b>
                        </label>
                        <textarea className="form-control" disabled>
                          {order.note}
                        </textarea>
                      </div>
                      <div className="form-group">
                        <label>
                          <b>Ghi chú</b>
                        </label>
                        <input
                          className="form-control"
                          value={new Date(order.date).toLocaleString("en-GB")}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-7">
                      <div className="flex justify-content-between mb-3 pr-3">
                        <label className="mb-0">
                          <b>Chi tiết đơn hàng</b>
                        </label>
                        <span
                          className={`badge ${
                            ORDER_STATUS.find(
                              (status) => status.status === order.status
                            )?.color
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <OrderInvoice order={order} />
                    </div>
                  </div>

                  <ErrorFocus />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Đóng
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <img style={{ margin: "20px auto" }} src={loading} width="10%" />
      )}
    </Modal>
  );
};

export default EditOrderModal;
