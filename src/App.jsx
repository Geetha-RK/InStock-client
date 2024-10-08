import './App.scss';
import { createContext, useRef } from 'react'
import { useAnnouncementSystem } from './hooks/useAnnouncementSystem';
import { Route, Routes } from "react-router-dom";
import Announcement from './components/Announcement/Announcement';

import WarehousePage from './pages/WarehousePage/WarehousePage';
import Header from './components/Header/Header';
import WarehouseListPage from './pages/WarehouseListPage/WarehouseListPage';
import WarehouseFormPage from './pages/WarehouseFormPage/WarehouseFormPage';
import InventoryListPage from './pages/InventoryListPage/InventoryListPage';
import InventoryFormPage from './pages/InventoryFormPage/InventoryFormPage';
import InventoryItemPage from './pages/InventoryItemPage/InventoryItemPage';

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
		userNavigated
	} = useAnnouncementSystem(mainWrapperRef, skipLinkRef);

	return (<>
		<a className="skip-to-main" href="#main" ref={skipLinkRef}>Skip to Main Content</a>

		<AnnouncementContext.Provider value={{setAnnouncement, refocusOnMain, userNavigated}}>

			{/* Header component and other content that needs to be above the main content can go here */}
			<Header></Header>

			<main className="main" ref={mainWrapperRef}>
				<Routes>
					<Route path="/"
						element={<WarehouseListPage/>}/>
					<Route path="/warehouses"
						element={<WarehouseListPage/>} />
					<Route path="/warehouses/:warehouseID"
						element={<WarehousePage/>} />
					<Route path="/warehouses/add"
						element={<WarehouseFormPage/>} />
					<Route path="/warehouses/edit/:warehouseID"
						element={<WarehouseFormPage/>} />

					<Route path="/inventory"
						element={<InventoryListPage/>} />
					<Route path="/inventory/:itemID"
						element={<InventoryItemPage/>} />
					<Route path="/inventory/add"
						element={<InventoryFormPage/>} />
					<Route path="/inventory/edit/:itemID"
						element={<InventoryFormPage/>} />
				</Routes>
			</main>

			{/* Footer component and other content that needs to be below the main content can go here */}

		</AnnouncementContext.Provider>
		<Announcement>{announcement}</Announcement>
	</>)
}

export default App;
