"use client"

import { useDrop } from "react-dnd"
import { useElements } from "../context/ElementContext"
import ElementRenderer from "./ElementRenderer"

function Canvas({ selectedElement, setSelectedElement, previewMode }) {
  const { elements, addElement } = useElements()

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ["ELEMENT", "TEMPLATE"],
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset()
      const canvasRect = document.getElementById("canvas-container").getBoundingClientRect()

      // Calculate position relative to canvas
      const x = offset.x - canvasRect.left
      const y = offset.y - canvasRect.top

      if (item.type === "template") {
        // Handle template drops - would add multiple elements in a real app
        addTemplateElements(item.name, x, y)
      } else {
        // Handle single element drops
        addElement({
          type: item.type,
          position: { x, y },
          size: getDefaultSize(item.type),
          content: getDefaultContent(item.type),
          style: getDefaultStyle(item.type),
        })
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }))

  const addTemplateElements = (templateName, x, y) => {
    // In a real app, this would add multiple elements based on the template
    switch (templateName) {
      case "Hero Section":
        addElement({
          type: "section",
          position: { x, y },
          size: { width: 600, height: 300 },
          content: {},
          style: {
            backgroundColor: "#f3f4f6",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        })
        break
      default:
        // Add a placeholder for other templates
        addElement({
          type: "container",
          position: { x, y },
          size: { width: 400, height: 200 },
          content: { text: `${templateName} Template` },
          style: {
            backgroundColor: "#e0f2fe",
            padding: "20px",
            borderRadius: "8px",
          },
        })
    }
  }

  const getDefaultSize = (type) => {
    switch (type) {
      case "heading":
        return { width: 300, height: 40 }
      case "paragraph":
        return { width: 300, height: 80 }
      case "image":
        return { width: 200, height: 150 }
      case "button":
        return { width: 120, height: 40 }
      case "container":
        return { width: 400, height: 200 }
      case "section":
        return { width: 600, height: 300 }
      case "columns":
        return { width: 600, height: 200 }
      default:
        return { width: 200, height: 100 }
    }
  }

  const getDefaultContent = (type) => {
    switch (type) {
      case "heading":
        return { text: "Heading Text" }
      case "paragraph":
        return { text: "This is a paragraph of text. Click to edit this text and customize it." }
      case "image":
        return { src: "/placeholder.svg?height=150&width=200", alt: "Image description" }
      case "button":
        return { text: "Button", link: "#" }
      case "list":
        return { items: ["Item 1", "Item 2", "Item 3"] }
      case "link":
        return { text: "Link Text", href: "#" }
      default:
        return {}
    }
  }

  const getDefaultStyle = (type) => {
    const baseStyle = {
      padding: "8px",
      borderRadius: "4px",
    }

    switch (type) {
      case "heading":
        return {
          ...baseStyle,
          fontSize: "24px",
          fontWeight: "bold",
        }
      case "paragraph":
        return {
          ...baseStyle,
          fontSize: "16px",
          lineHeight: "1.5",
        }
      case "button":
        return {
          ...baseStyle,
          backgroundColor: "#3b82f6",
          color: "white",
          textAlign: "center",
          cursor: "pointer",
        }
      case "container":
        return {
          ...baseStyle,
          backgroundColor: "#f9fafb",
          border: "1px solid #e5e7eb",
        }
      case "section":
        return {
          ...baseStyle,
          backgroundColor: "#f3f4f6",
          padding: "20px",
        }
      case "columns":
        return {
          ...baseStyle,
          display: "flex",
          gap: "20px",
        }
      default:
        return baseStyle
    }
  }

  return (
    <div
      id="canvas-container"
      ref={drop}
      className={`flex-1 bg-white overflow-auto p-4 ${
        isOver && canDrop ? "bg-blue-50" : ""
      } ${previewMode ? "p-0" : ""}`}
    >
      <div
        className={`relative ${previewMode ? "" : "min-h-[1200px] border-2 border-dashed border-gray-300 rounded-lg"}`}
      >
        {elements.length === 0 && !previewMode && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Drag and drop elements here to build your website
          </div>
        )}

        {elements.map((element) => (
          <ElementRenderer
            key={element.id}
            element={element}
            isSelected={selectedElement?.id === element.id}
            onClick={() => !previewMode && setSelectedElement(element)}
            previewMode={previewMode}
          />
        ))}
      </div>
    </div>
  )
}

export default Canvas

