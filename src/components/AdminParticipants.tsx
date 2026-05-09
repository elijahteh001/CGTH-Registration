import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Download, 
  Users, 
  ChevronUp, 
  ChevronDown, 
  Plus, 
  Trash2, 
  Edit2, 
  X,
  Camera
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  category: string;
  church: string;
  status: 'Pending' | 'Approved' | 'Registered';
  statusColor: string;
  photo: string;
}

type SortKey = 'name' | 'category' | 'church' | 'status';
type SortOrder = 'asc' | 'desc' | null;

export default function ParticipantsList() {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'CG-2024-042', name: 'Elijah James', category: 'Solo', church: 'Grace Community Cathedral', status: 'Pending', statusColor: 'bg-secondary-fixed-dim', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100' },
    { id: 'CG-2024-018', name: 'Voices of Zion', category: 'Choir (24)', church: 'Zion Fellowship', status: 'Approved', statusColor: 'bg-primary-fixed-dim', photo: '' },
    { id: 'CG-2024-088', name: 'Sarah & David', category: 'Duo', church: "St. Jude's Parish", status: 'Registered', statusColor: 'bg-outline', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100' },
  ]);

  const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder }>({ key: 'name', order: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Participant>>({
    name: '',
    category: 'Solo',
    church: '',
    status: 'Pending',
    photo: ''
  });

  const handleSort = (key: SortKey) => {
    let order: SortOrder = 'asc';
    if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'desc';
    } else if (sortConfig.key === key && sortConfig.order === 'desc') {
      order = null;
    }
    setSortConfig({ key, order });
  };

  const filteredAndSortedParticipants = useMemo(() => {
    let result = [...participants];

    // Filter
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.church.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter) {
      result = result.filter(p => p.category.toLowerCase().includes(categoryFilter.toLowerCase()));
    }
    if (statusFilter) {
      result = result.filter(p => p.status.toLowerCase() === statusFilter.toLowerCase());
    }

    // Sort
    if (sortConfig.order) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key].toLowerCase();
        const valB = b[sortConfig.key].toLowerCase();
        if (valA < valB) return sortConfig.order === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [participants, searchTerm, categoryFilter, statusFilter, sortConfig]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this participant?')) {
      setParticipants(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleOpenModal = (participant?: Participant) => {
    if (participant) {
      setEditingParticipant(participant);
      setFormData(participant);
    } else {
      setEditingParticipant(null);
      setFormData({
        name: '',
        category: 'Solo',
        church: '',
        status: 'Pending',
        photo: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.church) {
      alert('Please fill in required fields.');
      return;
    }

    const statusColors = {
      'Pending': 'bg-secondary-fixed-dim',
      'Approved': 'bg-primary-fixed-dim',
      'Registered': 'bg-outline'
    };

    if (editingParticipant) {
      setParticipants(prev => prev.map(p => 
        p.id === editingParticipant.id 
          ? { ...p, ...formData, statusColor: statusColors[formData.status as keyof typeof statusColors] } as Participant 
          : p
      ));
    } else {
      const newParticipant: Participant = {
        id: `CG-2024-${Math.floor(Math.random() * 900) + 100}`,
        name: formData.name!,
        category: formData.category!,
        church: formData.church!,
        status: formData.status as any,
        statusColor: statusColors[formData.status as keyof typeof statusColors],
        photo: formData.photo || ''
      };
      setParticipants(prev => [...prev, newParticipant]);
    }
    setIsModalOpen(false);
  };

  const SortIndicator = ({ column }: { column: SortKey }) => {
    if (sortConfig.key !== column) return <ChevronUp size={14} className="opacity-20" />;
    if (sortConfig.order === 'asc') return <ChevronUp size={14} className="text-primary" />;
    if (sortConfig.order === 'desc') return <ChevronDown size={14} className="text-primary" />;
    return <ChevronUp size={14} className="opacity-20" />;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-secondary/30 pb-6 relative">
        <div className="relative z-10">
          <h1 className="font-display text-4xl text-primary mb-2">Participant Registry</h1>
          <div className="flex items-center gap-4 text-on-surface-variant font-medium">
            <span>Manage and review all competition entries.</span>
            <span className="w-1 h-1 rounded-full bg-secondary" />
            <span className="font-bold text-primary">Total: {participants.length}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => handleOpenModal()}
            className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold flex items-center gap-2 hover:bg-on-primary-fixed-variant transition-all shadow-md group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            Add Participant
          </button>
          <button className="px-6 py-2 border border-secondary text-secondary rounded-lg font-semibold flex items-center gap-2 hover:bg-secondary/5 transition-colors">
            <Download size={18} />
            Export
          </button>
        </div>
        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 flex items-center w-full max-w-[200px] justify-center opacity-50">
          <div className="h-[1px] w-full bg-secondary" />
          <div className="w-2 h-2 rounded-full bg-secondary mx-2" />
          <div className="h-[1px] w-full bg-secondary" />
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-secondary/20 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="flex flex-1 w-full gap-4 relative z-10">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input 
              type="text"
              placeholder="Search by name or church..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary outline-none transition-shadow shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="bg-surface border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary outline-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="solo">Solo</option>
            <option value="duo">Duo</option>
            <option value="choir">Choir</option>
          </select>
          <select 
            className="bg-surface border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="registered">Registered</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-secondary/20 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-secondary/30">
                <th 
                  className="py-4 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider cursor-pointer hover:bg-secondary/5 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Participant
                    <SortIndicator column="name" />
                  </div>
                </th>
                <th 
                  className="py-4 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider cursor-pointer hover:bg-secondary/5 transition-colors"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-2">
                    Category
                    <SortIndicator column="category" />
                  </div>
                </th>
                <th 
                  className="py-4 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider cursor-pointer hover:bg-secondary/5 transition-colors"
                  onClick={() => handleSort('church')}
                >
                  <div className="flex items-center gap-2">
                    Representing
                    <SortIndicator column="church" />
                  </div>
                </th>
                <th 
                  className="py-4 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider cursor-pointer hover:bg-secondary/5 transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Status
                    <SortIndicator column="status" />
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/10">
              <AnimatePresence>
                {filteredAndSortedParticipants.map((p, i) => (
                  <motion.tr 
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-surface-container-low transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        {p.photo ? (
                          <img src={p.photo} alt={p.name} className="w-10 h-10 rounded-full object-cover border border-secondary/20" />
                        ) : p.category.includes('Choir') ? (
                          <div className="w-10 h-10 rounded-full bg-surface-dim text-primary flex items-center justify-center border border-secondary/20">
                            <Users size={20} />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-display font-bold text-lg">
                            {p.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <div>
                          <p className="font-display text-lg text-primary">{p.name}</p>
                          <p className="text-xs text-on-surface-variant font-medium">ID: {p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        p.category.includes('Choir') ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-dim text-on-surface'
                      }`}>
                        {p.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-on-surface">{p.church}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${p.statusColor} shadow-md`} />
                        <span className={`text-sm font-bold ${p.status === 'Pending' ? 'text-secondary-fixed-dim' : p.status === 'Approved' ? 'text-primary' : 'text-on-surface-variant'}`}>
                          {p.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right text-primary whitespace-nowrap">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(p)}
                          className="hover:bg-primary/10 p-2 rounded-lg transition-colors text-primary"
                          title="Edit Participant"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)}
                          className="hover:bg-error/10 p-2 rounded-lg transition-colors text-error"
                          title="Remove Participant"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredAndSortedParticipants.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-on-surface-variant font-medium">
                    No participants found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-surface px-6 py-4 border-t border-secondary/20 flex items-center justify-between">
          <span className="text-sm text-on-surface-variant font-medium">
            Showing {filteredAndSortedParticipants.length} entries
          </span>
          <div className="flex gap-2">
            {[1].map(page => (
              <button 
                key={page}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all shadow-sm ${
                  page === 1 ? 'bg-primary text-on-primary' : 'border border-outline-variant bg-white text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-surface-container-lowest border border-secondary/20 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-outline-variant flex items-center justify-between">
                <h3 className="font-display text-2xl text-primary">
                  {editingParticipant ? 'Edit Participant' : 'Add New Participant'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="relative group cursor-pointer" onClick={() => alert('Photo upload would be implemented with FileAPI')}>
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center overflow-hidden">
                      {formData.photo ? (
                        <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="text-outline" size={32} />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center text-white text-xs font-bold">
                      Change
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">FullName</label>
                    <input 
                      type="text" 
                      className="w-full bg-surface border border-outline-variant rounded-lg p-3 outline-none focus:border-primary transition-colors text-on-surface"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">Category</label>
                    <select 
                      className="w-full bg-surface border border-outline-variant rounded-lg p-3 outline-none focus:border-primary transition-colors text-on-surface"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Solo">Solo</option>
                      <option value="Duo">Duo</option>
                      <option value="Choir (24)">Choir (24)</option>
                      <option value="Instrumental">Instrumental</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">Status</label>
                    <select 
                      className="w-full bg-surface border border-outline-variant rounded-lg p-3 outline-none focus:border-primary transition-colors text-on-surface"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Registered">Registered</option>
                    </select>
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">Representing Church</label>
                    <input 
                      type="text" 
                      className="w-full bg-surface border border-outline-variant rounded-lg p-3 outline-none focus:border-primary transition-colors text-on-surface"
                      value={formData.church}
                      onChange={(e) => setFormData({ ...formData, church: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-surface-container-low border-t border-outline-variant flex justify-end gap-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-lg font-bold text-on-surface-variant hover:bg-surface-dim transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-2 bg-primary text-on-primary rounded-lg font-bold shadow-lg hover:bg-on-primary-fixed-variant transition-all"
                >
                  Save Participant
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
