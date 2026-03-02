CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Create default admin user (password: admin123)
-- Note: This is a simple hash for demo purposes. In production, use proper password hashing.
INSERT INTO "Users" ("Email", "PasswordHash", "FirstName", "LastName", "CreatedAt", "IsActive") 
VALUES ('admin@dme.com', 'YWRtaW4xMjNTQUxU', 'Admin', 'User', NOW(), true)
ON CONFLICT ("Email") DO NOTHING;

-- Assign admin role to admin user
INSERT INTO "UserRoles" ("UserId", "RoleId", "AssignedAt") 
SELECT u."Id", r."Id", NOW()
FROM "Users" u, "Roles" r 
WHERE u."Email" = 'admin@dme.com' AND r."Name" = 'Admin'
ON CONFLICT ("UserId", "RoleId") DO NOTHING;