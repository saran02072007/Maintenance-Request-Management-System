import React from 'react';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Download,
  Printer,
  CheckCircle2,
  Clock,
  Layers,
  Wrench,
  AlertTriangle,
  Building2,
  Zap,
  Droplets,
  Armchair,
  Wind,
  Sparkles
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard.jsx';
import { useRequests } from '../context/RequestContext.jsx';
import { formatDate } from '../utils/formatters.js';
import { KRCT_COLLEGE_INFO, KRCT_CAMPUS_BLOCKS } from '../utils/krctCampusData.js';

export const ReportsPage = () => {
  const { report, requests } = useRequests();

  const summary = report.generateExecutiveSummary();
  const categoryBreakdown = report.getCategoryBreakdown();
  const priorityDistribution = report.getPriorityDistribution();
  const techWorkload = report.getTechnicianWorkload();

  // Block-wise statistics calculation
  const blockStats = Object.keys(KRCT_CAMPUS_BLOCKS).map((bName) => {
    const blockRequests = requests.filter(r => r.building === bName);
    const active = blockRequests.filter(r => r.status !== 'Completed' && r.status !== 'Rejected').length;
    const completed = blockRequests.filter(r => r.status === 'Completed').length;
    const total = blockRequests.length;
    return {
      name: bName,
      total,
      active,
      completed,
      info: KRCT_CAMPUS_BLOCKS[bName],
      percentage: requests.length > 0 ? Math.round((total / requests.length) * 100) : 0
    };
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const exportData = {
      institution: KRCT_COLLEGE_INFO,
      executiveSummary: summary,
      blockWiseStatistics: blockStats,
      generatedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `krct_maintenance_report_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div>
      {/* Header bar with KRCT Accreditation details */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#11235a', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
              KRCT AUTONOMOUS
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
              NAAC 'A+' Grade • TNEA 3701
            </span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#11235a' }}>
            Campus Maintenance Analytics & Executive Reports
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
            Facility operations metrics across Circuit Block (4 floors), Unwind Block (5 floors), and campus laboratories.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={handleExportJSON}>
            <Download size={15} /> Export JSON Data
          </button>
          <button className="btn-primary" onClick={handlePrint} style={{ background: '#11235a' }}>
            <Printer size={15} /> Print Official Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="metrics-grid">
        <MetricCard
          title="Overall Resolution Rate"
          value={`${summary.resolutionRate}%`}
          icon={CheckCircle2}
          iconBg="#ecfdf5"
          iconColor="#10b981"
          trend={`${summary.completed} of ${summary.total} resolved`}
          trendColor="#10b981"
        />
        <MetricCard
          title="Avg. Turnaround Time"
          value={`${summary.avgResolutionHours} hrs`}
          icon={Clock}
          iconBg="#eff6ff"
          iconColor="#2563eb"
          trend="Ticket to completion"
        />
        <MetricCard
          title="Active Work Orders"
          value={summary.inProgress}
          icon={Wrench}
          iconBg="#f0f9ff"
          iconColor="#0284c7"
          trend="In-progress repairs"
          trendColor="#0284c7"
        />
        <MetricCard
          title="High & Urgent Queue"
          value={summary.highUrgent}
          icon={AlertTriangle}
          iconBg="#fef2f2"
          iconColor="#dc2626"
          trend="Priority academic spaces"
          trendColor="#dc2626"
        />
      </div>

      {/* Block-wise Facilities Distribution Card */}
      <div className="card-container" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#11235a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={20} color="#11235a" /> KRCT Academic Blocks Distribution
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
              Work orders and ticket resolution across Circuit Block (4 floors) and Unwind Block (5 floors)
            </p>
          </div>
          <span style={{ fontSize: '0.78rem', background: '#eff6ff', color: '#1e3a8a', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700 }}>
            {requests.length} Total Complaints Logged
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {blockStats.map((b) => (
            <div
              key={b.name}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '1.25rem',
                background: '#fafbfc'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{b.name}</strong>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#1e3a8a', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                  {b.info.totalFloors} Floors
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.75rem' }}>
                {b.info.description}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                <span style={{ color: '#475569' }}>Total Tickets</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{b.total} ({b.percentage}%)</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                <span style={{ color: '#d97706' }}>Active / Pending</span>
                <span style={{ fontWeight: 700, color: '#d97706' }}>{b.active}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                <span style={{ color: '#059669' }}>Successfully Resolved</span>
                <span style={{ fontWeight: 700, color: '#059669' }}>{b.completed}</span>
              </div>

              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${b.percentage}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%)',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Category Breakdown + Priority Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Category Breakdown */}
        <div className="card-container" style={{ margin: 0, padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#11235a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} color="#1e3a8a" /> Category Volume Breakdown
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{summary.total} total</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {categoryBreakdown.map((cat) => (
              <div key={cat.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>{cat.name}</span>
                  <span style={{ color: '#64748b' }}>
                    <strong>{cat.count}</strong> ({cat.percentage}%)
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${cat.percentage}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #3b82f6 0%, #1e3a8a 100%)',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="card-container" style={{ margin: 0, padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#11235a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={18} color="#ea580c" /> Priority Urgency Distribution
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Academic Impact</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {priorityDistribution.map((p) => {
              let color = '#475569';
              if (p.priority === 'Urgent') color = '#dc2626';
              if (p.priority === 'High') color = '#ea580c';
              if (p.priority === 'Medium') color = '#1e3a8a';

              return (
                <div key={p.priority}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 700, color }}>{p.priority} Priority</span>
                    <span style={{ color: '#64748b' }}>
                      <strong>{p.count}</strong> requests ({p.percentage}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${p.percentage}%`,
                        height: '100%',
                        backgroundColor: color,
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Technician Performance Table */}
      <div className="card-container">
        <div className="card-header-bar">
          <div className="card-title-group">
            <h2>KRCT Maintenance Technician Workforce</h2>
            <p>Work order dispatch, block assignments, and completion throughput per technician</p>
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Technician Name</th>
                <th>Specialization & Wing</th>
                <th>Email Contact</th>
                <th>Active Work Orders</th>
                <th>Completed Repairs</th>
                <th>Total Assigned</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {techWorkload.map((tech) => (
                <tr key={tech.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{tech.name}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', background: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '4px', color: '#334155', fontWeight: 500 }}>
                      {tech.specialization}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{tech.email}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: tech.activeJobs > 0 ? '#1e3a8a' : '#64748b' }}>
                      {tech.activeJobs}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: '#059669' }}>
                      {tech.completedJobs}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>
                      {tech.totalAssigned}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        background: tech.activeJobs >= 3 ? '#fee2e2' : '#dcfce7',
                        color: tech.activeJobs >= 3 ? '#991b1b' : '#166534'
                      }}
                    >
                      {tech.activeJobs >= 3 ? 'Busy' : 'Available'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
