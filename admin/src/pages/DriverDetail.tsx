import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

interface LedgerEntry {
    id: string;
    type: string;
    amount: number;
    description: string;
    created_at: string;
}

interface Alias {
    id: string;
    alias_type: string;
    alias_value: string;
}

export default function DriverDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [driver, setDriver] = useState<Driver | null>(null);
    const [ledger, setLedger] = useState<LedgerEntry[]>([]);
    const [aliases, setAliases] = useState<Alias[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (id) loadData();
    }, [id]);

    async function loadData() {
        try {
            const [driverData, ledgerData, aliasData] = await Promise.all([
                api.getDriver(id!),
                api.getDriverLedger(id!),
                api.getDriverAliases(id!),
            ]);
            setDriver(driverData);
            setLedger(ledgerData);
            setAliases(aliasData);
        } catch (error) {
            console.error('Failed to load driver:', error);
        } finally {
            setLoading(false);
        }
    }

    async function toggleBilling() {
        if (!driver) return;
        setUpdating(true);
        try {
            await api.updateDriverBilling(driver.id, !driver.billing_active);
            loadData();
        } catch (error) {
            console.error('Failed to update billing:', error);
        } finally {
            setUpdating(false);
        }
    }

    if (loading) {
        return <div className="loading">Loading driver</div>;
    }

    if (!driver) {
        return <div className="empty-state">Driver not found</div>;
    }

    return (
        <div>
            <div className="page-header">
                <button onClick={() => navigate('/drivers')} className="btn btn-sm btn-secondary" style={{ marginBottom: '1rem' }}>
                    Back to Drivers
                </button>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1>{driver.first_name} {driver.last_name}</h1>
                        <p>Driver since {new Date(driver.created_at).toLocaleDateString()}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: driver.balance >= 0 ? '#10b981' : '#ef4444' }}>
                            ${driver.balance?.toFixed(2) || '0.00'}
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>Current Balance</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="card">
                    <div className="stat-label">Contact</div>
                    <div style={{ color: '#fff', marginTop: '0.5rem' }}>{driver.email}</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)' }}>{driver.phone}</div>
                </div>
                <div className="card">
                    <div className="stat-label">Billing Rate</div>
                    <div style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, marginTop: '0.5rem' }}>
                        ${driver.billing_rate} / {driver.billing_type}
                    </div>
                </div>
                <div className="card">
                    <div className="stat-label">Billing Status</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                        <span className={`badge ${driver.billing_active ? 'approved' : 'declined'}`}>
                            {driver.billing_active ? 'Active' : 'Paused'}
                        </span>
                        <button onClick={toggleBilling} className="btn btn-sm btn-secondary" disabled={updating}>
                            {driver.billing_active ? 'Pause' : 'Resume'}
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="card">
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Ledger History</h3>
                    {ledger.length === 0 ? (
                        <div className="empty-state">No transactions yet</div>
                    ) : (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Description</th>
                                        <th>Type</th>
                                        <th style={{ textAlign: 'right' }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ledger.map((entry) => (
                                        <tr key={entry.id}>
                                            <td>{new Date(entry.created_at).toLocaleDateString()}</td>
                                            <td>{entry.description}</td>
                                            <td><span className={`badge ${entry.type}`}>{entry.type}</span></td>
                                            <td style={{ textAlign: 'right', fontWeight: 600, color: entry.type === 'credit' ? '#10b981' : '#ef4444' }}>
                                                {entry.type === 'credit' ? '+' : '-'}${entry.amount.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="card">
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Payment Aliases</h3>
                    {aliases.length === 0 ? (
                        <div className="empty-state" style={{ padding: '1rem' }}>No aliases configured</div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {aliases.map((alias) => (
                                <div key={alias.id} style={{
                                    padding: '0.75rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                }}>
                                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                                        {alias.alias_type}
                                    </div>
                                    <div style={{ color: '#fff' }}>{alias.alias_value}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
