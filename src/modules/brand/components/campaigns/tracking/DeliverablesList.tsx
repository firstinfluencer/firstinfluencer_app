import React from 'react';
import { DeliverableCard } from './DeliverableCard';

interface DeliverableListProps {
  deliverables: Array<{
    id: string;
    type: 'photo' | 'video' | 'reel';
    platform: 'instagram' | 'youtube' | 'tiktok';
    creatorName: string;
    status: {
      step: 'content_creation' | 'review' | 'approved' | 'published';
      status: 'completed' | 'in_progress' | 'pending';
      date?: Date;
    };
  }>;
  onApproveDeliverable: (id: string) => void;
  onRejectDeliverable: (id: string) => void;
}

export function DeliverablesList({ 
  deliverables,
  onApproveDeliverable,
  onRejectDeliverable
}: DeliverableListProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Campaign Deliverables</h2>
        <span className="text-sm text-gray-500">
          {deliverables.length} {deliverables.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="grid gap-6">
        {deliverables.map((deliverable) => (
          <DeliverableCard
            key={deliverable.id}
            deliverable={deliverable}
            onApprove={() => onApproveDeliverable(deliverable.id)}
            onReject={() => onRejectDeliverable(deliverable.id)}
          />
        ))}
      </div>
    </div>
  );
}