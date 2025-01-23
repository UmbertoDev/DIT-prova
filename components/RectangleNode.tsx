import { useState, useCallback } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RectangleNode({ data, id }: NodeProps) {
  const [label, setLabel] = useState(data.label)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedType, setSelectedType] = useState(data.type || "Type A")

  const onDoubleClick = useCallback(() => {
    setIsEditing(true)
  }, [])

  const onLabelChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(evt.target.value)
  }, [])

  const onKeyDown = useCallback((evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      setIsEditing(false)
    }
  }, [])

  return (
    <div
      className="w-48 h-32 bg-yellow-200 border-2 border-yellow-500 flex flex-col items-center justify-center p-2"
      onDoubleClick={onDoubleClick}
    >
      {isEditing ? (
        <input
          className="bg-transparent text-center w-full mb-2"
          value={label}
          onChange={onLabelChange}
          onKeyDown={onKeyDown}
          autoFocus
        />
      ) : (
        <div className="mb-2">{label}</div>
      )}
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Type A">Type A</SelectItem>
          <SelectItem value="Type B">Type B</SelectItem>
          <SelectItem value="Type C">Type C</SelectItem>
        </SelectContent>
      </Select>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

