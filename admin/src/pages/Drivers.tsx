import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Driver {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    billing_type: string;
    billing_rate: number;
    billing_active: boolean;
    balance: number;
    created_at: string;
}

export default function Drivers() {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadDrivers();
    }, []);

    async function loadDrivers() {
        try {
            const data = await api.getDrivers();
            setDrivers(data);
        } catch (error) {
            console.error('Failed to load drivers:', error);
        } finally {
            setLoading(false);
        }
    }

    const filteredDrivers = drivers.filter((d) =>
        `${d.first_name} ${d.last_name} ${d.email}`.toLowerCase().includes(search.toLowerCase())
    );

    const totalBalance = drivers.reduce((sum, d) => sum + (d.balance || 0), 0);
    const activeDrivers = drivers.filter((d) => d.billing_active).length;

    return (
        <div>
            <div className="page-header">
                <h1>Drivers</h1>
                <p>Manage your fleet drivers</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">Total Drivers</div>
                    <div className="stat-value">{drivers.length}</div>
                </div>
                <div className="stat-card success">
                    <div className="stat-label">Active Billing</div>
                    <div className="stat-value">{activeDrivers}</div>
                </div>
                <div className="stat-card primary">
                    <div className="stat-label">Total Balance</div>
                    <div className="stat-value" style={{ color: totalBalance >= 0 ? '#10b981' : '#ef4444' }}>
                        ${totalBalance.toFixed(2)}
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">All Drivers</h3>
                    <input
                        type="text"
                        placeholder="Search drivers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: '#fff',
                            width: '250px',
                        }}
                    />
                </div>

                {loading ? (
                    <div className="loading">Loading drivers</div>
                ) : filteredDrivers.length === 0 ? (
                    <div className="empty-state">No drivers found</div>
                ) : (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <th>Billing</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right' }}>Balance</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDrivers.map((driver) => (
                                    <tr key={driver.id}>
                                        <td style={{ fontWeight: 500, color: '#fff' }}>
                                            {driver.first_name} {driver.last_name}
                                        </td>
                                        <td>
                                            <div>{driver.email}</div>
                                            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>{driver.phone}</div>
                                        </td>
                                        <td>
                                            ${driver.billing_rate}/{driver.billing_type}
                                        </td>
                                        <td>
                                            <span className={`badge ${driver.billing_active ? 'approved' : 'declined'}`}>
                                                {driver.billing_active ? 'Active' : 'Paused'}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right', fontWeight: 600, color: driver.balance >= 0 ? '#10b981' : '#ef4444' }}>
                                            ${driver.balance?.toFixed(2) || '0.00'}
                                        </td>
                                        <td>
                                            <Link to={`/drivers/${driver.id}`} className="btn btn-sm btn-secondary">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
