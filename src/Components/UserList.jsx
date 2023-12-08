import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DeleteButton,
  FileField,
} from 'react-admin'

const UserList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='name' />
        <EmailField source='email' />
        <FileField source='file' />
        <EditButton basepath='/customers' />
        <DeleteButton basepath='/customers' />
      </Datagrid>
    </List>
  )
}

export default UserList