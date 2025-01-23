import type React from "react"
import { useState, useCallback } from "react"
import { Handle, Position, type NodeProps } from "reactflow"

export default function CircleNode({ data, id }: NodeProps) {
  const [label, setLabel] = useState(data.label)
  const [isEditing, setIsEditing] = useState(false)

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
      className="w-32 h-32 rounded-full bg-blue-200 flex items-center justify-center border-2 border-blue-500"
      onDoubleClick={onDoubleClick}
    >
      {isEditing ? (
        <input
          className="bg-transparent text-center w-full"
          value={label}
          onChange={onLabelChange}
          onKeyDown={onKeyDown}
          autoFocus
        />
      ) : (
        <div>{label}</div>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

