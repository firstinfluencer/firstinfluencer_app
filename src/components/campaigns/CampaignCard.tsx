// Update the budget display in CampaignCard
<div className="flex items-center text-sm text-gray-600">
  <DollarSign className="w-4 h-4 mr-2" />
  <span>Budget: {formatCurrency(campaign.budget)}</span>
</div>