import { useEffect, useState } from 'react';
import api from '../services/api';

interface Payment {
    id: string;
    source: string;
    amount: number;
    sender_name: string;
    sender_identifier: string | null;
    transaction_id: string | null;
    memo: string | null;
    received_at: string;
    matched: boolean;
    driver_id: string | null;
}

interface Driver {
    id: string;
    first_name: string;
    last_name: string;
}

interface Stats {
    total_payments: number;
    matched_payments: number;
    unmatched_payments: number;
    total_amount: number;
    matched_amount: number;
}

export default function Payments() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [assigning, setAssigning] = useState<string | null>(null);
    const [selectedDriver, setSelectedDriver] = useState<string>('');

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const [paymentsData, driversData, statsData] = await Promise.all([
                api.getUnrecognizedPayments(),
                api.getDrivers(),
                api.getPaymentStats(),
            ]);
            setPayments(paymentsData);
            setDrivers(driversData);
            setStats(statsData);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleAssign(paymentId: string) {
        if (!selectedDriver) return;
        try {
            await api.assignPayment(paymentId, selectedDriver, true);
            setAssigning(null);
            setSelectedDriver('');
            loadData();
        } catch (error) {
            console.error('Failed to assign payment:', error);
        }
    }

    const sourceColors: Record<string, string> = {
        zelle: '#6366f1',
        venmo: '#3b82f6',
        cashapp: '#22c55e',
        chime: '#14b8a6',
        stripe: '#8b5cf6',
    };

    return (
        <div>
            <div className="page-header">
                <h1>Payments</h1>
                <p>Review and assign unrecognized payments</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card primary">
                    <div className="stat-label">Total Amount</div>
                    <div className="stat-value">${stats?.total_amount?.toLocaleString() || 0}</div>
                </div>
                <div className="stat-card success">
                    <div className="stat-label">Matched</div>
                    <div className="stat-value">{stats?.matched_payments || 0}</div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-label">Unmatched</div>
                    <div className="stat-value">{stats?.unmatched_payments || 0}</div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Unrecognized Payments</h3>
                </div>

                {loading ? (
                    <div className="loading">Loading payments</div>
                ) : payments.length === 0 ? (
                    <div className="empty-state">
                        <p>All payments have been matched!</p>
                    </div>
                ) : (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Source</th>
                                    <th>Sender</th>
                                    <th>Memo</th>
                                    <th>Date</th>
                                    <th style={{ textAlign: 'right' }}>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.25rem 0.75rem',
                                                background: `${sourceColors[payment.source]}20`,
                                                color: sourceColors[payment.source],
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: 500,
                                                textTransform: 'uppercase',
                                            }}>
                                                {payment.source}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: 500, color: '#fff' }}>{payment.sender_name}</td>
                                        <td style={{ color: 'rgba(255,255,255,0.6)' }}>{payment.memo || '-'}</td>
                                        <td>{new Date(payment.received_at).toLocaleDateString()}</td>
                                        <td style={{ textAlign: 'right', fontWeight: 600, color: '#10b981' }}>
                                            ${payment.amount.toFixed(2)}
                                        </td>
                                        <td>
                                            {assigning === payment.id ? (
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <select
                                                        value={selectedDriver}
                                                        onChange={(e) => setSelectedDriver(e.target.value)}
                                                        style={{
                                                            padding: '0.375rem 0.5rem',
                                                            background: 'rgba(255,255,255,0.05)',
                                                            border: '1px solid rgba(255,255,255,0.1)',
                                                            borderRadius: '6px',
                                                            color: '#fff',
                                                            fontSize: '0.75rem',
                                                        }}
                                                    >
                                                        <option value="">Select driver...</option>
                                                        {drivers.map((d) => (
                                                            <option key={d.id} value={d.id}>
                                                                {d.first_name} {d.last_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button onClick={() => handleAssign(payment.id)} className="btn btn-sm btn-success" disabled={!selectedDriver}>
                                                        Assign
                                                    </button>
                                                    <button onClick={() => { setAssigning(null); setSelectedDriver(''); }} className="btn btn-sm btn-secondary">
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <button onClick={() => setAssigning(payment.id)} className="btn btn-sm btn-primary">
                                                    Assign to Driver
                                                </button>
                                            )}
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
