import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";
import TextAreaInput from "../../../components/TextAreaInput";
import NumberInput from "../../../components/NumberInput";
import DateInput from "../../../components/DateInput";

import loading from "../../../assets/images/loading.gif";

import { uploadImage } from "../../../firebase/uploadImage";
import axios from "axios";
import Axios from "../../../Instance";

import { toast } from "react-toastify";

const EditBookModal = (props) => {
  const { show, bookId, onClose, onEdit } = props;

  const [editedBook, setEditedBook] = useState(null);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [typeOfFile, setTypeOfFile] = useState("File");

  useEffect(() => {
    Axios()
      .get(`https://bookstoreprojectdut.azurewebsites.net/api/books/${bookId}`)
      .then((res) => {
        setEditedBook(res.data);
      });
    Axios()
      .get(`https://bookstoreprojectdut.azurewebsites.net/api/categories/all`)
      .then((res) => {
        setCategories(res.data);
      });
    Axios()
      .get(`https://bookstoreprojectdut.azurewebsites.net/api/publishers/all`)
      .then((res) => {
        setPublishers(res.data);
      });
  }, []);

  const SignupSchema = Yup.object().shape({
    nameBook: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    author: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),

    information: Yup.string()
      .min(2, "Too Short!")
      .required("Please fill out this field"),
    price: Yup.number()
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    originalPrice: Yup.number()
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    dimensions: Yup.string().required("Please fill out this field"),
    weight: Yup.number()
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    numberOfPage: Yup.number()
      .positive("This field must not be negative")
      .integer("This field must be non-decimal")
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    quantityIn: Yup.number()
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    imageLink: Yup.mixed().required("Please fill out this field"),
  });

  const handleSubmit = (values, actions) => {
    setIsLoading(true);
    if (values.imageLink.name) {
      uploadImage(values.imageLink)
        .then((res) => {
          values.imageLink = res;
          console.log(values);
          handleEditBook(values, actions);
        })
        .catch((err) => {
          toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
          setIsLoading(false);
          actions.setSubmitting(false);
        });
    } else {
      handleEditBook(values, actions);
    }
  };

  const handleEditBook = (data, actions) => {
    Axios()
      .put(
        `https://bookstoreprojectdut.azurewebsites.net/api/books/${bookId}`,
        data
      )
      .then((res) => {
        console.log(res.status);
        actions.setSubmitting(false);
        setIsLoading(false);
        setIsSubmitted(true);
        toast.success("Edit sách thành công!");
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        setIsLoading(false);
        actions.setSubmitting(false);
      });
  };

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Chỉnh sửa sách
        </h5>
        <button
          className="close"
          onClick={() => {
            onClose();
            if (isSubmitted) onEdit();
          }}
        >
          <span>×</span>
        </button>
      </div>

      {editedBook ? (
        <Formik
          enableReinitialize={true}
          initialValues={editedBook}
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
                    name="bookID"
                    value={bookId}
                    component={TextInput}
                    className="form-control"
                    label="ID"
                    disabled
                  />
                  <Field
                    type="text"
                    name="nameBook"
                    component={TextInput}
                    className={
                      errors.nameBook && touched.nameBook
                        ? "form-control error"
                        : "form-control"
                    }
                    label="Tên"
                  />
                  <Field
                    type="text"
                    name="author"
                    component={TextInput}
                    className={
                      errors.author && touched.author
                        ? "form-control error"
                        : "form-control"
                    }
                    label="Tác giả"
                  />
                  <div class="form-group">
                    <label>Thể loại</label>
                    <select
                      style={{ color: "black" }}
                      class="form-control mb-3"
                      name="categoryID"
                      value={values.categoryID}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {categories.map((category) => {
                        return (
                          <option
                            key={category.categoryID}
                            value={category.categoryID}
                          >
                            {category.category}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Nhà xuất bản</label>
                    <select
                      style={{ color: "black" }}
                      class="form-control mb-3"
                      name="publisherID"
                      value={values.publisherID}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {publishers.map((publisher) => {
                        return (
                          <option
                            key={publisher.publisherID}
                            value={publisher.publisherID}
                          >
                            {publisher.publisher}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <Field
                    type="text"
                    name="originalPrice"
                    component={NumberInput}
                    className={
                      errors.originalPrice && touched.originalPrice
                        ? "form-control error"
                        : "form-control"
                    }
                    value={values.originalPrice}
                    label="Giá gốc (VND)"
                  />
                  <Field
                    type="text"
                    name="price"
                    component={NumberInput}
                    className={
                      errors.price && touched.price
                        ? "form-control error"
                        : "form-control"
                    }
                    value={values.price}
                    label="Giá bán (VND)"
                  />

                  <div className="row">
                    <label className="col-md-7">Ảnh bìa</label>
                    <div className="col-md-5 flex justify-content-between">
                      <div>
                        <input
                          type="Radio"
                          id="Upload File"
                          name="typeOfFile"
                          value="Upload File"
                          checked={typeOfFile === "File"}
                          onChange={() => setTypeOfFile("File")}
                        />
                        <label htmlFor="Upload File">Upload File</label>
                      </div>

                      <div>
                        <input
                          type="Radio"
                          id="Upload Link"
                          name="typeOfFile"
                          value="Upload Link"
                          checked={typeOfFile === "Link"}
                          onChange={() => setTypeOfFile("Link")}
                        />
                        <label htmlFor="Upload Link">Upload Link</label>
                      </div>
                    </div>
                  </div>
                  {typeOfFile === "File" ? (
                    <div className="form-group">
                      <input
                        type="file"
                        name="imageLink"
                        accept="image/*"
                        onChange={(event) => {
                          setFieldValue(
                            "imageLink",
                            event.currentTarget.files[0]
                          );
                        }}
                        className={
                          errors.imageLink && touched.imageLink
                            ? "form-control error"
                            : "form-control"
                        }
                      />
                      {errors.imageLink && touched.imageLink ? (
                        <div className="input-feedback">{errors.imageLink}</div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="form-group">
                      <input
                        type="text"
                        name="imageLink"
                        onChange={(event) => {
                          setFieldValue("imageLink", event.target.value);
                        }}
                        className={
                          errors.imageLink && touched.imageLink
                            ? "form-control error"
                            : "form-control"
                        }
                      />
                      {errors.imageLink && touched.imageLink ? (
                        <div className="input-feedback">{errors.imageLink}</div>
                      ) : null}
                    </div>
                  )}

                  {!values.imageLink ? null : values.imageLink.name ? (
                    <img
                      src={URL.createObjectURL(values.imageLink)}
                      width="100%"
                      style={{ marginBottom: "1rem" }}
                    />
                  ) : (
                    <img
                      src={values.imageLink}
                      width="100%"
                      style={{ marginBottom: "1rem" }}
                    />
                  )}
                  <div>
                    <label>Loại</label>
                    <br />
                    <input
                      type="Radio"
                      id="Bìa mềm"
                      name="format"
                      value="Bìa mềm"
                      checked={values.format === "Bìa mềm"}
                      onChange={() => {
                        setFieldValue("format", "Bìa mềm");
                      }}
                    />
                    <label htmlFor="Bìa mềm">Bìa mềm</label>
                    <br />
                    <input
                      type="Radio"
                      id="Bìa cứng"
                      name="format"
                      value="Bìa cứng"
                      checked={values.format === "Bìa cứng"}
                      onChange={() => {
                        setFieldValue("format", "Bìa cứng");
                      }}
                    />
                    <label htmlFor="Bìa cứng">Bìa cứng</label>
                    <br />
                  </div>
                  <Field
                    type="text"
                    name="dimensions"
                    component={TextInput}
                    className={
                      errors.dimensions && touched.dimensions
                        ? "form-control error"
                        : "form-control"
                    }
                    label="Kích thước"
                  />
                  <Field
                    type="text"
                    name="weight"
                    component={NumberInput}
                    className={
                      errors.weight && touched.weight
                        ? "form-control error"
                        : "form-control"
                    }
                    value={values.weight}
                    label="Khối lượng (kg)"
                  />
                  <Field
                    type="text"
                    name="numberOfPage"
                    component={NumberInput}
                    className={
                      errors.numberOfPage && touched.numberOfPage
                        ? "form-control error"
                        : "form-control"
                    }
                    value={values.numberOfPage}
                    label="Số trang"
                  />
                  <Field
                    type="text"
                    name="information"
                    component={TextAreaInput}
                    className={
                      errors.information && touched.information
                        ? "form-control error"
                        : "form-control"
                    }
                    label="Thông tin"
                  />
                  <Field
                    type="text"
                    name="quantityIn"
                    component={NumberInput}
                    className={
                      errors.quantityIn && touched.quantityIn
                        ? "form-control error"
                        : "form-control"
                    }
                    value={values.quantityIn}
                    label="Số lượng nhập"
                  />
                  <Field
                    type="text"
                    name="quantityOut"
                    component={NumberInput}
                    className="form-control"
                    value={values.quantityOut ? values.quantityOut : 0}
                    disabled
                    label="Số lượng bán"
                  />
                  <Field
                    type="text"
                    name="date"
                    component={DateInput}
                    value={new Date(editedBook.date)}
                    label="Ngày nhập"
                  />
                  <div class="form-group">
                    <label>Tình trạng</label>
                    <select
                      style={{ color: "black" }}
                      class="form-control mb-3"
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="true">Đang hoạt động</option>
                      <option value="false">Bị khóa</option>
                    </select>
                  </div>
                  <ErrorFocus />
                </div>
                <div className="modal-footer">
                  <img
                    style={{
                      display: isLoading ? "inline" : "none",
                      marginRight: "1rem",
                    }}
                    src={loading}
                    width="6%"
                  />

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Lưu
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}
                  >
                    Reset
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      onClose();
                      if (isSubmitted) onEdit();
                    }}
                    disabled={isSubmitting}
                  >
                    Hủy
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

export default EditBookModal;
