import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";
import TextAreaInput from "../../../components/TextAreaInput";
import NumberInput from "../../../components/NumberInput";
import DateInput from "../../../components/DateInput";

const AddUserModal = (props) => {
  const { show, onClose, onAdd } = props;

  const initialValues = {
    username: "",
    password: "",
    confirmedPassword: "",
    name: "",
    type: "0",
    coverImage: "",
    inputDate: new Date(),
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    confirmedPassword: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    coverImage: Yup.mixed().required("Please fill out this field"),
  });

  const handleSubmit = (values, actions) => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Thêm người dùng
        </h5>
        <button className="close" onClick={() => onClose()}>
          <span>×</span>
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        validationSchema={SignupSchema}
      >
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
                <Field
                  type="text"
                  name="username"
                  component={TextInput}
                  className={
                    errors.username && touched.username
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Username"
                />

                <Field
                  type="password"
                  name="password"
                  component={TextInput}
                  className={
                    errors.password && touched.password
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Password"
                />

                <Field
                  type="password"
                  name="confirmedPassword"
                  component={TextInput}
                  className={
                    errors.confirmedPassword && touched.confirmedPassword
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Xác nhận password"
                />

                <Field
                  type="text"
                  name="name"
                  component={TextInput}
                  className={
                    errors.name && touched.name
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Tên"
                />

                <div class="form-group">
                  <label>Vai trò</label>
                  <select
                    style={{ color: "black" }}
                    class="form-control mb-3"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option selected="" value="0">
                      0
                    </option>
                    <option value="1">1</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Avatar</label>
                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue("coverImage", event.currentTarget.files[0]);
                    }}
                    className={
                      errors.coverImage && touched.coverImage
                        ? "form-control error"
                        : "form-control"
                    }
                  />
                  {errors.coverImage && touched.coverImage ? (
                    <div className="input-feedback">{errors.coverImage}</div>
                  ) : null}
                </div>

                {values.coverImage ? (
                  <img
                    src={URL.createObjectURL(values.coverImage)}
                    width="100%"
                  />
                ) : null}

                <Field
                  type="text"
                  name="inputDate"
                  component={DateInput}
                  label="Ngày đăng kí"
                />

                <ErrorFocus />
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={isSubmitting}
                >
                  Thêm
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </button>
                <button className="btn btn-primary" onClick={() => onClose()}>
                  Hủy
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddUserModal;