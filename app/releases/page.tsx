"use client"

import React, { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronRight, Plus, ArrowDown, ArrowUp } from "lucide-react"
import AddReleaseModal from "@/components/AddReleaseModal"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

type Repository = {
  id: string
  name: string
  version: string
}

type Release = {
  id: number
  version: string
  date: string
  repositories: Repository[]
}

type SortDirection = "asc" | "desc" | null
type SortConfig = {
  key: string
  direction: SortDirection
}

const initialReleases: Release[] = [
  {
    id: 1,
    version: "1.0.0",
    date: "2023-01-01",
    repositories: [
      { id: "repo1", name: "frontend-app", version: "1.0.0" },
      { id: "repo2", name: "backend-api", version: "1.0.0" },
    ],
  },
  {
    id: 2,
    version: "1.1.0",
    date: "2023-02-15",
    repositories: [
      { id: "repo1", name: "frontend-app", version: "1.1.0" },
      { id: "repo3", name: "database-service", version: "1.0.0" },
    ],
  },
]

function SortButton({
  active,
  direction,
  onClick,
}: { active: boolean; direction: SortDirection; onClick: () => void }) {
  return (
    <Button variant="ghost" onClick={onClick} className="h-8 px-2">
      {direction === "asc" ? (
        <ArrowUp className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")} />
      ) : direction === "desc" ? (
        <ArrowDown className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")} />
      ) : (
        <ArrowDown className="h-4 w-4 text-muted-foreground" />
      )}
    </Button>
  )
}

export default function Releases() {
  const [releases, setReleases] = useState<Release[]>(initialReleases)
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mainFilters, setMainFilters] = useState({ version: "", date: "" })
  const [detailFilters, setDetailFilters] = useState({ name: "", version: "" })
  const [mainSort, setMainSort] = useState<SortConfig>({ key: "", direction: null })
  const [detailSort, setDetailSort] = useState<SortConfig>({ key: "", direction: null })

  const toggleRow = (id: number) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(id) ? prevExpandedRows.filter((rowId) => rowId !== id) : [...prevExpandedRows, id],
    )
  }

  const handleMainSort = (key: string) => {
    setMainSort((current) => ({
      key,
      direction:
        current.key === key
          ? current.direction === "desc"
            ? "asc"
            : current.direction === "asc"
              ? null
              : "desc"
          : "desc",
    }))
  }

  const handleDetailSort = (key: string) => {
    setDetailSort((current) => ({
      key,
      direction:
        current.key === key
          ? current.direction === "desc"
            ? "asc"
            : current.direction === "asc"
              ? null
              : "desc"
          : "desc",
    }))
  }

  const filteredAndSortedReleases = useMemo(() => {
    let result = [...releases]

    if (mainFilters.version || mainFilters.date) {
      result = result.filter(
        (release) =>
          (!mainFilters.version || release.version.toLowerCase().includes(mainFilters.version.toLowerCase())) &&
          (!mainFilters.date || release.date.includes(mainFilters.date)),
      )
    }

    if (mainSort.direction && mainSort.key) {
      result.sort((a, b) => {
        const aValue = a[mainSort.key as keyof Release]
        const bValue = b[mainSort.key as keyof Release]
        const modifier = mainSort.direction === "asc" ? 1 : -1
        return aValue < bValue ? -modifier : aValue > bValue ? modifier : 0
      })
    }

    return result
  }, [releases, mainFilters, mainSort])

  const getFilteredAndSortedRepositories = (repositories: Repository[]) => {
    let result = [...repositories]

    if (detailFilters.name || detailFilters.version) {
      result = result.filter(
        (repo) =>
          (!detailFilters.name || repo.name.toLowerCase().includes(detailFilters.name.toLowerCase())) &&
          (!detailFilters.version || repo.version.toLowerCase().includes(detailFilters.version.toLowerCase())),
      )
    }

    if (detailSort.direction && detailSort.key) {
      result.sort((a, b) => {
        const aValue = a[detailSort.key as keyof Repository]
        const bValue = b[detailSort.key as keyof Repository]
        const modifier = detailSort.direction === "asc" ? 1 : -1
        return aValue < bValue ? -modifier : aValue > bValue ? modifier : 0
      })
    }

    return result
  }

  const addNewRelease = (selectedRepos: Repository[]) => {
    const lastRelease = releases[releases.length - 1]
    const [major, minor, patch] = lastRelease.version.split(".").map(Number)
    const newVersion = `${major}.${minor}.${patch + 1}`

    const newRelease: Release = {
      id: lastRelease.id + 1,
      version: newVersion,
      date: format(new Date(), "yyyy-MM-dd"),
      repositories: selectedRepos,
    }

    setReleases([...releases, newRelease])
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Releases</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Release
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  Version
                  <SortButton
                    active={mainSort.key === "version"}
                    direction={mainSort.key === "version" ? mainSort.direction : null}
                    onClick={() => handleMainSort("version")}
                  />
                </div>
                <Input
                  placeholder="Filter version..."
                  value={mainFilters.version}
                  onChange={(e) => setMainFilters((prev) => ({ ...prev, version: e.target.value }))}
                  className="h-8 w-[150px]"
                />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  Date
                  <SortButton
                    active={mainSort.key === "date"}
                    direction={mainSort.key === "date" ? mainSort.direction : null}
                    onClick={() => handleMainSort("date")}
                  />
                </div>
                <Input
                  placeholder="Filter date..."
                  value={mainFilters.date}
                  onChange={(e) => setMainFilters((prev) => ({ ...prev, date: e.target.value }))}
                  className="h-8 w-[150px]"
                />
              </div>
            </TableHead>
            <TableHead>Repositories</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedReleases.map((release) => (
            <React.Fragment key={release.id}>
              <TableRow className="cursor-pointer hover:bg-muted/50" onClick={() => toggleRow(release.id)}>
                <TableCell>
                  {expandedRows.includes(release.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </TableCell>
                <TableCell>{release.version}</TableCell>
                <TableCell>{release.date}</TableCell>
                <TableCell>{release.repositories.length} repositories</TableCell>
              </TableRow>
              {expandedRows.includes(release.id) && (
                <TableRow key={`${release.id}-details`}>
                  <TableCell colSpan={4} className="p-0">
                    <div className="border rounded-lg m-4">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent">
                            <TableHead>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  Repository Name
                                  <SortButton
                                    active={detailSort.key === "name"}
                                    direction={detailSort.key === "name" ? detailSort.direction : null}
                                    onClick={() => handleDetailSort("name")}
                                  />
                                </div>
                                <Input
                                  placeholder="Filter name..."
                                  value={detailFilters.name}
                                  onChange={(e) => setDetailFilters((prev) => ({ ...prev, name: e.target.value }))}
                                  className="h-8 w-[150px]"
                                />
                              </div>
                            </TableHead>
                            <TableHead>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  Version
                                  <SortButton
                                    active={detailSort.key === "version"}
                                    direction={detailSort.key === "version" ? detailSort.direction : null}
                                    onClick={() => handleDetailSort("version")}
                                  />
                                </div>
                                <Input
                                  placeholder="Filter version..."
                                  value={detailFilters.version}
                                  onChange={(e) => setDetailFilters((prev) => ({ ...prev, version: e.target.value }))}
                                  className="h-8 w-[150px]"
                                />
                              </div>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getFilteredAndSortedRepositories(release.repositories).map((repo) => (
                            <TableRow key={repo.id} className="hover:bg-muted/50 border-t">
                              <TableCell className="font-medium">{repo.name}</TableCell>
                              <TableCell>{repo.version}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <AddReleaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={addNewRelease} />
    </div>
  )
}

