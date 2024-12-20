```tsx
// Update the imports
import { Edit } from 'lucide-react';

// Add to the header section, next to the close button
<div className="flex items-center space-x-4">
  <motion.button
    onClick={() => onEdit(campaign)}
    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
    whileHover={{ scale: 1.05 }}
  >
    <Edit className="w-5 h-5 text-gray-500" />
  </motion.button>
  <button
    onClick={onClose}
    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
  >
    <X className="w-5 h-5 text-gray-500" />
  </button>
</div>
```