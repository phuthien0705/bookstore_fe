const checkIsAdminOrManager = (roles) => {
    return roles.includes('Admin') || roles.includes('Manager');
};

export default checkIsAdminOrManager;
