import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  useDataProvider,
} from "react-admin";

import { RichTextInput } from "ra-input-rich-text";
import { useState } from "react";

const PostEdit = (props) => {
  const [comment, setComment] = useState("");
  const dataProvider = useDataProvider(); // Access the data provider

  const handleCommentChange = (value) => {
    console.log("value: ", value);
    setComment(value);
  };

  const sanitizeHTML = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const handleSubmit = async (values) => {
    console.log("values: ", values, props);
    let { comment, ...otherValues } = values;

    // Sanitize HTML tags from the comment content
    comment = sanitizeHTML(comment);
    // If props.id exists, it means we are editing an existing record
    await dataProvider.update("complainData", {
      data: { comment, ...otherValues },
    });
  };
  return (
    <Edit title="Edit Post" {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput disabled source="id" />
        <TextInput disabled source="name" />
        <TextInput disabled source="header" />
        <TextInput disabled source="email" />
        <TextInput disabled source="address" />
        <TextInput disabled multiline source="description" />
        <DateInput label="Published" source="created_at" disabled />
        <SelectInput
          source="category"
          choices={[
            { id: "Retail Outlet Facility", name: "Retail Outlet Facility" },
            { id: "Add-On SKID", name: "Add-On SKID" },
            { id: "LNG Facility", name: "LNG Facility" },
            { id: "CNG Facility", name: "CNG Facility" },
            { id: "Gas Plant", name: "Gas Plant" },
            { id: "Refinery", name: "Refinery" },
            { id: "Lube Blending Plant", name: "Lube Blending Plant" },
            { id: "Calibration Centers", name: "Calibration Centers" },
            { id: "Gas Storage Facility", name: "Gas Storage Facility" },
            {
              id: "Petroleum Storage Facility",
              name: "Petroleum Storage Facility",
            },
            { id: "Aviation Fuel Facility", name: "Aviation Fuel Facility" },
          ]}
        />
        <SelectInput
          source="status"
          choices={[
            { id: "pending", name: "pending" },
            { id: "resolving", name: "resolving" },
            { id: "closed", name: "closed" },
            { id: "resolved", name: "resolved" },
          ]}
        />
        <RichTextInput
          source="comment"
          input={{ onChange: handleCommentChange, value: comment }}
          onBlur={() => {}}
        />
      </SimpleForm>
    </Edit>
  );
};

export default PostEdit;
