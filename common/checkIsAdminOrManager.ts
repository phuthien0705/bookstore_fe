const checkIsAdminOrManager = (roles: any) => {
  if (roles && (roles.includes('Admin') || roles.includes('Manager')))
    return true;
  return false;
};

export default checkIsAdminOrManager;
