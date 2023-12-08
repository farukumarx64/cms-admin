import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  FileField,
} from "react-admin";
import authProvider from "../providers/authProvider";
import supabaseDataProvider from "../providers/dataBaseProvider";

const CustomDeleteButton = (props) => {
  const requiredRole = "admin";

  return authProvider.checkRole(requiredRole) ? (
    <DeleteButton {...props} />
  ) : null;
};

const PostList = (props) => {
  const { dataProvider } = supabaseDataProvider;

  return (
    <List {...props} dataProvider={dataProvider}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="header" />
        <TextField source="email" />
        <TextField source="address" />
        <TextField source="description" />
        <TextField source="category" />
        <FileField
          source="fileUrl"
          title="Attachment"
          download
          target="_blank"
          render={(record) => {
            const fileUrl = record.fileUrl; // Assuming you added the fileUrl in your dataProvider
            return fileUrl ? (
              <a href={fileUrl} download>
                {record.file}
              </a>
            ) : null;
          }}
        />
        <DateField source="created_at" />
        <TextField source="status" />
        <EditButton basepath="/tickets" />
        <CustomDeleteButton basepath="/tickets" />
      </Datagrid>
    </List>
  );
};

export default PostList;
