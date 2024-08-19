"use client";
import { useEffect, useRef, useState } from "react";
import Bottom from "./Bottom";
import Steps from "./Steps";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import RadioInput from "./RadioInput";
import { source_sans_3 } from "@/app/fonts/font";
import CircleLoader from "@/components/shared/CircleLoader";
import ky from "ky";
import { toast } from "react-toastify";
import GetStarted from "./GetStarted";

const Main = ({base_url}) => {
  const initialValues = {
    id: "",
    name: "",
    type: "public",
    secret: "",
    group: "normal",
    grouplimit: "",
  };

  const [activeTab, setActiveTab] = useState(1);
  const [newChat, setNewChat] = useState(initialValues);
  const { id, name, type, secret, group, grouplimit } = newChat;
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitButtonRef = useRef(null);

  useEffect(() => {
    if (name.length < 3 || name.length > 30) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [name]);

  const tabHandler = (action) => {
    if (action === "prev") {
      if (activeTab > 1) {
        setActiveTab(activeTab - 1);
      } else {
        return;
      }
    } else if (action === "next") {
      if (hasError) {
        return;
      }
      if (activeTab < 3) {
        setActiveTab(activeTab + 1);
      } else {
        return;
      }
    } else {
      return;
    }
  };

  const validateForm = Yup.object({
    name: Yup.string()
      .required("Chat room name is required")
      .min(3, "Chat room name must be at least 3 characters")
      .max(30, "Chat room name can't exceed 30 characters"),

    type: Yup.string().required(),

    secret: Yup.string().when("type", (type, schema) => {
      if (type == "private") {
        return schema
          .required("This is required")
          .min(3, "Chat secret must be at least 3 characters")
          .max(10, "Chat secret can't exceed 10 characters");
      }
      return schema;
    }),

    group: Yup.string().required(),

    grouplimit: Yup.number().when("group", (group, schema) => {
      if (group == "group") {
        return schema
          .required("This is required")
          .min(3, "Group limit must be at least 3")
          .max(20, "Group limit can't exceed 20");
      }
      return schema;
    }),
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setNewChat((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const radioChangeHandler = (event) => {
    const { name, value } = event.target;
    setNewChat((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitHandler = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      let res;
      let result;
      if (id) {
        res = await ky.put("/api/chat", { json: { newChat } });
        result = await res.json();
      } else {
        res = await ky.post("/api/chat", { json: { newChat } });
        result = await res.json();
      }

      if (res.status === 200) {
        setLoading(false);
        setNewChat((prevState) => {
          return { ...prevState, id: result.data.url };
        });
        setActiveTab(3);
        return toast.success(result.message);
      } else {
        setLoading(false);
        return toast.error(result.message);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      return;
    }
  };

  return (
    <>
      {loading && <CircleLoader />}
      <div className={styles.container}>
        <Steps activeTab={activeTab} />
        <Formik
          enableReinitialize
          initialValues={{ name, type, secret, group, grouplimit }}
          validationSchema={validateForm}
          onSubmit={submitHandler}
        >
          {(form) => (
            <Form>
              {activeTab === 1 && (
                <div className={styles.create}>
                  <Input
                    labeltext="Enter Chat Name :"
                    htmlFor="name"
                    name="name"
                    placeholder="Random Chat ..."
                    type="text"
                    onChange={inputChangeHandler}
                    value={name}
                  />
                </div>
              )}
              {activeTab === 2 && (
                <div className={styles.configure}>
                  <RadioInput
                    for="type"
                    label="Select Chat Type :"
                    checked={type}
                    radioChangeHandler={radioChangeHandler}
                    options={[
                      {
                        label: "Public",
                        name: "type",
                        value: "public",
                      },
                      {
                        label: "Private",
                        name: "type",
                        value: "private",
                      },
                    ]}
                  />
                  {type === "private" && (
                    <Input
                      labeltext="Set Private Code :"
                      htmlFor="secret"
                      name="secret"
                      placeholder=""
                      type="text"
                      onChange={inputChangeHandler}
                      value={secret}
                    />
                  )}
                  <RadioInput
                    for="group"
                    label="Select Chat Theme :"
                    checked={group}
                    radioChangeHandler={radioChangeHandler}
                    options={[
                      {
                        label: "Normal",
                        name: "group",
                        value: "normal",
                      },
                      {
                        label: "Group",
                        name: "group",
                        value: "group",
                      },
                    ]}
                  />
                  {group === "group" && (
                    <Input
                      labeltext="Set Group Limit (Max - 20) :"
                      htmlFor="grouplimit"
                      name="grouplimit"
                      placeholder="5"
                      type="number"
                      onChange={inputChangeHandler}
                      value={grouplimit}
                    />
                  )}
                </div>
              )}
              <button
                className={styles.submit}
                type="submit"
                ref={submitButtonRef}
              />
            </Form>
          )}
        </Formik>
        {activeTab === 3 && (
          <GetStarted base_url={base_url} id={id} />
        )}
        <Bottom
          tabHandler={tabHandler}
          activeTab={activeTab}
          submitButtonRef={submitButtonRef}
          id={newChat.id}
        />
        {errorMessage && (
          <div className={styles.finalerror}>
            <span className={source_sans_3.className}>{errorMessage}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
