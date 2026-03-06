import React from 'react'
import { useState, useEffect } from 'react';
import { Shield, Users, TrendingUp, DollarSign, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import Modal from '../components/Modal';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { createAdmin, getAllAdmins, deleteAdmin, updateAdmin } from '../API/adminAPI';
import { getUser } from '../utils/auth';
import { toast } from 'react-toastify';

const ManageSuperAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    
  // Modal and form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: ''
  });
  const [editFormData, setEditFormData] = useState({
    id: null,
    full_name: '',
    username: '',
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const currentUser = getUser();

  // Fetch admins data
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await getAllAdmins();
      if (response.success) {
        setAdmins(response.data);
      }
    } catch (err) {
      console.error('Error fetching admins:', err);
      setError(err.response?.data?.message || 'Failed to load admins');
    } finally {
      setLoading(false);
    }
  };

  // Fetch admins on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle edit input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };



  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.full_name.trim()) {
      errors.full_name = 'Full name is required';
    }
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      errors.password = 'Password must be at least 4 characters';
    }
    return errors;
  };

  // Validate edit form
  const validateEditForm = () => {
    const errors = {};
    if (!editFormData.full_name.trim()) {
      errors.full_name = 'Full name is required';
    }
    if (!editFormData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!editFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editFormData.email)) {
      errors.email = 'Invalid email format';
    }
    if (editFormData.password && editFormData.password.length < 4) {
      errors.password = 'Password must be at least 4 characters';
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const adminData = {
        ...formData,
        created_by: currentUser?.id
      };
      
      const response = await createAdmin(adminData);
      
      if (response.success) {
        toast.success('Admin created successfully!');
        setIsModalOpen(false);
        // Reset form
        setFormData({
          full_name: '',
          username: '',
          email: '',
          password: ''
        });
        setFormErrors({});
        // Refresh the admin list
        fetchAdmins();
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      toast.error(error.response?.data?.message || 'Failed to create admin. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      full_name: '',
      username: '',
      email: '',
      password: ''
    });
    setFormErrors({});
  };

  // Open edit modal
  const handleOpenEditModal = (admin) => {
    setEditFormData({
      id: admin.id,
      full_name: admin.full_name,
      username: admin.username,
      email: admin.email,
      password: ''
    });
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditFormData({
      id: null,
      full_name: '',
      username: '',
      email: '',
      password: ''
    });
    setFormErrors({});
  };

  // Handle update admin
  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    
    const errors = validateEditForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const updateData = {
        full_name: editFormData.full_name,
        username: editFormData.username,
        email: editFormData.email
      };
      if (editFormData.password) {
        updateData.password = editFormData.password;
      }
      const response = await updateAdmin(editFormData.id, updateData);
      
      if (response.success) {
        toast.success('Admin updated successfully!');
        handleCloseEditModal();
        fetchAdmins();
      }
    } catch (error) {
      console.error('Error updating admin:', error);
      toast.error(error.response?.data?.message || 'Failed to update admin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete admin
  const handleDelete = async (adminId, adminName) => {
    if (!window.confirm(`Are you sure you want to delete admin "${adminName}"?`)) {
      return;
    }

    try {
      const response = await deleteAdmin(adminId);
      if (response.success) {
        toast.success('Admin deleted successfully!');
        fetchAdmins();
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast.error(error.response?.data?.message || 'Failed to delete admin.');
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (admin) => {
    const newStatus = admin.status === 1 ? 0 : 1;
    const statusText = newStatus === 1 ? 'active' : 'inactive';
    
    if (!window.confirm(`Change status of "${admin.full_name}" to ${statusText}?`)) {
      return;
    }

    try {
      const response = await updateAdmin(admin.id, {
        full_name: admin.full_name,
        username: admin.username,
        email: admin.email,
        status: newStatus
      });
      
      if (response.success) {
        toast.success(`Admin status updated to ${statusText}!`);
        fetchAdmins();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.response?.data?.message || 'Failed to update status.');
    }
  };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="p-2">
                    <h1 className="text-2xl font-bold">Manage Admins</h1>
                </div>

                <Button onClick={() => setIsModalOpen(true)}>
                    Add New Admin
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Admins"
                    value={admins.length.toString()}
                    icon={Shield}
                    color="blue"
                />
                <StatCard
                    title="Active Admins"
                    value={admins.filter(a => a.status === 1).length.toString()}
                    icon={Users}
                    color="green"
                />
                <StatCard
                    title="Total Users"
                    value="456"
                    icon={Users}
                    color="purple"
                />
                <StatCard
                    title="System Revenue"
                    value="$123,456"
                    icon={DollarSign}
                    color="orange"
                />
            </div>

            {/* Main Content */}
            <div className="w-full">
                {/* Admins List */}
                <Card title="Admin Accounts">
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Loading admins...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <p className="text-red-500">{error}</p>
                                <button 
                                    onClick={fetchAdmins}
                                    className="mt-2 text-blue-600 hover:text-blue-800"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Full Name</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Username</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Password</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Created At</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {admins.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-4 py-8 text-center text-sm text-gray-500">
                                                No admins found
                                            </td>
                                        </tr>
                                    ) : (
                                        admins.map((admin) => (
                                            <tr key={admin.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900 text-center">{admin.full_name}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600 text-center">{admin.username}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600 text-center">{admin.email}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600 text-center">{admin.password || '********'}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        admin.status === 1 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {admin.status === 1 ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                                    {admin.created_at ? new Date(admin.created_at).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td className="px-4 py-3 text-sm space-x-2 text-center">
                                                    <Button 
                                                        onClick={() => handleToggleStatus(admin)}
                                                        variant={admin.status === 1 ? 'outline' : 'success'}
                                                        className="inline-flex items-center gap-1"
                                                    >
                                                        {admin.status === 1 ? (
                                                            <><XCircle size={16} /> Deactivate</>
                                                        ) : (
                                                            <><CheckCircle size={16} /> Activate</>
                                                        )}
                                                    </Button>
                                                    <Button 
                                                        onClick={() => handleOpenEditModal(admin)}
                                                        variant="primary"
                                                        className="inline-flex items-center gap-1"
                                                    >
                                                        <Edit size={16} /> Edit
                                                    </Button>
                                                    <Button 
                                                        onClick={() => handleDelete(admin.id, admin.full_name)}
                                                        variant="danger"
                                                        className="inline-flex items-center gap-1"
                                                    >
                                                        <Trash2 size={16} /> Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </Card>

               
            </div>

            {/* Quick Actions */}
            <Card title="Quick Actions">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Shield className="w-6 h-6 text-blue-600 mb-2" />
                        <p className="text-sm font-medium">Manage Admins</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Users className="w-6 h-6 text-green-600 mb-2" />
                        <p className="text-sm font-medium">View All Users</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
                        <p className="text-sm font-medium">Analytics</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <DollarSign className="w-6 h-6 text-orange-600 mb-2" />
                        <p className="text-sm font-medium">Revenue Report</p>
                    </button>
                </div>
            </Card>




            {/* Add Admin Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Add New Admin"
                size="md"
            >
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Full Name"
                        name="full_name"
                        type="text"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        placeholder="Enter full name"
                        required
                        error={formErrors.full_name}
                    />

                    <InputField
                        label="Username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter username"
                        required
                        error={formErrors.username}
                    />

                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        required
                        error={formErrors.email}
                    />

                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                        required
                        error={formErrors.password}
                    />

                    <div className="flex justify-end space-x-3 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCloseModal}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Admin'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Edit Admin Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                title="Edit Admin"
                size="md"
            >
                <form onSubmit={handleUpdateAdmin}>
                    <InputField
                        label="Full Name"
                        name="full_name"
                        type="text"
                        value={editFormData.full_name}
                        onChange={handleEditInputChange}
                        placeholder="Enter full name"
                        required
                        error={formErrors.full_name}
                    />

                    <InputField
                        label="Username"
                        name="username"
                        type="text"
                        value={editFormData.username}
                        onChange={handleEditInputChange}
                        placeholder="Enter username"
                        required
                        error={formErrors.username}
                    />

                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        value={editFormData.email}
                        onChange={handleEditInputChange}
                        placeholder="Enter email address"
                        required
                        error={formErrors.email}
                    />

                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        value={editFormData.password}
                        onChange={handleEditInputChange}
                        placeholder="Enter new password (leave blank to keep current)"
                        error={formErrors.password}
                    />

                    <div className="flex justify-end space-x-3 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCloseEditModal}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Admin'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default ManageSuperAdmin
