import React from 'react';
import { Outlet } from 'react-router-dom';
function DemandesContactsLayout() {
    return (
        <div className="mainapps-layout">
            {/* Header, Sidebar, etc. */}
            <Outlet />
        </div>
    );
}
export default DemandesContactsLayout;
