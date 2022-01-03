module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ae4f8016529679c8f86f6dbb8e0ce608'),
  },
});
