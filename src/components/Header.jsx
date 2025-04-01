"use client"

import { useState } from "react"
import { useElements } from "../context/ElementContext"

function Header({ previewMode, setPreviewMode }) {
  const [projectName, setProjectName] = useState("Untitled Website")
  const [isEditing, setIsEditing] = useState(false)
  const { elements } = useElements()

  const handleSave = () => {
    // In a real app, this would save to a backend
    const websiteData = {
      name: projectName,
      elements,
      lastSaved: new Date().toISOString(),
    }

    console.log("Saving website:", websiteData)
    alert("Website saved successfully!")
  }

  const handleExport = () => {
    // In a real app, this would generate the actual website files
    alert("Website exported successfully!")
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <div className="text-blue-600 font-bold text-xl mr-4">Websites.co.in</div>

        {isEditing ? (
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            className="border border-gray-300 rounded px-2 py-1 text-sm font-medium"
            autoFocus
          />
        ) : (
          <h1 className="text-sm font-medium cursor-pointer hover:text-blue-600" onClick={() => setIsEditing(true)}>
            {projectName}
          </h1>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50"
        >
          {previewMode ? "Edit Mode" : "Preview"}
        </button>

        <button
          onClick={handleSave}
          className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50"
        >
          Save
        </button>

        <button
          onClick={handleExport}
          className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Export Website
        </button>
      </div>
    </header>
  )
}

export default Header

