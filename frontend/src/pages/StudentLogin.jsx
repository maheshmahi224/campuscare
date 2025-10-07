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
  const [bgImageError, setBgImageError] = useState(false)
  
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
      setLoading(false)
    }
  }

  const handleBgImageError = () => {
    setBgImageError(true)
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background with Fallback */}
      {!bgImageError ? (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://scientclg.vercel.app/assets/campus-hero-DQtRjtqk.jpg')`
          }}
          onError={handleBgImageError}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/50 to-indigo-900/70 backdrop-blur-[1px]"></div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}
      
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="max-w-md w-full">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400/20 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30">
                    <div className="h-16 w-16 bg-white/30 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                      SC
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Scient Campus Care</h1>
                <p className="text-white/80 text-lg">Student Portal</p>
              </div>

              {error && (
                <div className="bg-red-400/20 backdrop-blur-md border border-red-300/30 text-white px-4 py-3 rounded-xl mb-6 shadow-lg">
                  <div className="flex items-center">
                    <span className="text-red-200 mr-2">⚠</span>
                    {error}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/30 text-white placeholder-white/60 transition-all duration-300"
                    placeholder="Enter your roll number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/30 text-white placeholder-white/60 transition-all duration-300"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white/20 backdrop-blur-md text-white py-3 px-4 rounded-xl border border-white/30 hover:bg-white/30 hover:scale-[1.02] focus:ring-4 focus:ring-white/20 disabled:opacity-50 transition-all duration-300 shadow-lg font-semibold"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/80">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-white hover:text-white/90 font-semibold underline transition-colors">
                    Register here
                  </Link>
                </p>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowSupportModal(true)}
                  className="text-sm text-white/70 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20"
                >
                  🛠️ Having trouble? Contact Developer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-blue-600/80 backdrop-blur-md text-white p-6 rounded-t-3xl flex justify-between items-center border-b border-white/20">
              <h2 className="text-2xl font-bold">🛠️ Developer Support</h2>
              <button
                onClick={() => setShowSupportModal(false)}
                className="text-white hover:text-gray-200 text-2xl font-bold bg-white/20 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Lead Developer */}
              <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-3">👨‍💻 Lead Developer</h3>
                <div className="space-y-2">
                  <p className="text-white font-semibold text-xl">Vamshi Ramavath</p>
                  <p className="text-white/80 text-sm">Lead Developer - V Soft</p>
                  <div className="flex items-center gap-2 text-white mt-3">
                    <span>📧</span>
                    <a href="mailto:vamshinaikramavath@gmail.com" className="text-blue-200 hover:text-white underline">
                      vamshinaikramavath@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span>📱</span>
                    <a href="tel:+919014243908" className="text-blue-200 hover:text-white underline">
                      +91 9014243908
                    </a>
                  </div>
                </div>
              </div>

              {/* Developer */}
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-3">👨‍💻 Developer</h3>
                <div className="space-y-2">
                  <p className="text-white font-semibold text-xl">Maheshwara Chary</p>
                  <p className="text-white/80 text-sm">Developer - V Soft</p>
                  <div className="flex items-center gap-2 text-white mt-3">
                    <span>📧</span>
                    <a href="mailto:maheshmahi.ai224@gmail.com" className="text-green-200 hover:text-white underline">
                      maheshmahi.ai224@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span>📱</span>
                    <a href="tel:+917386775532" className="text-green-200 hover:text-white underline">
                      +91 7386775532
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Solutions */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4">🚀 Quick Solutions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl border border-white/20">
                    <span className="text-2xl">🌐</span>
                    <div>
                      <p className="font-semibold text-white">Check Internet Connection</p>
                      <p className="text-sm text-white/70">Ensure you have stable internet access</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl border border-white/20">
                    <span className="text-2xl">🧹</span>
                    <div>
                      <p className="font-semibold text-white">Clear Browser Cache</p>
                      <p className="text-sm text-white/70">Clear cache and try again</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl border border-white/20">
                    <span className="text-2xl">🔍</span>
                    <div>
                      <p className="font-semibold text-white">Try Different Browser</p>
                      <p className="text-sm text-white/70">Use Chrome, Firefox, or Edge</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl border border-white/20">
                    <span className="text-2xl">🔄</span>
                    <div>
                      <p className="font-semibold text-white">Restart Device</p>
                      <p className="text-sm text-white/70">Sometimes a simple restart helps</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Message */}
              <div className="text-center p-4 bg-blue-500/20 backdrop-blur-md rounded-xl border border-white/20">
                <p className="text-white font-medium">
                  I'll respond to your query as soon as possible! ⚡
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}

export default StudentLogin