import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Staff {
    id: string;
    email: string;
    name: string;
    role: string;
    created_at: string;
}

export default function Settings() {
    const { user } = useAuth();
    const [loading] = useState(false);

    return (
        <div>
            <div className="page-header">
                <h1>Settings</h1>
                <p>System configuration and staff management</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="card">
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Your Profile</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                                Name
                            </div>
                            <div style={{ color: '#fff', fontSize: '1.1rem' }}>{user?.name}</div>
                        </div>
                        <div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                                Email
                            </div>
                            <div style={{ color: '#fff' }}>{user?.email}</div>
                        </div>
                        <div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                                Role
                            </div>
                            <span className={`badge ${user?.role === 'admin' ? 'approved' : 'pending'}`} style={{ textTransform: 'capitalize' }}>
                                {user?.role}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>System Status</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Backend API</span>
                            <span className="badge approved">Connected</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Database</span>
                            <span className="badge approved">Connected</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Gmail API</span>
                            <span className="badge approved">Configured</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'rgba(255,255,255,0.7)' }}>OpenPhone SMS</span>
                            <span className="badge pending">Needs API Key</span>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Cron Jobs</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Job</th>
                                    <th>Schedule</th>
                                    <th>Description</th>
                                    <th>Command</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ fontWeight: 500, color: '#fff' }}>Payment Parser</td>
                                    <td><code style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>*/5 * * * *</code></td>
                                    <td>Parse payment emails from Gmail every 5 minutes</td>
                                    <td><code style={{ color: '#667eea', fontSize: '0.75rem' }}>python scripts/parse_payments.py</code></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 500, color: '#fff' }}>Midnight Billing</td>
                                    <td><code style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>0 0 * * *</code></td>
                                    <td>Create daily debits, check late payments, send SMS</td>
                                    <td><code style={{ color: '#667eea', fontSize: '0.75rem' }}>python scripts/midnight_billing.py</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Environment Variables</h3>
                    <div style={{
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '8px',
                        padding: '1rem',
                        fontFamily: 'monospace',
                        fontSize: '0.8rem',
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: '1.8',
                    }}>
                        <div><span style={{ color: '#10b981' }}>DATABASE_URL</span>=postgresql://...</div>
                        <div><span style={{ color: '#10b981' }}>JWT_SECRET</span>=your-secret-key</div>
                        <div><span style={{ color: '#10b981' }}>GMAIL_CLIENT_ID</span>=configured</div>
                        <div><span style={{ color: '#10b981' }}>GMAIL_CLIENT_SECRET</span>=configured</div>
                        <div><span style={{ color: '#f59e0b' }}>OPENPHONE_API_KEY</span>=not set</div>
                        <div><span style={{ color: '#10b981' }}>OPENPHONE_PHONE_NUMBER</span>=+13123002032</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
