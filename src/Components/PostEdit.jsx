import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
} from "react-admin";

const PostEdit = (props) => {
  return (
    <Edit title="Edit Post" {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput disabled source="name" />
        <TextInput disabled source="header" />
        <TextInput disabled source="email" />
        <TextInput disabled source="address" />
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
        <TextInput disabled multiline source="description" />
        <SelectInput
          source="status"
          choices={[
            { id: "pending", name: "pending" },
            { id: "resolving", name: "resolving" },
            { id: "closed", name: "closed" },
            { id: "resolved", name: "resolved" },
          ]}
        />
        <DateInput label="Published" source="created_at" />
      </SimpleForm>
    </Edit>
  );
};

export default PostEdit;
