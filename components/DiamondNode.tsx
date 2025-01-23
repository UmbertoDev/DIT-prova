import { useState, useCallback } from "react"
import { Handle, Position, type NodeProps } from "reactflow"

export default function DiamondNode({ data }: NodeProps) {
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
      className="w-32 h-32 bg-green-200 border-2 border-green-500 flex items-center justify-center"
      style={{ transform: "rotate(45deg)" }}
      onDoubleClick={onDoubleClick}
    >
      <div style={{ transform: "rotate(-45deg)" }}>
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
      </div>
      <Handle type="target" position={Position.Top} style={{ transform: "rotate(-45deg)" }} />
      <Handle type="source" position={Position.Bottom} style={{ transform: "rotate(-45deg)" }} />
      <Handle type="target" position={Position.Left} style={{ transform: "rotate(-45deg)" }} />
      <Handle type="source" position={Position.Right} style={{ transform: "rotate(-45deg)" }} />
    </div>
  )
}

