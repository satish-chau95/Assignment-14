"use client"

import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { motion } from "framer-motion"
import Sidebar from "./components/Sidebar"
import Canvas from "./components/Canvas"
import PropertiesPanel from "./components/PropertiesPanel"
import Header from "./components/Header"
import { ElementProvider } from "./context/ElementContext"
import "./App.css"

function App() {
  const [selectedElement, setSelectedElement] = useState(null)
  const [previewMode, setPreviewMode] = useState(false)

  return (
    <DndProvider backend={HTML5Backend}>
      <ElementProvider>
        <motion.div
          className="flex flex-col h-screen bg-gray-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header previewMode={previewMode} setPreviewMode={setPreviewMode} />

          <motion.div className="flex flex-1 overflow-hidden">
            {!previewMode && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Sidebar />
              </motion.div>
            )}

            <div className={`flex flex-1 ${!previewMode && "overflow-hidden"}`}>
              <Canvas
                selectedElement={selectedElement}
                setSelectedElement={setSelectedElement}
                previewMode={previewMode}
              />

              {!previewMode && selectedElement && (
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <PropertiesPanel selectedElement={selectedElement} setSelectedElement={setSelectedElement} />
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </ElementProvider>
    </DndProvider>
  )
}

export default App
