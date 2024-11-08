import ApplicationAddEdit from "sections/applications/application-add-edit/ApplicationAddEdit";
import Applications from "sections/applications/Applications";
import Home from "sections/home/Home";
import Questions from "sections/questions/Questions";

const routes = [
  { name: "Home", path: "/", component: Home, icon: "mi-home" },
  { name: "Applications", path: "/applications", component: Applications, icon: "mi-document" },
  { name: "ApplicationsEdit", path: "/applications/:id", component: ApplicationAddEdit },
  { name: "ApplicationsAdd", path: "/applications/add", component: ApplicationAddEdit },
  { name: "Questions", path: "/questions", component: Questions, icon: "mi-message" },
  { name: "To-Do", path: "/todo", component: Questions, icon: "mi-clipboard-check" },
];

export default routes;
