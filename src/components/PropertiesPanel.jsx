"use client"

import { useState, useEffect } from "react"
import { useElements } from "../context/ElementContext"
import { X } from "lucide-react"

function PropertiesPanel({ selectedElement, setSelectedElement }) {
  const { updateElement } = useElements()
  const [formValues, setFormValues] = useState({})

  useEffect(() => {
    if (selectedElement) {
      setFormValues({
        ...selectedElement.content,
        ...selectedElement.style,
      })
    }
  }, [selectedElement])

  if (!selectedElement) return null

  const handleClose = () => {
    setSelectedElement(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Separate content and style properties
    const contentProps = {}
    const styleProps = {}

    Object.entries(formValues).forEach(([key, value]) => {
      if (isContentProperty(key, selectedElement.type)) {
        contentProps[key] = value
      } else {
        styleProps[key] = value
      }
    })

    updateElement(selectedElement.id, {
      content: { ...selectedElement.content, ...contentProps },
      style: { ...selectedElement.style, ...styleProps },
    })
  }

  const isContentProperty = (prop, type) => {
    const contentProps = {
      heading: ["text"],
      paragraph: ["text"],
      image: ["src", "alt"],
      button: ["text", "link"],
      list: ["items"],
      link: ["text", "href"],
    }

    return contentProps[type]?.includes(prop) || false
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium">Element Properties</h3>
        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Element Type</label>
          <div className="px-3 py-2 bg-gray-100 rounded text-sm">
            {selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)}
          </div>
        </div>

        {renderFormFields()}

        <div className="pt-4">
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Apply Changes
          </button>
        </div>
      </form>
    </div>
  )

  function renderFormFields() {
    switch (selectedElement.type) {
      case "heading":
      case "paragraph":
        return (
          <>
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                Text Content
              </label>
              <textarea
                id="text"
                name="text"
                value={formValues.text || ""}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-1">
                Font Size
              </label>
              <input
                type="text"
                id="fontSize"
                name="fontSize"
                value={formValues.fontSize || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="fontWeight" className="block text-sm font-medium text-gray-700 mb-1">
                Font Weight
              </label>
              <select
                id="fontWeight"
                name="fontWeight"
                value={formValues.fontWeight || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Lighter</option>
              </select>
            </div>
          </>
        )

      case "image":
        return (
          <>
            <div>
              <label htmlFor="src" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="src"
                name="src"
                value={formValues.src || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="alt" className="block text-sm font-medium text-gray-700 mb-1">
                Alt Text
              </label>
              <input
                type="text"
                id="alt"
                name="alt"
                value={formValues.alt || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )

      case "button":
        return (
          <>
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                id="text"
                name="text"
                value={formValues.text || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                Button Link
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={formValues.link || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-1">
                Background Color
              </label>
              <input
                type="text"
                id="backgroundColor"
                name="backgroundColor"
                value={formValues.backgroundColor || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                Text Color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={formValues.color || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )

      case "container":
      case "section":
        return (
          <>
            <div>
              <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-1">
                Background Color
              </label>
              <input
                type="text"
                id="backgroundColor"
                name="backgroundColor"
                value={formValues.backgroundColor || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="padding" className="block text-sm font-medium text-gray-700 mb-1">
                Padding
              </label>
              <input
                type="text"
                id="padding"
                name="padding"
                value={formValues.padding || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="borderRadius" className="block text-sm font-medium text-gray-700 mb-1">
                Border Radius
              </label>
              <input
                type="text"
                id="borderRadius"
                name="borderRadius"
                value={formValues.borderRadius || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )

      default:
        return <div className="text-sm text-gray-500">No editable properties available for this element type.</div>
    }
  }
}

export default PropertiesPanel

