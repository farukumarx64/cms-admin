import { Admin, Resource } from "react-admin";
import authProvider from "./providers/authProvider";
import PostList from "./Components/PostList";
import PostEdit from "./Components/PostEdit";
import supabaseDataProvider from "./providers/dataBaseProvider";

function App(permissions) {
  return (
    <Admin dataProvider={supabaseDataProvider} authProvider={authProvider}>
      <Resource
        name="complainData"
        list={PostList}
        edit={permissions !== "admin" ? PostEdit : null}
      />
    </Admin>
  );
}

export default App;
