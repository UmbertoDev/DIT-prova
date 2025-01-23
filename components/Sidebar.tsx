import type React from "react"

const nodeTypes = ["circle", "diamond", "rectangle"]

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Node Types</h2>
      {nodeTypes.map((type) => (
        <div
          key={type}
          className="bg-white p-2 mb-2 rounded cursor-move"
          onDragStart={(event) => onDragStart(event, type)}
          draggable
        >
          {type.charAt(0).toUpperCase() + type.slice(1)} Node
        </div>
      ))}
    </aside>
  )
}

