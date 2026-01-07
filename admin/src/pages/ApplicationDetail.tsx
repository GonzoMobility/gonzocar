import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Comment {
    id: string;
    content: string;
    staff_name: string;
    created_at: string;
}

interface Application {
    id: string;
    status: string;
    form_data: Record<string, unknown>;
    comments: Comment[];
    created_at: string;
    updated_at: string;
}

export default function ApplicationDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [application, setApplication] = useState<Application | null>(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (id) loadApplication();
    }, [id]);

    async function loadApplication() {
        try {
            const data = await api.getApplication(id!);
            setApplication(data);
        } catch (error) {
            console.error('Failed to load application:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleStatusChange(status: string) {
        if (!application) return;
        setSubmitting(true);
        try {
            await api.updateApplicationStatus(application.id, status);
            loadApplication();
        } catch (error) {
            console.error('Failed to update status:', error);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleAddComment(e: React.FormEvent) {
        e.preventDefault();
        if (!comment.trim() || !application) return;
        setSubmitting(true);
        try {
            await api.addComment(application.id, comment);
            setComment('');
            loadApplication();
        } catch (error) {
            console.error('Failed to add comment:', error);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <div className="loading">Loading application</div>;
    }

    if (!application) {
        return <div className="empty-state">Application not found</div>;
    }

    const formData = application.form_data as Record<string, string>;

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <button onClick={() => navigate('/applications')} className="btn btn-sm btn-secondary" style={{ marginBottom: '1rem' }}>
                        Back to Applications
                    </button>
                    <h1>{formData.first_name} {formData.last_name}</h1>
                    <p>Submitted on {new Date(application.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`badge ${application.status}`} style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                    {application.status}
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div>
                    <div className="card" style={{ marginBottom: '1.5rem' }}>
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Application Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {Object.entries(formData).map(([key, value]) => (
                                <div key={key}>
                                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                                        {key.replace(/_/g, ' ')}
                                    </div>
                                    <div style={{ color: '#fff' }}>{String(value) || '-'}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Comments</h3>

                        <form onSubmit={handleAddComment} style={{ marginBottom: '1.5rem' }}>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment..."
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    resize: 'vertical',
                                    minHeight: '80px',
                                    marginBottom: '0.75rem',
                                    boxSizing: 'border-box',
                                }}
                            />
                            <button type="submit" className="btn btn-primary" disabled={submitting || !comment.trim()}>
                                Add Comment
                            </button>
                        </form>

                        {application.comments.length === 0 ? (
                            <div className="empty-state" style={{ padding: '1rem' }}>No comments yet</div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {application.comments.map((c) => (
                                    <div key={c.id} style={{
                                        padding: '1rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 500, color: '#667eea' }}>{c.staff_name || 'Staff'}</span>
                                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
                                                {new Date(c.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)' }}>{c.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {application.status === 'pending' && (
                                <>
                                    <button onClick={() => handleStatusChange('approved')} className="btn btn-success" disabled={submitting}>
                                        Approve
                                    </button>
                                    <button onClick={() => handleStatusChange('hold')} className="btn btn-secondary" disabled={submitting}>
                                        Put on Hold
                                    </button>
                                    <button onClick={() => handleStatusChange('declined')} className="btn btn-danger" disabled={submitting}>
                                        Decline
                                    </button>
                                </>
                            )}
                            {application.status === 'hold' && (
                                <>
                                    <button onClick={() => handleStatusChange('approved')} className="btn btn-success" disabled={submitting}>
                                        Approve
                                    </button>
                                    <button onClick={() => handleStatusChange('declined')} className="btn btn-danger" disabled={submitting}>
                                        Decline
                                    </button>
                                </>
                            )}
                            {(application.status === 'approved' || application.status === 'declined') && (
                                <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                                    Application has been {application.status}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
