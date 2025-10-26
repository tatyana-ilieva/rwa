'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Lock,
  Eye,
  Download,
  Clock,
  Users,
  BarChart3
} from 'lucide-react'

export default function ComplianceSection() {
  const complianceFeatures = [
    {
      icon: Shield,
      title: 'Regulatory Compliance',
      description: 'Full compliance with financial regulations and audit requirements',
      status: 'Active',
      color: 'text-green-400'
    },
    {
      icon: FileText,
      title: 'Audit Trails',
      description: 'Comprehensive transaction logging and reporting capabilities',
      status: 'Active',
      color: 'text-green-400'
    },
    {
      icon: Lock,
      title: 'Security Protocols',
      description: 'Enterprise-grade security with multi-layer protection',
      status: 'Active',
      color: 'text-green-400'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Real-time visibility into all operations and cash flows',
      status: 'Active',
      color: 'text-green-400'
    }
  ]

  const auditReports = [
    {
      id: 'audit-001',
      title: 'Smart Contract Security Audit',
      date: '2024-01-15',
      status: 'Completed',
      auditor: 'CertiK',
      findings: '0 Critical',
      color: 'bg-green-500'
    },
    {
      id: 'audit-002',
      title: 'Compliance Review',
      date: '2024-01-10',
      status: 'Completed',
      auditor: 'Deloitte',
      findings: '0 Issues',
      color: 'bg-green-500'
    },
    {
      id: 'audit-003',
      title: 'Risk Assessment',
      date: '2024-01-05',
      status: 'In Progress',
      auditor: 'PwC',
      findings: '2 Minor',
      color: 'bg-yellow-500'
    }
  ]

  const regulatoryFrameworks = [
    'MiFID II Compliance',
    'Basel III Standards',
    'SEC Regulations',
    'ESMA Guidelines',
    'ISO 27001 Security',
    'SOC 2 Type II'
  ]

  return (
    <section id="compliance" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Compliance & Audit
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Institutional-grade compliance framework with comprehensive audit trails, 
            regulatory reporting, and transparent operations.
          </p>
        </motion.div>

        {/* Compliance Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {complianceFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-blue-400" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
              
              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-semibold ${feature.color} bg-green-500/20`}>
                <CheckCircle className="w-4 h-4" />
                <span>{feature.status}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Audit Reports */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-2xl p-8 mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">Audit Reports</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export All</span>
            </button>
          </div>

          <div className="space-y-4">
            {auditReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${report.color}`}></div>
                  <div>
                    <h4 className="text-white font-semibold">{report.title}</h4>
                    <p className="text-gray-400 text-sm">
                      {report.date} • {report.auditor}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Findings</div>
                    <div className="text-white font-semibold">{report.findings}</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                      <Eye className="w-4 h-4 text-blue-400" />
                    </button>
                    <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                      <Download className="w-4 h-4 text-blue-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Regulatory Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Regulatory Framework</h3>
            
            <div className="space-y-4">
              {regulatoryFrameworks.map((framework, index) => (
                <motion.div
                  key={framework}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{framework}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Security Metrics</h3>
            
            <div className="space-y-6">
              {[
                { label: 'Security Score', value: 98, color: 'bg-green-500' },
                { label: 'Compliance Rate', value: 100, color: 'bg-blue-500' },
                { label: 'Audit Coverage', value: 95, color: 'bg-purple-500' },
                { label: 'Risk Mitigation', value: 92, color: 'bg-orange-500' }
              ].map((metric, index) => (
                <div key={metric.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">{metric.label}</span>
                    <span className="text-white font-semibold">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.value}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className={`h-2 rounded-full ${metric.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Security Status: Excellent</span>
              </div>
              <p className="text-gray-400 text-sm">
                All security protocols active with comprehensive monitoring
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
