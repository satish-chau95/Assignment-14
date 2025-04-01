import { useDrag } from "react-dnd"
import { Type, Image, Square, BoxIcon as ButtonIcon, ListOrdered, LinkIcon, Layout, Columns } from "lucide-react"

function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col overflow-y-auto">
      <h2 className="font-semibold text-lg mb-4">Elements</h2>

      <div className="space-y-2">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Basic</h3>
        <div className="grid grid-cols-2 gap-2">
          <DraggableElement type="heading" icon={<Type size={18} />} label="Heading" />
          <DraggableElement type="paragraph" icon={<Type size={18} />} label="Paragraph" />
          <DraggableElement type="image" icon={<Image size={18} />} label="Image" />
          <DraggableElement type="button" icon={<ButtonIcon size={18} />} label="Button" />
          <DraggableElement type="list" icon={<ListOrdered size={18} />} label="List" />
          <DraggableElement type="link" icon={<LinkIcon size={18} />} label="Link" />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Layout</h3>
        <div className="grid grid-cols-2 gap-2">
          <DraggableElement type="container" icon={<Square size={18} />} label="Container" />
          <DraggableElement type="section" icon={<Layout size={18} />} label="Section" />
          <DraggableElement type="columns" icon={<Columns size={18} />} label="Columns" />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Templates</h3>
        <div className="space-y-2">
          <TemplateItem name="Hero Section" />
          <TemplateItem name="Contact Form" />
          <TemplateItem name="Feature Grid" />
          <TemplateItem name="Testimonials" />
        </div>
      </div>
    </div>
  )
}

function DraggableElement({ type, icon, label }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ELEMENT",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`flex items-center p-2 bg-gray-50 rounded border border-gray-200 cursor-grab ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="mr-2 text-gray-600">{icon}</div>
      <span className="text-sm">{label}</span>
    </div>
  )
}

function TemplateItem({ name }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TEMPLATE",
    item: { type: "template", name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`p-2 bg-blue-50 rounded border border-blue-200 cursor-grab ${isDragging ? "opacity-50" : ""}`}
    >
      <span className="text-sm font-medium">{name}</span>
    </div>
  )
}

export default Sidebar

