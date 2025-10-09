
export const formatCurrency = (amount) =>{
    return new Intl.NumberFormat('en-IN',{
        style:'currency',
        currency:'INR',
    }).format(amount)
}
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN',{
        year:'numeric',
        month:'short',
        day:'numeric'
    })
}
export const formatDateTime = (date) =>{
    return new Date(date).toLocaleDateString('en-IN',{
        year:'numeric',
        month:'short',
        day:'numeric',
        hour:'2-digit',
        minute:'2-digit'
    })
}
export const calculateAge = (birthDate) =>{
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const mounthDiff = today.getMonth() - birth.getMonth()
    if (mounthDiff < 0 || (mounthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age
}
export const isExpiringSoon = (expiryDate , days = 30) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= days && diffDays > 0
}
export const inExpired = (expiryDate) =>{
    return new Date(expiryDate) < new Date()
}

export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    dispensed: 'bg-green-100 text-green-800',
    expired: 'bg-red-100 text-red-800',
    completed: 'bg-green-100 text-green-800',
    returned: 'bg-orange-100 text-orange-800',
    exchanged: 'bg-blue-100 text-blue-800',
  };
  
  return colors[status] || 'bg-gray-100 text-gray-800';
};