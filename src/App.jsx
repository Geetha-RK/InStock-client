import "./App.scss";
import { createContext, useRef } from "react";
import { useAnnouncementSystem } from "./hooks/useAnnouncementSystem";
import { Route, Routes } from "react-router-dom";

import Announcement from "./components/Announcement/Announcement";
import Navigate from "./components/Navigate/Navigate";

import Header from "./components/Header/Header";
import MainWrapper from "./components/MainWrapper/MainWrapper";
import WarehouseListPage from "./pages/WarehouseListPage/WarehouseListPage";
import WarehouseFormPage from "./pages/WarehouseFormPage/WarehouseFormPage";
import WarehousePage from "./pages/WarehousePage/WarehousePage";
import InventoryListPage from "./pages/InventoryListPage/InventoryListPage";
import InventoryFormPage from "./pages/InventoryFormPage/InventoryFormPage";
import InventoryItemPage from "./pages/InventoryItemPage/InventoryItemPage";
import Footer from "./components/Footer/Footer";

/*
Do NOT use react router's normal `Link` or `NavLink`components.
Do NOT use react router's `useNavigate` hook.
Use the extended versions of those which exist in this project instead.

In each page component, include an `<h1>` element; this will be considered the
top of the page.
If you want something else to be considered the top of the page, give it the
html attribute `id="main"`.

If you do that, all page navigation will be announced to assistive technology
automatically.
*/

/** Provides access to the announcement system to `Link` components */
export const AnnouncementContext = createContext(null);

function App() {
  const mainWrapperRef = useRef(null),
    skipLinkRef = useRef(null);
  const {
    announcement,
    setAnnouncement,
    refocusOnMain,
    userNavigated,
    canGoBack,
  } = useAnnouncementSystem(mainWrapperRef, skipLinkRef);

  return (
    <>
      <a className="skip-to-main" href="#main" ref={skipLinkRef}>
        Skip to Main Content
      </a>

      <AnnouncementContext.Provider
        value={{ setAnnouncement, refocusOnMain, userNavigated, canGoBack }}
      >
        <Header />

        <MainWrapper ref={mainWrapperRef}>
          <Routes>
            <Route path="/" element={<Navigate to="/warehouses" />} />

            <Route path="/warehouses">
              <Route index element={<WarehouseListPage />} />
              <Route path=":warehouseID" element={<WarehousePage />} />
              <Route path="add" element={<WarehouseFormPage />} />
              <Route path="edit/:warehouseID" element={<WarehouseFormPage />} />
            </Route>

            <Route path="/inventory">
              <Route index element={<InventoryListPage />} />
              <Route path=":itemID" element={<InventoryItemPage />} />
              <Route path="add" element={<InventoryFormPage />} />
              <Route path="edit/:inventoryID" element={<InventoryFormPage />} />
            </Route>
          </Routes>
        </MainWrapper>

        <Footer />
      </AnnouncementContext.Provider>
      <Announcement>{announcement}</Announcement>
    </>
  );
}

export default App;
