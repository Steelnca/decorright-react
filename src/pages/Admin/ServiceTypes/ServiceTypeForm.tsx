import { useState, useEffect } from 'react';
import { ServiceTypesService, type ServiceType, type ServiceTypeInsert, type ServiceTypeUpdate } from '@/services/service-types.service';
import { ICONS } from '@/icons';

interface ServiceTypeFormProps {
    isOpen: boolean;
    serviceType: ServiceType | null;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ServiceTypeForm({ isOpen, serviceType, onClose, onSuccess }: ServiceTypeFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        display_name_en: '',
        display_name_ar: '',
        description: '',
        sort_order: 0,
        is_active: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (serviceType) {
            setFormData({
                name: serviceType.name,
                display_name_en: serviceType.display_name_en,
                display_name_ar: serviceType.display_name_ar || '',
                description: serviceType.description || '',
                sort_order: serviceType.sort_order,
                is_active: serviceType.is_active,
            });
        } else {
            setFormData({
                name: '',
                display_name_en: '',
                display_name_ar: '',
                description: '',
                sort_order: 0,
                is_active: true,
            });
        }
        setError(null);
    }, [serviceType, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (serviceType) {
                // Update existing
                const updateData: ServiceTypeUpdate = {
                    display_name_en: formData.display_name_en,
                    display_name_ar: formData.display_name_ar || null,
                    description: formData.description || null,
                    sort_order: formData.sort_order,
                    is_active: formData.is_active,
                };
                await ServiceTypesService.update(serviceType.id, updateData);
            } else {
                // Create new
                const insertData: ServiceTypeInsert = {
                    name: formData.name,
                    display_name_en: formData.display_name_en,
                    display_name_ar: formData.display_name_ar || null,
                    description: formData.description || null,
                    sort_order: formData.sort_order,
                    is_active: formData.is_active,
                };
                await ServiceTypesService.create(insertData);
            }
            onSuccess();
        } catch (err: any) {
            console.error('Failed to save service type:', err);
            setError(err.message || 'Failed to save service type');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-muted/15">
                    <h2 className="text-xl font-bold text-heading">
                        {serviceType ? 'Edit Service Type' : 'Add Service Type'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-surface/50 rounded-lg transition-colors"
                    >
                        <ICONS.xMark className="size-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Name (Code) */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Code (Machine ID) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase().replace(/[^A-Z_]/g, '') })}
                            placeholder="INTERIOR_DESIGN"
                            disabled={!!serviceType}
                            required
                            className="w-full px-4 py-2 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-surface/50 disabled:cursor-not-allowed font-mono"
                        />
                        <p className="text-xs text-muted mt-1">
                            {serviceType ? 'Code cannot be changed after creation' : 'Use SCREAMING_SNAKE_CASE (e.g., INTERIOR_DESIGN)'}
                        </p>
                    </div>

                    {/* English Display Name */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            English Display Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.display_name_en}
                            onChange={(e) => setFormData({ ...formData, display_name_en: e.target.value })}
                            placeholder="Interior Design"
                            required
                            className="w-full px-4 py-2 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    {/* Arabic Display Name */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Arabic Display Name
                        </label>
                        <input
                            type="text"
                            value={formData.display_name_ar}
                            onChange={(e) => setFormData({ ...formData, display_name_ar: e.target.value })}
                            placeholder="تصميم داخلي"
                            dir="rtl"
                            className="w-full px-4 py-2 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    {/* Sort Order */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Sort Order
                        </label>
                        <input
                            type="number"
                            value={formData.sort_order}
                            onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                            min="0"
                            className="w-full px-4 py-2 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <p className="text-xs text-muted mt-1">Lower numbers appear first in lists</p>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Description (Admin Notes)
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Optional notes for admins..."
                            rows={3}
                            className="w-full px-4 py-2 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={formData.is_active}
                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                            className="w-4 h-4 text-primary border-muted/30 rounded focus:ring-2 focus:ring-primary/50"
                        />
                        <label htmlFor="is_active" className="text-sm font-medium text-foreground">
                            Active (visible to users)
                        </label>
                    </div>
                </form>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-muted/15">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-foreground hover:bg-surface/50 rounded-lg transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading && <ICONS.cog className="size-4 animate-spin" />}
                        {serviceType ? 'Update' : 'Create'}
                    </button>
                </div>
            </div>
        </div>
    );
}
