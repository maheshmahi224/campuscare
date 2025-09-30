import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { authAPI } from "../services/api"
import Footer from "../components/Footer"

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    rollNumber: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await authAPI.studentLogin(formData)
      login(response.data, response.data.token)
      navigate("/dashboard")
    } catch (error) {
      setError(error.response?.data?.message || "Login failed")
    } finally {
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 glassmorphism">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <img
                  src="/logo.png"
                  alt="Scient Campus Care Logo"
                  className="h-16 w-16 object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Scient Campus Care</h1>
              <p className="text-gray-600">Student Login</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Roll Number
              </label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your roll number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowSupportModal(true)}
              className="text-sm text-gray-500 hover:text-blue-600 transition"
            >
              Having trouble? Contact Developer
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Developer Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-blue-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-2xl font-bold">🛠️ Developer Support</h2>
              <button
                onClick={() => setShowSupportModal(false)}
                className="text-white hover:text-gray-200 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Lead Developer */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-600">
                <h3 className="text-lg font-bold text-gray-800 mb-3">👨‍💻 Lead Developer</h3>
                <div className="space-y-2">
                  <p className="text-gray-900 font-semibold text-xl">Vamshi Ramavath</p>
                  <p className="text-gray-600 text-sm">Lead Developer - V Soft</p>
                  <div className="flex items-center gap-2 text-gray-700 mt-3">
                    <span>📧</span>
                    <a href="mailto:vamshinaikramavath@gmail.com" className="text-blue-600 hover:underline">
                      vamshinaikramavath@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span>📱</span>
                    <a href="tel:+919014243908" className="text-blue-600 hover:underline">
                      +91 9014243908
                    </a>
                  </div>
                </div>
              </div>

              {/* Developer */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-600">
                <h3 className="text-lg font-bold text-gray-800 mb-3">👨‍💻 Developer</h3>
                <div className="space-y-2">
                  <p className="text-gray-900 font-semibold text-xl">Maheshwara Chary</p>
                  <p className="text-gray-600 text-sm">Developer - V Soft</p>
                  <div className="flex items-center gap-2 text-gray-700 mt-3">
                    <span>📧</span>
                    <a href="mailto:maheshmahi.ai224@gmail.com" className="text-green-600 hover:underline">
                      maheshmahi.ai224@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span>📱</span>
                    <a href="tel:+917386775532" className="text-green-600 hover:underline">
                      +91 7386775532
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Solutions */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🚀 Quick Solutions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200">
                    <span className="text-2xl">🌐</span>
                    <div>
                      <p className="font-semibold text-gray-800">Check Internet Connection</p>
                      <p className="text-sm text-gray-600">Ensure you have stable internet access</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200">
                    <span className="text-2xl">🧹</span>
                    <div>
                      <p className="font-semibold text-gray-800">Clear Browser Cache</p>
                      <p className="text-sm text-gray-600">Clear cache and try again</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200">
                    <span className="text-2xl">🔍</span>
                    <div>
                      <p className="font-semibold text-gray-800">Try Different Browser</p>
                      <p className="text-sm text-gray-600">Use Chrome, Firefox, or Edge</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200">
                    <span className="text-2xl">🔄</span>
                    <div>
                      <p className="font-semibold text-gray-800">Restart Device</p>
                      <p className="text-sm text-gray-600">Sometimes a simple restart helps</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Message */}
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700 font-medium">
                  I'll respond to your query as soon as possible! ⚡
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default StudentLogin
