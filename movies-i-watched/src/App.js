import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import RootLayout from "./layout/RootLayout";
import NewMoviePage from "./pages/NewMoviePage";
import EditPage, { loader as editPageLoader } from "./pages/EditPage";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <RootLayout />,
  //     children: [
  //       { index: true, element: <HomePage /> },
  //       {
  //         path: "/:id",
  //         id: "edit-page",
  //         element: <EditPage />,
  //         loader: editPageLoader,
  //       },
  //       { path: "/auth", element: <AuthPage /> },
  //       { path: "/new", element: <NewMoviePage /> },
  //     ],
  //   },
  // ]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth?mode=login" />}
        />
        <Route
          path="/:id"
          element={user ? <EditPage /> : <Navigate to="/auth?mode=login" />}
          loader={editPageLoader}
          id="edit-page"
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/new"
          element={user ? <NewMoviePage /> : <Navigate to="/auth?mode=login" />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
