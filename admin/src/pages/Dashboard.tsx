import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Stats {
    total_payments: number;
    matched_payments: number;
    unmatched_payments: number;
    total_amount: number;
}

interface Application {
    id: string;
    status: string;
    form_data: { first_name?: string; last_name?: string; email?: string };
    created_at: string;
}

interface Driver {
    id: string;
    first_name: string;
    last_name: string;
    balance: number;
}

export default function Dashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const [statsData, appsData, driversData] = await Promise.all([
                api.getPaymentStats(),
                api.getApplications('pending'),
                api.getDrivers(),
            ]);
            setStats(statsData);
            setApplications(appsData.slice(0, 5));
            setDrivers(driversData.slice(0, 5));
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="loading">Loading dashboard</div>;
    }

    return (
        <div>
            <div className="page-header">
                <h1>Dashboard</h1>
                <p>Overview of your fleet operations</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card primary">
                    <div className="stat-label">Total Payments</div>
                    <div className="stat-value">${stats?.total_amount?.toLocaleString() || 0}</div>
                </div>
                <div className="stat-card success">
                    <div className="stat-label">Matched Payments</div>
                    <div className="stat-value">{stats?.matched_payments || 0}</div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-label">Pending Review</div>
                    <div className="stat-value">{stats?.unmatched_payments || 0}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Active Drivers</div>
                    <div className="stat-value">{drivers.length}</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Pending Applications</h3>
                        <Link to="/applications" className="btn btn-sm btn-secondary">View All</Link>
                    </div>
                    {applications.length === 0 ? (
                        <div className="empty-state">No pending applications</div>
                    ) : (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map((app) => (
                                        <tr key={app.id}>
                                            <td>
                                                <Link to={`/applications/${app.id}`} style={{ color: '#667eea', textDecoration: 'none' }}>
                                                    {app.form_data?.first_name} {app.form_data?.last_name}
                                                </Link>
                                            </td>
                                            <td>{new Date(app.created_at).toLocaleDateString()}</td>
                                            <td><span className={`badge ${app.status}`}>{app.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Driver Balances</h3>
                        <Link to="/drivers" className="btn btn-sm btn-secondary">View All</Link>
                    </div>
                    {drivers.length === 0 ? (
                        <div className="empty-state">No drivers yet</div>
                    ) : (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Driver</th>
                                        <th style={{ textAlign: 'right' }}>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {drivers.map((driver) => (
                                        <tr key={driver.id}>
                                            <td>
                                                <Link to={`/drivers/${driver.id}`} style={{ color: '#667eea', textDecoration: 'none' }}>
                                                    {driver.first_name} {driver.last_name}
                                                </Link>
                                            </td>
                                            <td style={{ textAlign: 'right', fontWeight: 600, color: driver.balance >= 0 ? '#10b981' : '#ef4444' }}>
                                                ${driver.balance?.toFixed(2) || '0.00'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
