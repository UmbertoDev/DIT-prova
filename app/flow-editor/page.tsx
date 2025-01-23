"use client"

import { useCallback } from "react"
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  ConnectionMode,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow"
import "reactflow/dist/style.css"
import CircleNode from "@/components/CircleNode"
import DiamondNode from "@/components/DiamondNode"
import RectangleNode from "@/components/RectangleNode"
import Sidebar from "@/components/Sidebar"

const nodeTypes = {
  circle: CircleNode,
  diamond: DiamondNode,
  rectangle: RectangleNode,
}

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { project } = useReactFlow()

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const type = event.dataTransfer.getData("application/reactflow")

      if (typeof type === "undefined" || !type) {
        return
      }

      const position = project({
        x: event.clientX,
        y: event.clientY,
      })
      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: `${type} node` },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [project, setNodes],
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDrop={onDrop}
      onDragOver={onDragOver}
      nodeTypes={nodeTypes}
      connectionMode={ConnectionMode.Loose}
      fitView
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  )
}

export default function FlowEditor() {
  return (
    <div className="flex h-[calc(100vh-80px)]">
      <Sidebar />
      <ReactFlowProvider>
        <div className="flex-grow">
          <Flow />
        </div>
      </ReactFlowProvider>
    </div>
  )
}

