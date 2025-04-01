"use client"

import { useRef, useState } from "react"
import { useDrag } from "react-dnd"
import { useElements } from "../context/ElementContext"
import { X } from "lucide-react"

function ElementRenderer({ element, isSelected, onClick, previewMode }) {
  const { updateElement, deleteElement } = useElements()
  const [isResizing, setIsResizing] = useState(false)
  const resizeStartPos = useRef({ x: 0, y: 0 })
  const initialSize = useRef({ width: 0, height: 0 })

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "PLACED_ELEMENT",
      item: { id: element.id, type: element.type },
      canDrag: !previewMode,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [element.id, previewMode],
  )

  const handleMouseDown = (e) => {
    if (previewMode) return

    const handle = e.target.getAttribute("data-handle")
    if (handle) {
      e.stopPropagation()
      setIsResizing(true)
      resizeStartPos.current = { x: e.clientX, y: e.clientY }
      initialSize.current = { ...element.size }

      const handleMouseMove = (moveEvent) => {
        const deltaX = moveEvent.clientX - resizeStartPos.current.x
        const deltaY = moveEvent.clientY - resizeStartPos.current.y

        let newWidth = initialSize.current.width
        let newHeight = initialSize.current.height

        if (handle.includes("right")) {
          newWidth = Math.max(50, initialSize.current.width + deltaX)
        }
        if (handle.includes("bottom")) {
          newHeight = Math.max(30, initialSize.current.height + deltaY)
        }

        updateElement(element.id, {
          size: { width: newWidth, height: newHeight },
        })
      }

      const handleMouseUp = () => {
        setIsResizing(false)
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    deleteElement(element.id)
  }

  const renderContent = () => {
    switch (element.type) {
      case "heading":
        return <h2>{element.content.text}</h2>
      case "paragraph":
        return <p>{element.content.text}</p>
      case "image":
        return (
          <img
            src={element.content.src || "/placeholder.svg"}
            alt={element.content.alt}
            className="max-w-full h-auto"
          />
        )
      case "button":
        return <button className="w-full h-full">{element.content.text}</button>
      case "list":
        return (
          <ul className="list-disc pl-5">
            {element.content.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )
      case "link":
        return (
          <a href={element.content.href} className="text-blue-600 underline">
            {element.content.text}
          </a>
        )
      case "container":
      case "section":
      case "columns":
        return <div className="w-full h-full flex items-center justify-center text-gray-400">{element.type}</div>
      default:
        return <div>Unknown element type</div>
    }
  }

  const style = {
    position: "absolute",
    left: `${element.position.x}px`,
    top: `${element.position.y}px`,
    width: `${element.size.width}px`,
    height: `${element.size.height}px`,
    ...element.style,
    opacity: isDragging ? 0.5 : 1,
    cursor: previewMode ? "default" : "move",
  }

  if (previewMode) {
    // In preview mode, render just the content without editing controls
    return (
      <div style={style} className="overflow-hidden">
        {renderContent()}
      </div>
    )
  }

  return (
    <div
      ref={drag}
      style={style}
      className={`overflow-hidden ${isSelected ? "element-selected" : "element-highlight"}`}
      onClick={onClick}
      onMouseDown={handleMouseDown}
    >
      {renderContent()}

      {isSelected && (
        <>
          <button className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-md" onClick={handleDelete}>
            <X size={14} />
          </button>

          <div
            className="resizable-handle"
            style={{ bottom: 0, right: 0, cursor: "nwse-resize" }}
            data-handle="bottom-right"
          />
        </>
      )}
    </div>
  )
}

export default ElementRenderer

