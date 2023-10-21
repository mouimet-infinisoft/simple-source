#!/bin/bash

# Convert app name to PascalCase
to_pascal_case() {
    echo $1 | sed -r 's/(^|-)([a-z])/\U\2/g'
}

# Function to scaffold a shared app
scaffold_shared_app() {
    local app_name=$1
    local app_pascal_name=$(to_pascal_case $app_name)

    mkdir -p "./apps/$app_name/pages"
    mkdir -p "./apps/$app_name/components"
    
    echo "import React from 'react';" > "./apps/$app_name/pages/$app_pascal_name.js"
    echo "function $app_pascal_name() {" >> "./apps/$app_name/pages/$app_pascal_name.js"
    echo "    return <div>Shared App: $app_name</div>;" >> "./apps/$app_name/pages/$app_pascal_name.js"
    echo "}" >> "./apps/$app_name/pages/$app_pascal_name.js"
    echo "export default $app_pascal_name;" >> "./apps/$app_name/pages/$app_pascal_name.js"
}

# Function to scaffold CRUD layout component
scaffold_crud_layout() {
    local app_name=$1
    local app_pascal_name=$(to_pascal_case $app_name)

    echo "import React from 'react';" > "./apps/$app_name/components/${app_pascal_name}Layout.js"
    echo "import { Outlet } from 'react-router-dom';" >> "./apps/$app_name/components/${app_pascal_name}Layout.js"
    echo "function ${app_pascal_name}Layout() {" >> "./apps/$app_name/components/${app_pascal_name}Layout.js"
    echo "    return (" >> "./apps/$app_name/components/${app_pascal_name}Layout.js"
    echo "        <div className=\"${app_name}-layout\">" >> "./apps/$app_name/components/${app_pascal_name}Layout.js"
    echo "            {/* Header, Sidebar, etc. */}" >> "./apps/$app_name/components/${app_pascal_name}Layout.js"
    echo "            <Outlet />" >> "./apps/$app_name/components/${app_pascal_name}Layout.js"
    echo "        </div>" >> "./apps/$app_name/components/${app_pascal_name}Layout.js"
    echo "    );" >> "./apps/$app_name/components/${app_pascal_name}Layout.js"
    echo "}" >> "./apps/$app_name/components/${app_pascal_name}Layout.js"
    echo "export default ${app_pascal_name}Layout;" >> "./apps/$app_name/components/${app_pascal_name}Layout.js"
}

# Function to scaffold CRUD app
scaffold_crud_app() {
    local app_name=$1
    local singular_name=$2
    local app_pascal_name=$(to_pascal_case $app_name)
    local singular_pascal_name=$(to_pascal_case $singular_name)

    mkdir -p "./apps/$app_name/pages"
    mkdir -p "./apps/$app_name/components"

    # Generate CRUD layout
    scaffold_crud_layout $app_name

    # Generate basic CRUD pages
    for page in List Add Edit View; do
        echo "import React from 'react';" > "./apps/$app_name/pages/$page$singular_pascal_name.js"
        echo "function $page$singular_pascal_name() {" >> "./apps/$app_name/pages/$page$singular_pascal_name.js"
        echo "    return <div>$page $singular_name</div>;" >> "./apps/$app_name/pages/$page$singular_pascal_name.js"
        echo "}" >> "./apps/$app_name/pages/$page$singular_pascal_name.js"
        echo "export default $page$singular_pascal_name;" >> "./apps/$app_name/pages/$page$singular_pascal_name.js"
    done

    # Create routes file
    echo "import React from 'react';" > "./apps/$app_name/routes.js"
    echo "import { Route, Routes } from 'react-router-dom';" >> "./apps/$app_name/routes.js"
    echo "import ${app_pascal_name}Layout from './components/${app_pascal_name}Layout';" >> "./apps/$app_name/routes.js"
    echo "import List$singular_pascal_name from './pages/List$singular_pascal_name';" >> "./apps/$app_name/routes.js"
    echo "import Add$singular_pascal_name from './pages/Add$singular_pascal_name';" >> "./apps/$app_name/routes.js"
    echo "import Edit$singular_pascal_name from './pages/Edit$singular_pascal_name';" >> "./apps/$app_name/routes.js"
    echo "import View$singular_pascal_name from './pages/View$singular_pascal_name';" >> "./apps/$app_name/routes.js"
    if [ "$3" ]; then
        nested_shared_app_pascal_name=$(to_pascal_case $3)
        echo "import ${nested_shared_app_pascal_name} from '../$3/$3';" >> "./apps/$app_name/routes.js"
    fi
    echo "function ${app_pascal_name}Routes() {" >> "./apps/$app_name/routes.js"
    echo "    return (" >> "./apps/$app_name/routes.js"
    echo "        <Routes>" >> "./apps/$app_name/routes.js"
    echo "            <Route path=\"/\" element={<${app_pascal_name}Layout />}>" >> "./apps/$app_name/routes.js"
    echo "                <Route index element={<List$singular_pascal_name />} />" >> "./apps/$app_name/routes.js"
    echo "                <Route path=\"/add\" element={<Add$singular_pascal_name />} />" >> "./apps/$app_name/routes.js"
    echo "                <Route path=\"/:${singular_name^}id\" element={<View$singular_pascal_name />} />" >> "./apps/$app_name/routes.js"
    echo "                <Route path=\"/:${singular_name^}id/edit\" element={<Edit$singular_pascal_name />} />" >> "./apps/$app_name/routes.js"
    if [ "$3" ]; then
        echo "                <Route path=\"/shared\" element={<${nested_shared_app_pascal_name} />} />" >> "./apps/$app_name/routes.js"
    fi
    echo "            </Route>" >> "./apps/$app_name/routes.js"
    echo "        </Routes>" >> "./apps/$app_name/routes.js"
    echo "    );" >> "./apps/$app_name/routes.js"
    echo "}" >> "./apps/$app_name/routes.js"
    echo "export default ${app_pascal_name}Routes;" >> "./apps/$app_name/routes.js"
}

# User prompts and scaffolding logic
echo "Do you want to scaffold a (1) shared app, (2) CRUD app, or (3) nested CRUD app? Enter 1, 2, or 3:"
read choice

if [ "$choice" == "1" ]; then
    echo "Enter name for the shared app (e.g. contacts):"
    read shared_app_name
    scaffold_shared_app $shared_app_name

elif [ "$choice" == "2" ]; then
    echo "Enter name for the CRUD app:"
    read crud_app_name
    echo "Enter singular version of CRUD app name (e.g. user for users):"
    read singular_name
    scaffold_crud_app $crud_app_name $singular_name

elif [ "$choice" == "3" ]; then
    echo "Enter name for the main CRUD app:"
    read crud_app_name
    echo "Enter singular version of main CRUD app name (e.g. user for users):"
    read singular_name
    echo "Enter name for the nested CRUD app:"
    read nested_crud_app_name
    scaffold_crud_app $crud_app_name $singular_name $nested_crud_app_name

else
    echo "Invalid choice!"
fi
