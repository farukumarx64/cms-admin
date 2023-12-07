import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";
import authProvider from "../providers/authProvider";


const CustomDeleteButton = (props) => {
  const { record } = props;
  const requiredRole = 'admin';

  return authProvider.checkRole(requiredRole) ? <DeleteButton {...props} /> : null;
};

const PostList = (props) => {
  
  return (
    <List {...props}  >
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="header" />
        <TextField source="email" />
        <TextField source="address" />
        <TextField source="description" />
        <TextField source="category" />
        <DateField source="created_at" />
        <TextField source="status"/>
        <EditButton basepath="/tickets" />
       <CustomDeleteButton basepath="/tickets" />    
  </Datagrid>
    </List>
  );
};

export default PostList; 
