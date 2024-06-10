import { createBrowserRouter } from "react-router-dom";
import MessageList from "../pages/MessageList";
import App from "../App";
import ChatWindow from "../pages/ChatWindow";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MessageList />,
      },
      {
        path: "/:userId",
        element: <ChatWindow />,
      },
    ],
  },
]);
