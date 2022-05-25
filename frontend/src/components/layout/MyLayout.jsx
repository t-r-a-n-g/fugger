import { Layout } from "react-admin";
import MyMenu from "./MyMenu";

export default function MyLayout(props) {
  return <Layout {...props} menu={MyMenu} />;
}
