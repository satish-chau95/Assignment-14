"use client"

import { createContext, useContext, useReducer } from "react"

const ElementContext = createContext()

const initialState = {
  elements: [],
  nextId: 1,
}

function elementReducer(state, action) {
  switch (action.type) {
    case "ADD_ELEMENT": {
      const newElement = {
        ...action.payload,
        id: `element-${state.nextId}`,
      }
      return {
        ...state,
        elements: [...state.elements, newElement],
        nextId: state.nextId + 1,
      }
    }
    case "UPDATE_ELEMENT": {
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === action.payload.id ? { ...el, ...action.payload.properties } : el,
        ),
      }
    }
    case "DELETE_ELEMENT": {
      return {
        ...state,
        elements: state.elements.filter((el) => el.id !== action.payload),
      }
    }
    case "REORDER_ELEMENTS": {
      return {
        ...state,
        elements: action.payload,
      }
    }
    default:
      return state
  }
}

export function ElementProvider({ children }) {
  const [state, dispatch] = useReducer(elementReducer, initialState)

  const addElement = (element) => {
    dispatch({ type: "ADD_ELEMENT", payload: element })
  }

  const updateElement = (id, properties) => {
    dispatch({ type: "UPDATE_ELEMENT", payload: { id, properties } })
  }

  const deleteElement = (id) => {
    dispatch({ type: "DELETE_ELEMENT", payload: id })
  }

  const reorderElements = (elements) => {
    dispatch({ type: "REORDER_ELEMENTS", payload: elements })
  }

  return (
    <ElementContext.Provider
      value={{
        elements: state.elements,
        addElement,
        updateElement,
        deleteElement,
        reorderElements,
      }}
    >
      {children}
    </ElementContext.Provider>
  )
}

export function useElements() {
  const context = useContext(ElementContext)
  if (!context) {
    throw new Error("useElements must be used within an ElementProvider")
  }
  return context
}

