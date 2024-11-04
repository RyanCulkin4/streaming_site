'use client'

import { useState } from 'react'
import { Menu, User, Search, Folder, File, Upload, Download, Share2, Trash2, MoreHorizontal, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Footer } from '@/components/Footer'
import { LoggedInHeader } from '@/components/LoggedIn'

export default function CloudStorage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedView, setSelectedView] = useState('grid')

  const storageUsage = 65 // Percentage of storage used

  const files = [
    { name: 'Project Proposal.docx', type: 'file', size: '2.5 MB', lastModified: '2023-08-20' },
    { name: 'Financial Report.xlsx', type: 'file', size: '1.8 MB', lastModified: '2023-08-18' },
    { name: 'Presentation Slides', type: 'folder', items: 12, lastModified: '2023-08-15' },
    { name: 'Product Images', type: 'folder', items: 45, lastModified: '2023-08-10' },
    { name: 'Meeting Notes.pdf', type: 'file', size: '567 KB', lastModified: '2023-08-05' },
    { name: 'Code Backup', type: 'folder', items: 78, lastModified: '2023-07-30' },
    { name: 'User Manual.pdf', type: 'file', size: '3.2 MB', lastModified: '2023-07-25' },
    { name: 'Marketing Assets', type: 'folder', items: 23, lastModified: '2023-07-20' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <LoggedInHeader/>
      {/* Header */}
      <header className="bg-white shadow-md p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex items-center">
          <div className="flex items-center">
            <Folder className="h-8 w-8 text-blue-500 mr-2" />
            <span className="text-xl font-bold text-gray-800">CloudDrive</span>
            <Button variant="ghost" size="icon" className="lg:hidden ml-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <nav className="hidden lg:flex space-x-4 justify-center flex-grow">
            {['My Drive', 'Shared with me', 'Recent', 'Starred', 'Trash'].map((item) => (
              <a key={item} href="#" className="text-gray-600 hover:text-gray-900">{item}</a>
            ))}
          </nav>
          <div className="flex items-center space-x-4 ml-auto">
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
            <User className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow mt-16 p-6">
        <div className="container mx-auto">
          {/* Search and View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input type="search" placeholder="Search in drive" className="pl-10 pr-4 py-2 w-full" />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={selectedView === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('list')}
              >
                List
              </Button>
              <Button
                variant={selectedView === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('grid')}
              >
                Grid
              </Button>
            </div>
          </div>

          {/* Storage Usage */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">Storage</h2>
            <Progress value={storageUsage} className="h-2 mb-2" />
            <p className="text-sm text-gray-600">{storageUsage}% of 100 GB used</p>
          </div>

          {/* File List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">My Files</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className={selectedView === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4' : 'divide-y'}>
                {files.map((file, index) => (
                  <div key={index} className={selectedView === 'grid' ? 'bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center text-center' : 'flex items-center justify-between p-4 hover:bg-gray-50'}>
                    {file.type === 'folder' ? (
                      <Folder className={`h-12 w-12 text-blue-500 ${selectedView === 'list' ? 'mr-4' : 'mb-2'}`} />
                    ) : (
                      <File className={`h-12 w-12 text-gray-400 ${selectedView === 'list' ? 'mr-4' : 'mb-2'}`} />
                    )}
                    <div className={selectedView === 'grid' ? 'mt-2' : 'flex-grow'}>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {file.type === 'folder' ? `${file.items} items` : file.size}
                      </p>
                    </div>
                    <p className={`text-xs text-gray-400 ${selectedView === 'grid' ? 'mt-2' : ''}`}>
                      Last modified: {file.lastModified}
                    </p>
                    {selectedView === 'list' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            <span>Share</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
        <Footer/>
      </div>
  )
}