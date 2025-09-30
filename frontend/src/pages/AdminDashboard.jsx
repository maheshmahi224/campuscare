import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { complaintAPI, eventAPI } from "../services/api"
import Footer from "../components/Footer"

const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [complaints, setComplaints] = useState([])
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState({})
  const [showEventForm, setShowEventForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    description: ""
  })

  useEffect(() => {
    loadData()
  }, [activeSection])

  const loadData = async () => {
    try {
      if (activeSection === "dashboard" || activeSection === "complaints") {
        const [complaintsRes, statsRes] = await Promise.all([
          complaintAPI.getAllComplaints(),
          complaintAPI.getStats()
        ])
        setComplaints(complaintsRes.data)
        setStats(statsRes.data)
      }
      
      if (activeSection === "events") {
        const eventsRes = await eventAPI.getEvents()
        setEvents(eventsRes.data)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  const handleStatusUpdate = async (complaintId, newStatus) => {
    try {
      await complaintAPI.updateComplaint(complaintId, { status: newStatus })
      loadData()
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const handleEventSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingEvent) {
        await eventAPI.updateEvent(editingEvent._id, eventForm)
      } else {
        await eventAPI.createEvent(eventForm)
      }
      setShowEventForm(false)
      setEditingEvent(null)
      setEventForm({ title: "", date: "", description: "" })
      loadData()
    } catch (error) {
      console.error("Error saving event:", error)
    }
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setEventForm({
      title: event.title,
      date: event.date.split("T")[0],
      description: event.description
    })
    setShowEventForm(true)
  }

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await eventAPI.deleteEvent(eventId)
        loadData()
      } catch (error) {
        console.error("Error deleting event:", error)
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800"
      case "In Progress": return "bg-blue-100 text-blue-800"
      case "Resolved": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm border-b px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-gray-800">Scient Campus Care</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
      {/* Sidebar */}
      <div className={`${
        mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'
      } lg:block lg:relative w-64 bg-white shadow-lg`}>
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Scient Campus Care</h1>
          <p className="text-sm text-gray-600">Admin Panel</p>
        </div>
        <nav className="p-4">
          {[
            { id: "dashboard", label: "Dashboard", icon: "📊" },
            { id: "complaints", label: "View Complaints", icon: "📝" },
            { id: "events", label: "Manage Events", icon: "📅" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id)
                setMobileMenuOpen(false)
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition ${
                activeSection === item.id
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t mt-auto">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-500">{user?.rollNumber}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Dashboard Stats */}
          {activeSection === "dashboard" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">WELCOME MR.DR.B.BALARAM GARU (HOD-CSE)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <span className="text-2xl">📋</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Complaints</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total || 0}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <span className="text-2xl">⏳</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pending || 0}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <span className="text-2xl">🔧</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">In Progress</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.inProgress || 0}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <span className="text-2xl">✅</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Resolved</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.resolved || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Complaints */}
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Recent Complaints</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {complaints.slice(0, 5).map((complaint) => (
                    <div key={complaint._id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{complaint.title}</h4>
                          <p className="text-gray-600 text-sm mt-1">{complaint.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-500">Roll No: {complaint.rollNumber}</span>
                            <span className="text-sm text-gray-500">{complaint.category}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                          {complaint.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Complaints Management */}
          {activeSection === "complaints" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Complaints</h2>
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Roll No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {complaints.map((complaint) => (
                        <tr key={complaint._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {complaint.rollNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {complaint.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {complaint.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(complaint.status)}`}>
                              {complaint.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(complaint.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <select
                              value={complaint.status}
                              onChange={(e) => handleStatusUpdate(complaint._id, e.target.value)}
                              className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Events Management */}
          {activeSection === "events" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Manage Events</h2>
                <button
                  onClick={() => setShowEventForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add New Event
                </button>
              </div>

              {/* Event Form Modal */}
              {showEventForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                    <h3 className="text-xl font-bold mb-4">
                      {editingEvent ? "Edit Event" : "Add New Event"}
                    </h3>
                    <form onSubmit={handleEventSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Event Title
                        </label>
                        <input
                          type="text"
                          value={eventForm.title}
                          onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Event Date
                        </label>
                        <input
                          type="date"
                          value={eventForm.date}
                          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={eventForm.description}
                          onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                          required
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setShowEventForm(false)
                            setEditingEvent(null)
                            setEventForm({ title: "", date: "", description: "" })
                          }}
                          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          {editingEvent ? "Update Event" : "Create Event"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <div key={event._id} className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminDashboard
