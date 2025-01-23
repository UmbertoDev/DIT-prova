import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

type Repository = {
  id: string
  name: string
  version: string
}

type AddReleaseModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (selectedRepos: Repository[]) => void
}

const availableRepos: Repository[] = [
  { id: "repo1", name: "frontend-app", version: "1.1.0" },
  { id: "repo2", name: "backend-api", version: "1.0.0" },
  { id: "repo3", name: "database-service", version: "1.0.0" },
  { id: "repo4", name: "auth-service", version: "1.2.0" },
]

export default function AddReleaseModal({ isOpen, onClose, onConfirm }: AddReleaseModalProps) {
  const [selectedRepos, setSelectedRepos] = useState<Repository[]>([])

  const handleCheckboxChange = (repo: Repository) => {
    setSelectedRepos((prev) =>
      prev.some((r) => r.id === repo.id) ? prev.filter((r) => r.id !== repo.id) : [...prev, repo],
    )
  }

  const handleConfirm = () => {
    onConfirm(selectedRepos)
    setSelectedRepos([])
    onClose()
  }

  const handleCancel = () => {
    setSelectedRepos([])
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add New Release</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4 min-h-[50px] p-2 border rounded-md">
            {selectedRepos.map((repo) => (
              <span
                key={repo.id}
                className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2"
              >
                {repo.name}
              </span>
            ))}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Repository Name</TableHead>
                <TableHead>Version</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availableRepos.map((repo) => (
                <TableRow key={repo.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRepos.some((r) => r.id === repo.id)}
                      onCheckedChange={() => handleCheckboxChange(repo)}
                    />
                  </TableCell>
                  <TableCell>{repo.name}</TableCell>
                  <TableCell>{repo.version}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

