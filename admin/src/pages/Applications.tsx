import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Application {
    id: string;
    status: string;
    form_data: {
        first_name?: string;
        last_name?: string;
        email?: string;
        phone?: string;
    };
    created_at: string;
}

export default function Applications() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        loadApplications();
    }, [filter]);

    async function loadApplications() {
        setLoading(true);
        try {
            const data = await api.getApplications(filter || undefined);
            setApplications(data);
        } catch (error) {
            console.error('Failed to load applications:', error);
        } finally {
            setLoading(false);
        }
    }

    const statusCounts = applications.reduce((acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div>
            <div className="page-header">
                <h1>Vetting Hub</h1>
                <p>Review and process driver applications</p>
            </div>

            <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
                <button
                    onClick={() => setFilter('')}
                    className={`stat-card ${!filter ? 'primary' : ''}`}
                    style={{ cursor: 'pointer', textAlign: 'left', border: !filter ? '1px solid rgba(102, 126, 234, 0.3)' : undefined }}
                >
                    <div className="stat-label">All</div>
                    <div className="stat-value">{applications.length}</div>
                </button>
                <button
                    onClick={() => setFilter('pending')}
                    className={`stat-card ${filter === 'pending' ? 'warning' : ''}`}
                    style={{ cursor: 'pointer', textAlign: 'left' }}
                >
                    <div className="stat-label">Pending</div>
                    <div className="stat-value">{statusCounts['pending'] || 0}</div>
                </button>
                <button
                    onClick={() => setFilter('approved')}
                    className={`stat-card ${filter === 'approved' ? 'success' : ''}`}
                    style={{ cursor: 'pointer', textAlign: 'left' }}
                >
                    <div className="stat-label">Approved</div>
                    <div className="stat-value">{statusCounts['approved'] || 0}</div>
                </button>
                <button
                    onClick={() => setFilter('declined')}
                    className={`stat-card ${filter === 'declined' ? 'danger' : ''}`}
                    style={{ cursor: 'pointer', textAlign: 'left' }}
                >
                    <div className="stat-label">Declined</div>
                    <div className="stat-value">{statusCounts['declined'] || 0}</div>
                </button>
            </div>

            <div className="card">
                {loading ? (
                    <div className="loading">Loading applications</div>
                ) : applications.length === 0 ? (
                    <div className="empty-state">
                        <p>No applications found</p>
                    </div>
                ) : (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Applicant</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Submitted</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app.id}>
                                        <td style={{ fontWeight: 500, color: '#fff' }}>
                                            {app.form_data?.first_name} {app.form_data?.last_name}
                                        </td>
                                        <td>{app.form_data?.email}</td>
                                        <td>{app.form_data?.phone}</td>
                                        <td>{new Date(app.created_at).toLocaleDateString()}</td>
                                        <td><span className={`badge ${app.status}`}>{app.status}</span></td>
                                        <td>
                                            <Link to={`/applications/${app.id}`} className="btn btn-sm btn-secondary">
                                                Review
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
